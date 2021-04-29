import s from "./cart-modal.module.scss";
import { v4 as uuidv4 } from "uuid";
import { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { deleteFromCart } from "../../redux/actions/cartActions";
import Link from "next/link";
import { getPrice, getFormat } from "../../utils";
import icons from "../../public/fixture";

const CartModal = ({ cartItems, activeStatus, getActiveStatus }) => {
  const myRef = useRef();

  const handleClickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      getActiveStatus ? getActiveStatus(false) : "";
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  let cartTotalPrice = 0;

  return (
    <>
      <div ref={myRef} className={`${s.wrapper}  ${activeStatus && s.active}`}>
        {cartItems.length >= 1 ? (
          <>
            <div className={s.top}>
              Корзина
              <button
                dangerouslySetInnerHTML={{ __html: icons.times }}
                onClick={() => (getActiveStatus ? getActiveStatus(false) : "")}
              />
            </div>
            <div className={s.cartItemList}>
              {cartItems.map((product) => {
                const { normalPrice, salePrice } = getPrice(product);
                const normalPriceFront = getFormat(normalPrice) + " UZS";
                const salePriceFront = getFormat(salePrice) + " UZS";
                cartTotalPrice += product.onSale
                  ? parseInt(salePrice) * product.quantity
                  : parseInt(normalPrice) * product.quantity;

                return (
                  <div key={uuidv4()} className={s.cartItem}>
                    <img
                      src={product.image ? product.image.sourceUrl : null}
                      className={s.img}
                      alt=""
                    />
                    <div className={s.cartItemListInfo}>
                      <div className={s.name}>{product.name}</div>
                      <div>Цвет: {product.selectedProductColor}</div>
                      <div>Размер: {product.selectedProductSize}</div>
                      <div>
                        {product.onSale ? salePriceFront : normalPriceFront}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={s.overallPrice}>
              Общая цена:
              <span> {getFormat(cartTotalPrice) + " UZS"}</span>
            </div>
            <Link href="/application">
              <a className={s.application}>Оформление заказа</a>
            </Link>
            <Link href="/cart">
              <a className={s.cart}>Корзина</a>
            </Link>
          </>
        ) : (
          <div className={s.empty}>Корзина пуста</div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFromCart: (item) => {
      dispatch(deleteFromCart(item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);
