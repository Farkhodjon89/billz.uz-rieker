import s from "./product-card.module.scss";
import ImageGallery from "react-image-gallery";
import icons from "../../public/fixture";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { getPrice, getFormat, getDiscount } from "../../utils";
import ProductsList from "../../components/ProductsList";
import SectionTitle from "../SectionTitle";
import ProductSlider from "../ProductSlider";
import InstantBuyModal from "../InstantBuyModal";
import OfferTwo from "../OfferTwo";
import MainSlider from "../MainSlider";
import Link from "next/link";

const ProductCard = ({
  product,
  contacts,
  cartItems,
  wishlistItems,
  addToCart,
  deleteFromCart,
  addToWishlist,
  deleteFromWishlist,
  getActiveStatus,
}) => {
  let shop = [];
  const shopPhone = [];

  if (product.metaData) {
    const OfficeData = JSON.parse(product.metaData[0].value);

    for (const contact of contacts) {
      if (contact.brands_settings.officeid == OfficeData[0].officeID) {
        if (contact.brands_settings.phones) {
          for (const phone of contact.brands_settings.phones) {
            shopPhone.push(
              <>
                <Link href={`tel:${phone.phone}`}>
                  <a>
                    <span dangerouslySetInnerHTML={{ __html: icons.phone }} />
                    {phone.phone}
                  </a>
                </Link>
              </>
            );
          }
        }
        shop.push(contact);
      }
    }
  }

  const [scroll, setScroll] = useState(0);
  const [productTop, setProductTop] = useState(0);

  useEffect(() => {
    const addToCartMobile = document.querySelector("#addToCart");
    setProductTop(addToCartMobile.offsetTop);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  const [selectedProductId, setSelectedProductId] = useState(
    product.variations
      ? product.variations.nodes[0].databaseId
      : product.databaseId
  );

  const [selectedProductStock, setSelectedProductStock] = useState(1);

  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variations
      ? product.variations.nodes[0].size.nodes[0]?.value
      : product.paSizes.nodes[0]?.name
  );

  const cartItem = cartItems.filter(
    (cartItem) => cartItem.selectedProductId === selectedProductId
  )[0];
  const wishlistItem = wishlistItems.filter(
    (wishlistItem) => wishlistItem.id === product.id
  )[0];
  const [selectedProductImage, setSelectedProductImage] = useState(
    product.variations
      ? product.variations.nodes[0].image
        ? product.variations.nodes[0].image.sourceUrl
        : null
      : product.image.sourceUrl
  );

  const [selectedProductColor, setSelectedProductColor] = useState(
    product.paColors.nodes.length != 0 ? product.paColors.nodes[0].name : null
  );

  const galleryImages = product.galleryImages.nodes.map(({ sourceUrl }) => ({
    original: sourceUrl,
    thumbnail: sourceUrl,
  }));
  const images = [
    {
      original: selectedProductImage,
      thumbnail: selectedProductImage,
    },
    ...galleryImages,
  ];

  const [windowWidth, setWindowWidth] = useState();
  const [stockStatus, setStockStatus] = useState(false);
  let resizeWindow = () => {
    setWindowWidth(window.screen.width);
  };
  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  const { normalPrice, salePrice } = getPrice(product);
  const normalPriceFront = [getFormat(normalPrice), "UZS"].join(" ");
  const salePriceFront = [getFormat(salePrice), "UZS"].join(" ");
  const discountPrice = getDiscount(normalPrice, salePrice);

  const changeSize = (e) => {
    setSelectedProductSize(e.target.value);
  };

  const [buy, setBuy] = useState(false);
  let sizes = [];
  return (
    <section className={s.productCard}>
      {console.log(product.metaData)}
      <div className={s.mobileProductImage}>
        <MainSlider SliderData={images} productMod={true} />
      </div>
      <div className="container">
        <div className={s.card}>
          <div className={s.left}>
            <div className={s.imageGallery}>
              <ImageGallery
                items={images}
                showPlayButton={false}
                showFullscreenButton={false}
                autoPlay={false}
                showNav={false}
                thumbnailPosition={windowWidth >= 1023 ? "left" : "bottom"}
              />
            </div>
          </div>
          <div className={s.right}>
            <div className={s.details}>
              <div className={s.name}>{product.name}</div>
              <div className={s.brand}>
                {product.paBrands.nodes[0].name
                  ? product.paBrands.nodes[0].name
                  : null}
              </div>
              <div className={s.price}>
                {product.onSale ? (
                  <>
                    <span className={s.salePrice}> {salePriceFront} </span>
                    <span className={s.normalPrice}>{normalPriceFront}</span>
                    <span className={s.discountPrice}>-{discountPrice}%</span>
                  </>
                ) : (
                  <span>{normalPriceFront}</span>
                )}
              </div>
              <div className={s.color}>
                Цвет:{" "}
                <span>
                  {product.paColors.nodes.length != 0
                    ? product.paColors.nodes[0].name
                    : null}
                </span>
              </div>
              <div className={s.size}>
                <div className={s.selectedSize}>
                  Размер: <span>{selectedProductSize}</span>
                </div>
                {/* <div className={s.sizeChart}>
                Таблица размеров
              </div> */}
              </div>

              <div className={s.sizeSelection}>
                {product.variations ? (
                  <select
                    value={selectedProductSize}
                    name="Выберите размер"
                    onChange={changeSize}
                  >
                    {product.variations.nodes.map((product) => {
                      sizes.push(product.size.nodes[0].value);
                      return <option>{product.size.nodes[0].value}</option>;
                    })}
                  </select>
                ) : null}
              </div>
              <button
                className={`${s.addToCart} ${cartItem ? s.active : ""}  `}
                id="addToCart"
                onClick={
                  cartItem
                    ? () => deleteFromCart(selectedProductId)
                    : () => {
                        addToCart(
                          product,
                          selectedProductColor,
                          selectedProductSize,
                          selectedProductId
                        ),
                          getActiveStatus(true);
                      }
                }
                disabled={!selectedProductStock}
              >
                {!selectedProductStock
                  ? "Нет в наличии"
                  : cartItem
                  ? "Добавлено в корзину"
                  : "Добавить в корзину"}
              </button>
              <div className={s.twobuttons}>
                <button className={s.OneClick} onClick={() => setBuy(!buy)}>
                  Купить сейчас
                </button>
                <InstantBuyModal
                  buy={buy}
                  setBuy={setBuy}
                  product={product}
                  selectedProductId={selectedProductId}
                  selectedProductColor={selectedProductColor}
                  selectedProductSize={selectedProductSize}
                  selectedProductStock={selectedProductStock}
                  normalPriceFront={normalPriceFront}
                  salePriceFront={salePriceFront}
                  discountPrice={discountPrice}
                  normalPrice={normalPrice}
                  salePrice={salePrice}
                  changeSize={changeSize}
                />
                <button
                  className={`${s.addToWishlist} ${
                    wishlistItem ? s.active : null
                  }`}
                  onClick={
                    wishlistItem
                      ? () => deleteFromWishlist(product)
                      : () => addToWishlist(product)
                  }
                  dangerouslySetInnerHTML={{ __html: icons.heart }}
                />
              </div>
              <button
                className={s.stockStatus}
                onClick={() => setStockStatus(!stockStatus)}
              >
                
              </button>

              {stockStatus ? (
                <div className={s.stockStatusBlock}>
                  <div className={s.title}>
                    {shop.length ? shop[0].name : null}
                    <button
                      className={s.close}
                      dangerouslySetInnerHTML={{ __html: icons.times }}
                      onClick={() => setStockStatus(false)}
                    />
                  </div>
                  <div className={s.sizes}>
                    Размеры в наличии:{" "}
                    <span>
                      {product.variations
                        ? sizes.join()
                        : product.paSizes.nodes[0]?.name}
                    </span>
                  </div>
                  <div className={s.text}>
                    Вы можете забронировать размер по телефону
                  </div>
                  <div className={s.shopPhone}>{shopPhone}</div>
                  <div className={s.shopAddress}>
                    <span dangerouslySetInnerHTML={{ __html: icons.address }} />
                    {shop.length ? shop[0].brands_settings.address : null}
                  </div>
                </div>
              ) : null}
              <div className={s.content}>
                Бесплатная доставка при заказе свыше <br />
                300 000 сум по Ташкенту осуществляется в течении 24 часов с
                момента заказа
              </div>
              <OfferTwo />
              <div
                className={`${s.addToCartMobile} ${
                  scroll > productTop + 480 && !buy ? s.sticky : ""
                }`}
                id="addToCartMobile"
              >
                <div className={s.top}>
                  <div
                    className={s.image}
                    style={{ background: `url(${images[0].original})` }}
                  ></div>
                  <div>
                    <div className={s.name}>{product.name}</div>
                    <div className={s.brand}>
                      {product.paBrands.nodes[0].name
                        ? product.paBrands.nodes[0].name
                        : null}
                    </div>
                  </div>
                </div>
                <div className={s.bottom}>
                  <div className={s.sizeSelection}>
                    {product.variations ? (
                      <select
                        value={selectedProductSize}
                        name="Выберите размер"
                        onChange={changeSize}
                      >
                        {product.variations.nodes.map((product) => (
                          <option>{product.size.nodes[0].value}</option>
                        ))}
                      </select>
                    ) : null}
                  </div>
                  <div className={s.twobuttons}>
                    <button className={s.OneClick} onClick={() => setBuy(!buy)}>
                      Купить сейчас
                    </button>
                    <button
                      className={`${s.addToCart} ${cartItem ? s.active : ""}  `}
                      onClick={
                        cartItem
                          ? () => deleteFromCart(selectedProductId)
                          : () => {
                              addToCart(
                                product,
                                selectedProductColor,
                                selectedProductSize,
                                selectedProductId
                              ),
                                getActiveStatus(true);
                            }
                      }
                      disabled={!selectedProductStock}
                    >
                      {!selectedProductStock
                        ? "Нет в наличии"
                        : cartItem
                        ? "В корзине"
                        : "В корзину"}
                    </button>
                  </div>
                </div>
              </div>

              {/* { windowWidth <= 1023 ? 
              <div className={s.productInfo}>
                <div className={s.productDescription}>
                  <h3 className={s.title}>Описание товара</h3>
                  <p className={s.descriptionContent}>Идеальная посадка, удобный крой и актуальная расцветка - вот, что отличает эти джинсы Lacoste. Правильно подобранные джинсы помогут подчеркнуть все плюсы фигуры.</p>
                </div>
                <div className={s.productComposition}>
                <h3 className={s.title}>Состав</h3>
                  <div className={s.compositions + " row"}>
                    <div className="col-lg-4 col-sm-6 col-xs-6 col-md-6">
                    •  57% хлопок<br />
                    •  21% модал<br />
                    •  17% полиэстер
                    </div>
                    <div className="col-lg-4 col-sm-6 col-xs-6 col-md-6">
                    •  5% эластан<br />
                    •  3% кашемир<br />
                    •  Casual
                    </div>
                    <div className="col-lg-4 col-sm-12 col-xs-6 col-md-6">
                    •  Франция<br />
                    •  Демисезон
                    </div>
                  </div>
                </div>
              </div> : null } */}
            </div>
          </div>
        </div>
        <SectionTitle title="Похожие товары" />
        {windowWidth >= 1023 ? (
          <ProductsList products={product.related.nodes} related={true} />
        ) : (
          <ProductSlider products={product.related.nodes} />
        )}
      </div>
    </section>
  );
};
export default ProductCard;
