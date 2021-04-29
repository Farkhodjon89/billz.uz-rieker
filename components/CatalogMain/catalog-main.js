import React, { useState, useEffect, useReducer, useRef } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../Loader";
import s from "./catalog-main.module.scss";
import Filters from "../Filters";
import MobileFilters from "../MobileFilters";
import ProductsList from "../ProductsList";
import PRODUCTS from "../../queries/products";
import client from "../../apollo/apollo-client";
import CatalogTopBar from "../CatalogTopBar";

export const useIsMount = () => {
  const isMountRef = useRef(true);

  useEffect(() => {
    isMountRef.current = false;
  }, []);

  return isMountRef.current;
};

const generateFilterVariables = (filters, isSale) => {
  const result = {
    first: 6,
    filters: [],
  };

  if (isSale) {
    result.onSale = true;
  }

  if (filters.colors && filters.colors.length) {
    result.filters.push({
      taxonomy: "PACOLOR",
      terms: Array.isArray(filters.colors) ? filters.colors : [filters.colors],
    });
  }

  if (filters.sizes && filters.sizes.length) {
    result.filters.push({
      taxonomy: "PASIZE",
      terms: Array.isArray(filters.sizes) ? filters.sizes : [filters.sizes],
    });
  }

  if (filters.brands && filters.brands.length) {
    result.filters.push({
      taxonomy: "PABRAND",
      terms: Array.isArray(filters.brands) ? filters.brands : [filters.brands],
    });
  }

  return result;
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FILTERS":
      return {
        ...state,
        filters: action.filters,
        products: [],
      };
    case "SET_FILTER_VALUE":
      return {
        ...state,
        filters: { ...state.filters, [action.filter]: action.value },
        products: [],
      };
    case "RESET_FILTERS":
      return {
        ...state,
        products: [],
        filters: {},
      };
    case "RESET":
      return state.init ? initialState : state;
    case "SET_PRODUCTS":
      return { ...state, products: action.products };
    case "SET_PRODUCTS_AND_PAGE_INFO":
      return { ...state, products: action.products, pageInfo: action.pageInfo };
    default:
      throw new Error();
  }
}

const initialState = {
  filters: {},
  products: null,
  pageInfo: null,
};

const CatalogMain = ({
  products,
  categories,
  sizes,
  colors,
  brands,
  category,
  parentCategory,
  pageInfo,
  isSale,
}) => {
  const [windowWidth, setWindowWidth] = useState();
  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  const isMount = useIsMount();

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    pageInfo,
    products,
  });

  const [loadProducts, { data, loading }] = useLazyQuery(PRODUCTS, { client });

  const setFilterValues = (type, value) => {
    const arrayValuesFor = ["colors", "sizes", "brands"];

    if (value === "" || value == null) {
      const filters = { ...state.filters };
      delete filters[type];

      dispatch({
        type: "SET_FILTERS",
        filters,
      });

      return;
    }

    if (arrayValuesFor.includes(type)) {
      let options = state.filters[type] || [];

      if (options.includes(value)) {
        options = options.filter((x) => x !== value);
      } else {
        options = [...options, value];
      }

      dispatch({
        type: "SET_FILTER_VALUE",
        filter: type,
        value: options,
      });
    } else {
      dispatch({
        type: "SET_FILTER_VALUE",
        filter: type,
        value: value,
      });
    }
  };

  const loadMore = () => {
    if (!loading && state.pageInfo.hasNextPage) {
      loadProducts({
        variables: {
          categories: [category.slug],
          after: state.pageInfo.endCursor,
          ...generateFilterVariables(state.filters, isSale),
        },
      });
    }
  };

  useEffect(() => {
    if (!isMount) {
      loadProducts({
        variables: {
          categories: [category.slug],
          ...generateFilterVariables(state.filters, isSale),
        },
      });
    }
  }, [state.filters]);

  useEffect(() => {
    if (data) {
      dispatch({
        type: "SET_PRODUCTS_AND_PAGE_INFO",
        products: [...state.products, ...data.products.nodes],
        pageInfo: data.products.pageInfo,
      });
    }
  }, [data]);

  return (
    <>
      <div className={s.wrapper}>
        {windowWidth >= 1023 ? (
          <Filters
            categoryData={{
              parentCategory,
              categories,
              category,
            }}
            sizes={sizes}
            colors={colors}
            brands={brands}
            setFilterValues={setFilterValues}
            filters={state.filters}
          />
        ) : (
          <MobileFilters
            categoryData={{
              parentCategory,
              categories,
              category,
            }}
            sizes={sizes}
            colors={colors}
            setFilterValues={setFilterValues}
            filters={state.filters}
          />
        )}

        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={!loading && state.pageInfo.hasNextPage}
          initialLoad={false}
          className={s.right}
        >
          <CatalogTopBar />
          <ProductsList products={state.products} />
          {loading && <Loader />}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default CatalogMain;
