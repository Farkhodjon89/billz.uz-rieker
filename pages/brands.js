import Layout from "../components/Layout";
import Offer from "../components/Offer";
import SectionTitle from "../components/SectionTitle";
import BrandSlider from "../components/BrandSlider";
import HomeTabs from "../components/HomeTabs";
import { StaticDataSingleton } from "../utils/staticData";
import BRANDS from "../queries/brands";
import CategoriesBlock from "../components/CategoriesBlock";
import client from "../apollo/apollo-client";
import Breadcrumbs from "../components/Breadcrumbs";
import BrandList from "../components/BrandList";
import { HeadData } from "../components/Head";

let arr_EN = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const Brands = ({ categories, brands }) => {
  let letter = arr_EN.map((letter) => {
    const brandList = [];
    for (const brand of brands) {
      if (letter == brand.name[0]) {
        brandList.push(brand.name);
      }
    }
    return (letter = {
      letter,
      brands: brandList,
    });
  });

  const path = [
    {
      name: "Главная",
      link: "/",
    },
    {
      name: "Бренды",
      link: "brands",
    },
  ];

  return (
    <>
      <HeadData title={"Список брендов"} pageUrl="/brands" />
      <Layout categories={categories}>
        <div className="container">
          <Breadcrumbs path={path} />
          <SectionTitle title="БРЕНДЫ" />
          <BrandList brands={letter} />
        </div>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const staticData = new StaticDataSingleton();
  await staticData.checkAndFetch(true);
  const categories = staticData.getRootCategories();

  const brands = await client.query({
    query: BRANDS,
    fetchPolicy: "no-cache",
  });

  return {
    props: {
      categories: categories.allCategories,
      brands: brands.data.paBrands.nodes,
    },
    revalidate: 60,
  };
}

export default Brands;
