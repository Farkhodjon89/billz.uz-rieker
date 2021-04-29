import s from "./cart-main.module.scss";
import Link from "next/link";
import SectionTitle from "../SectionTitle";
import ProductsList from "../ProductsList";
import icons from "../../public/fixture";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
} from "../../redux/actions/cartActions";
import {
  addToWishlist,
  deleteFromWishlist,
} from "../../redux/actions/wishlistActions";
import { getPrice, getFormat, getDiscount } from "../../utils";
import { useEffect, useState } from "react";
import OfferTwo from "../OfferTwo";
import Breadcrumbs from "../Breadcrumbs";
import ProductSlider from "../ProductSlider";
import OrderReview from "../OrderReview";

const path = [
  { link: "/", name: "Главная" },
  { link: "/cart", name: "Корзина" },
];

const CartMain = ({
  cartItems,
  wishlistItems,
  addToCart,
  deleteFromCart,
  decreaseQuantity,
  addToWishlist,
  deleteFromWishlist,
}) => {
  const [windowWidth, setWindowWidth] = useState();
  let resizeWindow = () => {
    setWindowWidth(window.screen.width);
  };
  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  const wishlistItem = wishlistItems.filter(
    (wishlistItem) => wishlistItem.id === cartItems.id
  )[0];

  let orderReviewData = {
    price: 0,
    sale: 0,
    totalPrice: 0,
    button: (
      <Link href="/application">
        <a className="orderReviewButton">Оформить заказ</a>
      </Link>
    ),
  };

  return cartItems.length >= 1 ? (
    <div className="container">
      <Breadcrumbs path={path} />
      <SectionTitle title="Корзина" />
      <div className={`row ${s.cards}`}>
        <div className={`${s.left} col-lg-8`}>
          <div className={s.hide}></div>

          <div className={s.cardlist}>
            {cartItems.map((product) => {
              const { normalPrice, salePrice } = getPrice(product);
              const normalPriceFront = getFormat(normalPrice) + " UZS";
              const salePriceFront = getFormat(salePrice) + " UZS";
              const discountPrice = getDiscount(normalPrice, salePrice);

              const wishlistItem = wishlistItems.filter(
                (wishlistItem) => wishlistItem.id === product.id
              )[0];

              orderReviewData.price += parseInt(normalPrice) * product.quantity;
              orderReviewData.sale += product.onSale
                ? parseInt(salePrice) * product.quantity
                : 0;
              orderReviewData.totalPrice =
                orderReviewData.price - orderReviewData.sale + 30500;

              return (
                <div className={s.card} key={uuidv4()}>
                  <img
                    src={product.image ? product.image.sourceUrl : null}
                    alt=""
                    className={s.img}
                  />
                  <img
                    src="/removeMobile.svg"
                    alt=""
                    className={s.removeImg}
                    onClick={() => deleteFromCart(product.selectedProductId)}
                  />
                  <div className={s.details}>
                    <div className={s.title}>
                      <div>
                        {product.paBrands.nodes[0].name
                          ? product.paBrands.nodes[0].name
                          : null}
                      </div>
                      <div className={s.price}>
                        {product.onSale ? (
                          <>
                            <span className={s.salePrice}>
                              {" "}
                              {salePriceFront}{" "}
                            </span>
                            <span className={s.normalPrice}>
                              {normalPriceFront}
                            </span>
                            <span className={s.discountPrice}>
                              -{discountPrice}%
                            </span>
                          </>
                        ) : (
                          <span>{normalPriceFront}</span>
                        )}
                      </div>
                    </div>
                    <div className={s.name}>
                      <div>{product.name}</div>
                    </div>
                    <div className={s.color}>
                      Цвет: <span> {product.selectedProductColor}</span>
                    </div>
                    <div className={s.flex}>
                      <div className={s.size}>
                        Размер: {product.selectedProductSize}
                        {/* {product.variations ? 
                          <select name="sizes" value={product.selectedProductSize}>
                            {product.variations.nodes.map(
                                  product =>
                                    (
                                      <option value={product.selectedProductSize}>{ product.size.nodes[0].value}</option>
                                  )
                            )}
                          </select>
                        : <span> {product.selectedProductSize}</span>}
                         */}
                      </div>
                      <div className={s.stock}>
                        Кол-во: 1
                        {/* Кол-во: <select name="quantity" >
                          <option >1</option>
                          <option >2</option>
                          <option >3</option>
                          <option >4</option>
                          <option >5</option>
                        </select> */}
                      </div>
                    </div>
                    <div className={s.cardBottom}>
                      <div
                        className={`${s.wishlist} ${
                          wishlistItem ? s.active : null
                        }`}
                      >
                        <div
                          dangerouslySetInnerHTML={{ __html: icons.wishlist }}
                        />
                        <button
                          onClick={
                            wishlistItem
                              ? () => deleteFromWishlist(product)
                              : () => addToWishlist(product)
                          }
                        >
                          {wishlistItem ? "В избранном" : "В избранное"}
                        </button>
                      </div>
                      <div className={s.remove}>
                        <div
                          dangerouslySetInnerHTML={{ __html: icons.times }}
                        />
                        <button
                          onClick={() =>
                            deleteFromCart(product.selectedProductId)
                          }
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`${s.right} col-lg-4`}>
          <div className={s.rightInner}>
            <OrderReview data={orderReviewData} />
            {/* <div className={s.rightTitle}>Итог заказа</div>
            <div className={s.rightList}>
              <div>Подытог</div>
              <div>{getFormat(price) + ' UZS'}</div>
            </div>
            <div className={s.rightList}>
              <div>Скидки</div>
              <div>
                <div>{'-' + getFormat(sale) + ' UZS'}</div>
              </div>
            </div>
            <div className={s.rightList}>
              <div>Доставка:</div>
              <div>{'30 500' + ' UZS'}</div>
            </div>

            <div className={s.rightListLast}>
              <div>Итого </div>
              <div>{getFormat(totalPrice) + ' UZS'}</div>
            </div>
            <Link href='/application'>
              <a>
                Оформить заказ
              </a>
            </Link> */}
            <div className={s.methodsText}>Принимаем к оплате:</div>
            <div className={s.methodsImages}>
              <span dangerouslySetInnerHTML={{ __html: icons.click }} />
              <span dangerouslySetInnerHTML={{ __html: icons.payme }} />
              <span dangerouslySetInnerHTML={{ __html: icons.visa }} />
            </div>
          </div>
          <div className={s.promoCode}>
            <div className={s.title}>Использовать промокод</div>
            <div className={s.promoCodeAction}>
              <button>Активировать</button>
            </div>
          </div>

          <OfferTwo />
        </div>
      </div>
      {/* <SectionTitle title="Возможно вам понравится" />
      { windowWidth >= 1023 ? 
      <ProductsList products={products} related={true}/>
      : <ProductSlider products={products} /> } */}
    </div>
  ) : (
    <div className={s.emptyCart}>
      Корзина пуста
      <Link href="/catalog">
        <a>Начать покупки</a>
      </Link>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => {
      dispatch(addToCart(item));
    },
    decreaseQuantity: (item, joki) => {
      dispatch(decreaseQuantity(item, joki));
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

export default connect(mapStateToProps, mapDispatchToProps)(CartMain);
