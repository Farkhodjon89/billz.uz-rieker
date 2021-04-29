import Layout from "../../components/Layout";
import Breadcrumbs from "../../components/Breadcrumbs";
import ProductCard from "../../components/ProductCard";
import client from "../../apollo/apollo-client";
import { useState } from "react";
import PRODUCT from "../../queries/product";
import PRODUCTS from "../../queries/products";
import { connect } from "react-redux";
import { getPrice } from "../../utils";
import { addToCart, deleteFromCart } from "../../redux/actions/cartActions";
import {
  addToWishlist,
  deleteFromWishlist,
} from "../../redux/actions/wishlistActions";
import { StaticDataSingleton } from "../../utils/staticData";
import { HeadData } from "../../components/Head";
import CONTACTS from "../../queries/contacts";

const Product = ({
  product,
  contacts,
  cartItems,
  wishlistItems,
  addToCart,
  deleteFromCart,
  addToWishlist,
  deleteFromWishlist,
  categories,
}) => {
  const [openCart, setOpenCart] = useState(false);

  const path = [
    {
      name: "Главная",
      link: "/",
    },
    {
      name: product.name,
      link: `/product/${product.slug}`,
    },
  ];
  const { normalPrice, salePrice } = getPrice(product);

  return (
    <>
      <HeadData
        pageUrl="/product/"
        pageData={{
          productTitle: product.name,
          sku: product.sku,
          color:
            product.paColors.nodes.length != 0
              ? product.paColors.nodes[0].name
              : null,
          brand: product.paBrands.nodes[0].name
            ? product.paBrands.nodes[0].name
            : null,
          price: salePrice ? salePrice : normalPrice,
        }}
        product={product}
      />
      <Layout
        parentCategory={product.productCategories.nodes[0].slug}
        categories={categories}
        openCart={openCart}
        setOpenCart={setOpenCart}
      >
        <div className="container">
          <Breadcrumbs path={path} />
        </div>
        {console.log(product)}
        <ProductCard
          key={product.id}
          product={product}
          contacts={contacts}
          cartItems={cartItems}
          wishlistItems={wishlistItems}
          addToCart={addToCart}
          deleteFromCart={deleteFromCart}
          addToWishlist={addToWishlist}
          deleteFromWishlist={deleteFromWishlist}
          getActiveStatus={(r) => setOpenCart(r)}
        />
      </Layout>
    </>
  );
};

export const getStaticPaths = async () => {
  const paths = [];

  const fetchProducts = async (after) => {
    const _tempProductsResult = await client.query({
      query: PRODUCTS,
      variables: {
        first: 10,
        ...(after ? { after } : {}),
      },
    });

    paths.push(
      ..._tempProductsResult.data.products.nodes.map((product) => ({
        params: { slug: product.slug },
      }))
    );

    if (_tempProductsResult.data.products.pageInfo.hasNextPage) {
      await fetchProducts(_tempProductsResult.data.products.pageInfo.endCursor);
    }
  };

  if (process.env.NODE_ENV === "production") {
    await fetchProducts();
  }
  return {
    paths,
    fallback: "blocking",
  };
};

export async function getStaticProps({ params }) {
  let response;

  try {
    response = await client.query({
      query: PRODUCT,
      variables: { id: params.slug },
    });
  } catch (e) {
    return {
      notFound: true,
      revalidate: 30,
    };
  }

  const staticData = new StaticDataSingleton();
  await staticData.checkAndFetch();

  const categories = staticData.getRootCategories();

  const constacts = await client.query({
    query: CONTACTS,
    fetchPolicy: "no-cache",
  });

  return {
    props: {
      product: response.data.product,
      contacts: constacts.data.paBrands.nodes,
      categories: categories.allCategories,
    },
  };
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      selectedProductColor,
      selectedProductSize,
      selectedProductId
    ) => {
      dispatch(
        addToCart(
          item,
          selectedProductColor,
          selectedProductSize,
          selectedProductId
        )
      );
    },
    deleteFromCart: (item) => {
      dispatch(deleteFromCart(item));
    },
    addToWishlist: (item) => {
      dispatch(addToWishlist(item));
    },
    deleteFromWishlist: (item) => {
      dispatch(deleteFromWishlist(item));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);
