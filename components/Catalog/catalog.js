import React, { useState, useEffect, useReducer, useRef } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../Loader";
import s from "./catalog.module.scss";
import Filters from "../Filters";
import MobileFilters from "../MobileFilters";
import ProductsList from "../ProductsList";
import PRODUCTS from "../../queries/products";
import { v4 as uuidv4 } from "uuid";
import client from "../../apollo/apollo-client";
import CatalogTopBar from "../CatalogTopBar";
import { catalog } from "../../utils/catalog";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";

export const useIsMount = () => {
  const isMountRef = useRef(true);

  useEffect(() => {
    isMountRef.current = false;
  }, []);

  return isMountRef.current;
};

const generateFilterVariables = (filters, isSale) => {
  const result = {
    first: 9,
    filters: [],
  };

  if (isSale == "sale") {
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
}) => {
  const router = useRouter();
  const { slug } = router.query;

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
          categories: category ? [category.slug] : null,
          after: state.pageInfo.endCursor,
          ...generateFilterVariables(state.filters, slug),
        },
      });
    }
  };

  if (typeof window !== "undefined") {
    useEffect(() => {
      const { filters } = catalog.init();

      if (Object.keys(filters).length) {
        dispatch({
          type: "SET_FILTERS",
          filters: filters,
        });
      }
    }, [window.location.search]);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const query = catalog.buildQuery({}, state.filters);
      const location = `${window.location.pathname}${query ? "?" : ""}${query}`;
      window.history.replaceState(null, "", location);
    }

    if (!isMount) {
      loadProducts({
        variables: {
          categories: category ? [category.slug] : null,
          ...generateFilterVariables(state.filters, slug),
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
      <div className="row">
        <div className="col-lg-3">
          {windowWidth >= 1023 ? (
            <Filters
              categoryData={{
                parentCategory,
                categories,
                category,
              }}
              brands={brands}
              sizes={sizes}
              colors={colors}
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
              brands={brands}
              sizes={sizes}
              colors={colors}
              setFilterValues={setFilterValues}
              filters={state.filters}
            />
          )}
        </div>
        <div className="col-lg-9">
          <CatalogTopBar
            key={uuidv4()}
            state={state}
            setFilterValues={setFilterValues}
            dispatch={dispatch}
          />
          {loading && state.products.length === 0 ? (
            <div id="catalog-skeleton-wrapper">
              <Skeleton
                variant="rect"
                height={400}
                width={290}
                count={9}
                wrapper={({ children }) => (
                  <div className="col-lg-4 col-sm-6 col-6 col-md-6">
                    {children}
                  </div>
                )}
              />
            </div>
          ) : state.products.length === 0 ? (
            <div className={s.emptyProduct}>
              <p>Товары не найдены</p>
            </div>
          ) : (
            <InfiniteScroll
              pageStart={0}
              loadMore={loadMore}
              hasMore={!loading && state.pageInfo.hasNextPage}
              initialLoad={false}
              className={s.right}
            >
              <ProductsList
                products={state.products}
                catalogMod={true}
                loading={loading}
              />
              {loading && <Loader />}
            </InfiniteScroll>
          )}
        </div>
      </div>
    </>
  );
};

export default CatalogMain;
