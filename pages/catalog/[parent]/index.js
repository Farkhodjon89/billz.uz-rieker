import React from "react";

import Layout from "../../../components/Layout";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Catalog from "../../../components/Catalog";
import SectionTitile from "../../../components/SectionTitle";
import client from "../../../apollo/apollo-client";
import PRODUCTS from "../../../queries/products";
import SIZES from "../../../queries/sizes";
import SubMenu from "../../../components/SubMenu";
import COLORS from "../../../queries/colors";
import BRANDS from "../../../queries/brands";
import { StaticDataSingleton } from "../../../utils/staticData";
import { HeadData } from "../../../components/Head";

const CatalogPage = ({
  pageInfo,
  products,
  sizes,
  colors,
  brands,
  categoriesBar,
  category,
  categories,
}) => {
  const categoriesFilter = category.children.map(({ name, slug }) => ({
    name,
    link: `/catalog/${category.slug}/${slug}`,
  }));

  const breadcrumbs = [
    {
      name: "Главная",
      link: "/",
    },
    {
      name: category.name,
      link: `/catalog/${category.slug}`,
    },
  ];

  return (
    <>
      {category ? (
        <HeadData
          pageUrl={`/catalog/${category.slug}${
            process.browser ? window.location.search : ""
          }`}
          pageData={{
            categoryTitle: category.name,
          }}
        />
      ) : (
        <HeadData
          pageUrl={`/catalog${process.browser ? window.location.search : ""}`}
        />
      )}
      <Layout categories={categories}>
        <div className="container">
          <Breadcrumbs path={breadcrumbs} />
          <SectionTitile title={category.name} />
          <Catalog
            key={category.id}
            products={products}
            categories={categoriesFilter}
            sizes={sizes}
            colors={colors}
            brands={brands}
            pageInfo={pageInfo}
            category={category}
          />
        </div>
      </Layout>
    </>
  );
};

export default CatalogPage;

export const getStaticPaths = async () => {
  const paths = ["muzhskoj", "zhenskij", "malchik", "devochka"].map((x) => ({
    params: { parent: x },
  }));
  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const staticData = new StaticDataSingleton();
  await staticData.checkAndFetch();
  const category = staticData.getCategoryBySlug(params.parent, 1);
  const categories = staticData.getRootCategories();

  const productsResponse = await client.query({
    query: PRODUCTS,
    variables: { first: 9, categories: [params.parent] },
  });
  const sizes = await client.query({
    query: SIZES,
  });
  const colors = await client.query({
    query: COLORS,
  });

  const brands = await client.query({
    query: BRANDS,
  });

  return {
    props: {
      products: productsResponse.data.products.nodes,
      pageInfo: productsResponse.data.products.pageInfo,
      sizes: sizes.data.paSizes.nodes,
      colors: colors.data.paColors.nodes,
      brands: brands.data.paBrands.nodes,
      category,
      categories: categories.allCategories,
    },
    revalidate: 60,
  };
}
