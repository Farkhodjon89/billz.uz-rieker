import React from "react";

import Layout from "../../../components/Layout";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Catalog from "../../../components/Catalog";
import client from "../../../apollo/apollo-client";
import PRODUCTS from "../../../queries/products";
import SIZES from "../../../queries/sizes";
import COLORS from "../../../queries/colors";
import BRANDS from "../../../queries/brands";
import SectionTitile from "../../../components/SectionTitle";
import { StaticDataSingleton } from "../../../utils/staticData";
import { HeadData } from "../../../components/Head";

const CatalogPage = ({
  products,
  sizes,
  colors,
  brands,
  category,
  parentCategory,
  pageInfo,
  categories,
}) => {
  const categoriesFilter = category.children.map(({ name, slug }) => ({
    name,
    link: `/catalog/${parentCategory.slug}/${slug}`,
  }));

  const isSale = parentCategory && parentCategory.slug === category.slug;

  const breadcrumbs = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: parentCategory.name,
      link: `/catalog/${parentCategory.slug}`,
    },
    {
      name: isSale ? "Sale" : category.name,
      link: isSale
        ? `/catalog/${category.slug}/sale`
        : `/catalog/${category.slug}`,
    },
  ];

  return (
    <>
      {parentCategory ? (
        <HeadData
          pageUrl={`/catalog/${category.name}${
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
            parentCategory={parentCategory}
            isSale={isSale}
          />
        </div>
      </Layout>
    </>
  );
};

export const getStaticPaths = async () => {
  const staticData = new StaticDataSingleton();
  await staticData.checkAndFetch();

  const men = [];
  const women = [];
  const boy = [];
  const girl = [];

  staticData.getAllChildrenSlugs("muzhskoj", men);
  staticData.getAllChildrenSlugs("zhenskij", women);
  staticData.getAllChildrenSlugs("malchik", boy);
  staticData.getAllChildrenSlugs("devochka", girl);

  const paths = [
    ...men.map((slug) => ({ params: { parent: "muzhskoj", slug } })),
    ...women.map((slug) => ({ params: { parent: "zhenskij", slug } })),
    ...boy.map((slug) => ({ params: { parent: "malchik", slug } })),
    ...girl.map((slug) => ({ params: { parent: "devochka", slug } })),
    { params: { parent: "muzhskoj", slug: "sale" } },
    { params: { parent: "zhenskij", slug: "sale" } },
    { params: { parent: "malchik", slug: "sale" } },
    { params: { parent: "devochka", slug: "sale" } },
  ];

  return {
    paths,
    fallback: "blocking",
  };
};

export async function getStaticProps({ params }) {
  const staticData = new StaticDataSingleton();
  await staticData.checkAndFetch();

  const categories = staticData.getRootCategories();

  const parentCategory = staticData.getCategoryBySlug(params.parent, 1);

  const category = staticData.getCategoryBySlug(
    params.slug === "sale" ? params.parent : params.slug,
    2
  );

  const productsResponse = await client.query({
    query: PRODUCTS,
    variables: {
      first: 9,
      categories: params.slug !== "sale" ? [params.slug] : [params.parent],
      onSale: params.slug === "sale" ? true : null,
    },
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
      parentCategory,
      category,
      categories: categories.allCategories,
    },
    revalidate: 60,
  };
}

export default CatalogPage;
