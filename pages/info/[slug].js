import React from "react";
import client from "../../apollo/apollo-client";
import Layout from "../../components/Layout";
import { PAGES, GETPAGEBYSLUG } from "../../queries/pages";
import { StaticDataSingleton } from "../../utils/staticData";
import { useRouter } from "next/router";
import Breadcrumbs from "../../components/Breadcrumbs";
import PageInfo from "../../components/PageInfo/page-info";
import { HeadData } from "../../components/Head";

const Info = ({ categories, pageNavigation, pageContent }) => {
  const router = useRouter();
  const { slug } = router.query;

  const page = pageNavigation.find((v) => v.link == slug);

  const path = [
    {
      name: "Главная",
      link: "/",
    },
    {
      name: page.title,
      link: slug,
    },
  ];
  return (
    <>
      <HeadData title={"Информация"} pageUrl={`/info/${slug}`} />
      <Layout categories={categories}>
        <div className="container">
          <Breadcrumbs path={path} />
          <PageInfo
            pageNavigation={pageNavigation}
            pageContent={pageContent}
            activePage={slug}
          />
        </div>
      </Layout>
    </>
  );
};

export const getStaticPaths = async () => {
  const pages = await client.query({
    query: PAGES,
    variables: {
      id: 66399,
    },
  });

  const paths = pages.data.pages.nodes[0].children.nodes.map((x) => ({
    params: { slug: x.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const staticData = new StaticDataSingleton();
  await staticData.checkAndFetch(false);
  const categories = staticData.getRootCategories();

  const pages = await client.query({
    query: PAGES,
    variables: {
      id: 66399,
    },
  });

  console.log(pages);
  const page = await client.query({
    query: GETPAGEBYSLUG,
    fetchPolicy: "no-cache",
    variables: {
      id: `https://wp.fcnshop.uz/info/${params.slug}`,
    },
  });

  const pageNavigation = pages.data.pages.nodes[0].children.nodes.map((x) => ({
    title: x.title,
    link: x.slug,
  }));

  console.log(pageNavigation);

  return {
    props: {
      categories: categories.allCategories,
      pageNavigation,
      pageContent: page.data.page,
    },
    revalidate: 60,
  };
}

export default Info;
