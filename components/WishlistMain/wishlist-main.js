import s from "./wishlist-main.module.scss";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import {
  addToWishlist,
  deleteFromWishlist,
} from "../../redux/actions/wishlistActions";
import { getPrice, getFormat } from "../../utils";
import SectionTitile from "../SectionTitle";
import icons from "../../public/fixture";
import Breadcrumbs from "../Breadcrumbs";

const WishlistMain = ({ wishlistItems, deleteFromWishlist }) => {
  const path = [
    {
      name: "Главная",
      link: "/",
    },
    {
      name: "Избранные товары",
      link: "/wishlist",
    },
  ];

  return wishlistItems.length >= 1 ? (
    <div className="container">
      <Breadcrumbs path={path} />
      <SectionTitile title="Избранные товары" />
      <div className={s.cardlist}>
        <div className="row">
          {wishlistItems.map((product) => {
            const { normalPrice, salePrice } = getPrice(product);
            const normalPriceFront = getFormat(normalPrice) + " UZS";
            const salePriceFront = getFormat(salePrice) + " UZS";

            return (
              <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <div className={s.card} key={uuidv4()}>
                  <div className={s.top}>
                    <img
                      src={product.image.sourceUrl}
                      alt=""
                      className={s.img}
                    />
                    <Link href={`/product/${product.slug}`}>
                      <a className={s.productLink}>Выбрать размер</a>
                    </Link>
                    <div className={s.remove}>
                      <button
                        onClick={() => deleteFromWishlist(product)}
                        dangerouslySetInnerHTML={{ __html: icons.times }}
                      />
                    </div>
                  </div>
                  <div className={s.details}>
                    <div className={s.nameRemove}>
                      <div className={s.brand}>
                        {product.paBrands.nodes[0].name
                          ? product.paBrands.nodes[0].name
                          : null}
                      </div>
                      <div className={s.name}>{product.name}</div>
                    </div>
                    <div className={s.price}>
                      {product.onSale ? salePriceFront : normalPriceFront}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <div className={s.emptyCart}>
      <p>Здесь будут сохраняться товары, которые вы добавили</p>
      <Link href="/">
        <a>Перейти к каталогу</a>
      </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(WishlistMain);
