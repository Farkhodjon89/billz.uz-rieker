import s from "./product.module.scss";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { getPrice, getFormat, getDiscount } from "../../utils";
import { useState } from "react";
import Slider from "react-slick";
import icons from "../../public/fixture.js";
import { connect } from "react-redux";
import {
  addToWishlist,
  deleteFromWishlist,
} from "../../redux/actions/wishlistActions";

const settings = {
  arrow: true,
  infinite: false,
  dots: false,
  slidesToShow: 4,
  slidesToScroll: 1,
};

const Sizes = ["X", "XXL", "L", "XL", "X", "XXL", "L", "XL"];

const Product = ({
  product,
  catalogMod,
  related,
  wishlistItems,
  addToWishlist,
  deleteFromWishlist,
}) => {
  const [selectedSize, setSelectedSize] = useState();
  const changeSize = (size) => {
    setSelectedSize(size);
  };
  const { normalPrice, salePrice } = getPrice(product);
  const normalPriceFront = [getFormat(normalPrice), "UZS"].join(" ");
  const salePriceFront = [getFormat(salePrice), "UZS"].join(" ");
  const discountPrice = getDiscount(normalPrice, salePrice);
  const wishlistItem = wishlistItems.filter(
    (wishlistItem) => wishlistItem.id === product.id
  )[0];

  return (
    <div
      className={
        related
          ? `${s.product} ${s.related} product col-lg-3`
          : `${s.product} product ${
              catalogMod
                ? `col-lg-4 col-sm-6 col-6 col-md-6 ${s.heightMin}`
                : null
            }`
      }
    >
      <div className={s.productTop}>
        {product.image ? (
          <Link href={"/product/" + product.slug}>
            <a>
              <img src={product.image.sourceUrl} className={s.img} />
              <div className={s.label}>
                {product.onSale ? (
                  <span className={s.sale}>-{discountPrice}%</span>
                ) : null}
              </div>
            </a>
          </Link>
        ) : null}
        {/* <div className={s.addToCart}>
                    <Slider {...settings}>
                      {Sizes.map( v => (
                        <div key={uuidv4()}>
                            <button 
                              onClick={() => changeSize(v)}
                              key={uuidv4()}
                              className={v === selectedSize ? s.active : "" + s.size}
                            >{v}
                            </button>
                        </div>
                      ))}
                    </Slider> 
                    <button className={s.submit}>Добавить в корзинку</button>
                </div> */}
        {product.paBrands ?
        <button
          className={`${s.addToWishlist} ${wishlistItem ? s.active : null}`}
          onClick={
            wishlistItem
              ? () => deleteFromWishlist(product)
              : () => addToWishlist(product)
          }
          dangerouslySetInnerHTML={{ __html: icons.wishlist }}
        />
        : null}
      </div>
      {product.paBrands ? 
      <div className={s.productBottom}>
        <div className={s.brand}>
          {product.paBrands.nodes.length != 0
            ? product.paBrands.nodes[0].name
            : null}
        </div>
        <div className={s.title}>{product.name}</div>
        <div className={product.onSale ? s.sale : s.price}>
          {product.onSale ? (
            <>
              <span className={s.salePrice}> {salePriceFront} </span>
              <span className={s.normalPrice}>{normalPriceFront}</span>
            </>
          ) : (
            <span>{normalPriceFront}</span>
          )}
        </div>
      </div>
      : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    wishlistItems: state.wishlistData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToWishlist: (item) => {
      dispatch(addToWishlist(item));
    },
    deleteFromWishlist: (item) => {
      dispatch(deleteFromWishlist(item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
