import Layout from "../components/Layout";
import Offer from "../components/Offer";
import PRODUCTS from "../queries/products";
import SectionTitle from "../components/SectionTitle";
import BrandSlider from "../components/BrandSlider";
import HomeTabs from "../components/HomeTabs";
import { StaticDataSingleton } from "../utils/staticData";
import HOMESETTINGS from "../queries/homePageSettings";
import CategoriesBlock from "../components/CategoriesBlock";
import client from "../apollo/apollo-client";
import { HeadData } from "../components/Head";
import Marquee from "../components/Marquee";
// import MainSlider from "./../components/MainSlider";
import HomeBanner from '../components/HomeBanner';
import ProductSlider from "../components/ProductSlider";

const Index = ({ categories, sliderData, categoriesblock, newProduct }) => {
  return (
    <>
      <HeadData />
      <Layout categories={categories}>
        {/* <MainSlider SliderData={sliderData} /> */}
        <HomeBanner />
        <div className="container">
          <SectionTitle title="популярные Категории" />
          <CategoriesBlock categories={categoriesblock} />
          <SectionTitle title="последняя пара" />
          <ProductSlider products={newProduct} />
          <SectionTitle title="новые поступления" />
          <ProductSlider products={newProduct} />
          <SectionTitle title="коллекция весна-лето 2020" />
          <ProductSlider products={newProduct} />
          <Offer />
          <HomeTabs />
        </div>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const staticData = new StaticDataSingleton();
  await staticData.checkAndFetch(true);

  const categories = staticData.getRootCategories();

  const pageSettings = await client.query({
    query: HOMESETTINGS,
    fetchPolicy: "no-cache",
  });

  const newProducts = await client.query({
    query: PRODUCTS,
    fetchPolicy: "no-cache",
    variables: {
      first: 10,
    },
  });

  return {
    props: {
      sliderData: pageSettings.data.themeGeneralSettings.global_settings.slider,
      newProduct: newProducts.data.products.nodes,
      categoriesblock:
        pageSettings.data.themeGeneralSettings.global_settings
          .popularCategories,
      categories: categories.allCategories,
    },
    revalidate: 60,
  };
}

export default Index;
