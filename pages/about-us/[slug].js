import React from "react";
import client from "../../apollo/apollo-client";
import PageNavigation from "../../components/PageNavigation/page-navigation";
import Layout from "../../components/Layout";
import { PAGES, GETPAGEBYSLUG } from "../../queries/pages";
import { StaticDataSingleton } from "../../utils/staticData";
import SectionTitle from "../../components/SectionTitle";
import { useRouter } from "next/router";
import Breadcrumbs from "../../components/Breadcrumbs";
import PageContent from "../../components/PageContent";
import PageInfo from "../../components/PageInfo/page-info";
import { HeadData } from "../../components/Head";

const AboutUs = ({ categories, pageNavigation, pageContent }) => {
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
      <HeadData title={"О нас"} pageUrl={`/about-us/${slug}`} />
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
    fetchPolicy: "no-cache",
    variables: {
      id: 65365,
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

export async function getStaticProps({ params, items }) {
  const staticData = new StaticDataSingleton();
  await staticData.checkAndFetch(false);
  const categories = staticData.getRootCategories();

  const pages = await client.query({
    query: PAGES,
    variables: {
      id: 65365,
    },
  });

  const page = await client.query({
    query: GETPAGEBYSLUG,
    variables: {
      id: `https://wp.fcnshop.uz/about-us/${params.slug}`,
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

export default AboutUs;
