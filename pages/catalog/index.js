import React from "react";

import Layout from "../../components/Layout";
import Breadcrumbs from "../../components/Breadcrumbs";
import Catalog from "../../components/Catalog";
import SectionTitile from "../../components/SectionTitle";
import client from "../../apollo/apollo-client";
import PRODUCTS from "../../queries/products";
import SIZES from "../../queries/sizes";
import COLORS from "../../queries/colors";
import BRANDS from "../../queries/brands";
import { StaticDataSingleton } from "../../utils/staticData";
import { v4 as uuidv4 } from "uuid";
import { HeadData } from "../../components/Head";

const CatalogPage = ({
  pageInfo,
  products,
  sizes,
  colors,
  brands,
  category,
  categories,
}) => {
  // const categoriesFilter = categories.map(({ name, slug }) => ({
  //   name,
  //   link: `/catalog/${slug}`
  // }))
  const categoriesFilter = [
    {
      name: "Мужчины",
      link: "/catalog/muzhskoj",
    },
    {
      name: "Женщины",
      link: "/catalog/zhenskij",
    },
    {
      name: "Мальчики",
      link: "/catalog/malchik",
    },
    {
      name: "Девочки",
      link: "/catalog/devochka",
    },
  ];

  const breadcrumbs = [
    {
      name: "Главная",
      link: "/",
    },
    {
      name: "Каталог",
      link: `/catalog`,
    },
  ];

  return (
    <>
      <HeadData />
      <Layout categories={categories}>
        <div className="container">
          <Breadcrumbs path={breadcrumbs} />
          <SectionTitile title="Каталог" />
          <Catalog
            key={uuidv4()}
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

export async function getStaticProps() {
  const staticData = new StaticDataSingleton();
  await staticData.checkAndFetch();

  const categories = staticData.getRootCategories();

  const productsResponse = await client.query({
    query: PRODUCTS,
    variables: { first: 9 },
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
      categories: categories.allCategories,
    },
    revalidate: 60,
  };
}
