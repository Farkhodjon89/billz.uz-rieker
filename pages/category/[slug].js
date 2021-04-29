import Layout from "../../components/Layout";
import MainSlider from "../../components/MainSlider";
import CategoriesBlock from "../../components/CategoriesBlock";
import SectionTitle from "../../components/SectionTitle";
import ProductSlider from "../../components/ProductSlider";
import Banner from "../../components/Banner";
import client from "../../apollo/apollo-client";
import PAGESETTINGS from "../../queries/categoryPageSettings";
import { StaticDataSingleton } from "../../utils/staticData";
import PRODUCTS from "../../queries/products";
import { HeadData } from "../../components/Head";
import { useRouter } from "next/router";

const CategoryPage = ({
  SliderData,
  PopularCategories,
  BannerOne,
  BannerTwo,
  BannerThree,
  categories,
  newProducts,
  products,
  saleProducts,
}) => {
  const router = useRouter();
  const { slug } = router.query;
  const ActivCategory = categories.find((c) => c.slug === slug);
  let seo = {};
  console.log(ActivCategory.name);
  switch (ActivCategory.name) {
    case "Женский":
      seo = {
        title: "Брендовая женская одежда и обувь | FCN",
        description:
          "Модная женская одежда и женская обувь от мировых брендов, в Ташкенте. Купите брендовую женскую одежду и ловите на себе взгляды поклонников! 😍",
      };
      break;
    case "Мужской":
      seo = {
        title: "Брендовая мужская одежда и обувь | FCN",
        description:
          "Магазин мужской одежды и мужской обуви в Ташкенте. Купить брендовую мужскую одежду от Lacoste, Mango, Gant… Обнови гардероб и покоряй сердца! ❤",
      };
      break;
    case "Девочка":
      seo = {
        title: "Брендовая одежда и обувь для девочки | FCN",
        description:
          "Модная детская одежда и брендовая обувь  для девочек. Купите одежду для девочки от мировых брендов. Ваша принцесса будет сиять от счастья! 😍",
      };
      break;
    case "Мальчик":
      seo = {
        title: "Брендовая одежда и обувь для мальчика | FCN",
        description:
          "Интернет магазин модной одежды для мальчика. Купите стильную одежду и брендовую обувь для ребенка. Ваш мальчик будет самым стильным! 😎",
      };
      break;
  }

  return (
    <>
      <HeadData
        title={seo.title}
        description={seo.description}
        pageUrl={`/category/${slug}`}
      />
      <Layout categories={categories}>
        <MainSlider SliderData={SliderData} />
        <div className="container">
          <SectionTitle title="популярные Категории" />
          <CategoriesBlock categories={PopularCategories} />
          <SectionTitle title="Новые поступления" />
          <ProductSlider products={newProducts} />
          <Banner
            img={BannerOne.image.sourceUrl}
            brand={BannerOne.brand ? BannerOne.brand.sourceUrl : null}
            title={BannerOne.title}
            subTitle={BannerOne.subtitle}
            buttonTitle="Посмотреть каталог"
            url={BannerOne.link}
            style="1"
          />
          <SectionTitle title="стильный лук сезона" />
          <Banner
            img={BannerTwo.image.sourceUrl}
            title={BannerTwo.title}
            buttonTitle="Посмотреть каталог"
            url={BannerTwo.link}
            style="3"
            noMargin={true}
          />
          <ProductSlider products={products} />
          <Banner
            img={BannerThree.image.sourceUrl}
            brand={BannerThree.brand ? BannerThree.brand.sourceUrl : null}
            title={BannerThree.title}
            buttonTitle="Посмотреть каталог"
            url={BannerThree.link}
            style="2"
          />
          <SectionTitle title="товары со скидкой" />
          <ProductSlider products={saleProducts} />
        </div>
      </Layout>
    </>
  );
};

export default CategoryPage;

export const getStaticPaths = async () => {
  const paths = ["zhenskij", "muzhskoj", "malchik", "devochka"].map((x) => ({
    params: { slug: x },
  }));
  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const staticData = new StaticDataSingleton();
  await staticData.checkAndFetch(true);

  const categories = staticData.getRootCategories();

  const newProducts = await client.query({
    query: PRODUCTS,
    fetchPolicy: "no-cache",
    variables: {
      first: 10,
      categories: [params.slug],
    },
  });

  const products = await client.query({
    query: PRODUCTS,
    fetchPolicy: "no-cache",
    variables: {
      first: 10,
      categories: [params.slug],
    },
  });

  const saleProducts = await client.query({
    query: PRODUCTS,
    fetchPolicy: "no-cache",
    variables: {
      first: 10,
      categories: [params.slug],
      onSale: true,
    },
  });

  const PageSettings = await client.query({
    query: PAGESETTINGS,
    fetchPolicy: "no-cache",
    variables: { id: params.slug },
  });

  return {
    props: {
      SliderData: PageSettings.data.productCategory.category_settings.slider,
      PopularCategories:
        PageSettings.data.productCategory.category_settings.popularCategories,
      BannerOne: PageSettings.data.productCategory.category_settings.bannerone,
      BannerTwo: PageSettings.data.productCategory.category_settings.bannertwo,
      BannerThree:
        PageSettings.data.productCategory.category_settings.bannerthree,
      categories: categories.allCategories,
      newProducts: newProducts.data.products.nodes,
      products: products.data.products.nodes,
      saleProducts: saleProducts.data.products.nodes,
    },
    revalidate: 60,
  };
}
