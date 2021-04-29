import s from "./application-main.module.scss";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { getPrice, getFormat } from "../../utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { deleteAllFromCart } from "../../redux/actions/cartActions";
import icons from "../../public/fixture";
import ReactTooltip from "react-tooltip";
import MaskedInput from "react-input-mask";
import OrderReview from "../OrderReview";

const cities = [
  "Ташкент",
  "Республика Каракалпакстан",
  "Андижанская область",
  "Бухарская область",
  "Джизакская область",
  "Кашкадарьинская область",
  "Навоийская область",
  "Наманганская область",
  "Самаркандская область",
  "Сурхандарьинская область",
  "Сырдарьинская область",
  "Ташкентская область",
  "Ферганская область",
  "Хорезмская область",
];

const delivery = [
  { text: "Доставка курьером", value: "flat_rate" },
  { text: "Самовывоз из магазина", value: "local_pickup" },
];

const paymentMethods = [
  { img: "", value: "cash", first: true },
  {
    img: <span dangerouslySetInnerHTML={{ __html: icons.payme }} />,
    value: "payme",
  },
  {
    img: <span dangerouslySetInnerHTML={{ __html: icons.click }} />,
    value: "click",
  },
  {
    img: <span dangerouslySetInnerHTML={{ __html: icons.visa }} />,
    value: "visa",
  },
];

const ApplicationMain = ({ cartItems, deleteAllFromCart }) => {
  const [order, setOrder] = useState();
  const host =
    process.env.NODE_ENV === "production"
      ? "https://wp.fcnshop.billz.work"
      : "http://localhost:3000";

  const { register, handleSubmit, errors } = useForm();
  const [city, setCity] = useState("Ташкент");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [comment, setComment] = useState("");
  const [selectMethod, setSelectMethod] = useState(paymentMethods[0].value);
  const [selectDelivery, setSelectDelivery] = useState(delivery[0].value);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const lineItems = [];

  for (const product of cartItems) {
    const { normalPrice, salePrice } = getPrice(product);
    lineItems.push({
      product_id: product.databaseId,
      name: product.name,
      price: product.onSale ? salePrice : normalPrice,
      quantity: product.quantity,
      variation_id: product.variations && product.selectedProductId,
    });
  }

  const sendInfo = async () => {
    setIsLoading(true);

    const orderData = {
      set_paid: false,
      currency: "UZS",
      status: selectMethod === "cash" ? "processing" : "pending",
      payment_method_title:
        selectMethod === "cash"
          ? "Оплата наличными или картой при доставке"
          : selectMethod,
      line_items: lineItems,
      billing: {
        country: country,
        email: email,
        address_1: address,
        city: city,
        first_name: name,
        last_name: surname,
        phone: phone,
      },
      shipping_lines: [
        {
          method_id:
            selectDelivery === "flat_rate" ? "flat_rate" : "local_pickup",
          method_title:
            selectDelivery === "flat_rate"
              ? "Доставка курьером"
              : "Самовывоз из магазина",
          total: selectDelivery === "flat_rate" ? "30500" : "",
        },
      ],
      customer_note: comment && comment,
    };

    console.log(orderData.shipping_lines);

    const response = await axios.post("/api/order", { order: orderData });

    if (response.data.status) {
      setOrder(response.data.order);

      if (selectMethod === "cash") {
        console.log("click");
        await router.replace(`/order/${response.data.order.order_key}`);
        localStorage.clear();
      } else {
        console.log("click");
        const form = document.querySelector(`#${selectMethod}-form`);
        if (form) {
          form.submit();
        }
        localStorage.clear();
      }
    } else {
      alert(response.data.message);
      router.reload();
    }

    setIsLoading(false);
  };

  let orderReviewData = {
    price: 0,
    sale: 0,
    totalPrice: 0,
    button: (
      <button
        onClick={handleSubmit(sendInfo)}
        disabled={isLoading}
        className={s.orderButton}
      >
        {isLoading ? (
          <div className={s.loaderAnimation}></div>
        ) : (
          <>Оформить заказ</>
        )}
      </button>
    ),
  };

  for (const product of cartItems) {
    const { normalPrice, salePrice } = getPrice(product);

    orderReviewData.price += parseInt(normalPrice) * product.quantity;
    orderReviewData.sale += product.onSale
      ? parseInt(salePrice) * product.quantity
      : 0;
    let deliveryPrice = selectDelivery == "flat_rate" ? 30500 : 0;
    orderReviewData.totalPrice =
      orderReviewData.price - orderReviewData.sale + deliveryPrice;
  }

  return (
    <section className="container">
      <form
        id="click-form"
        method="get"
        action="https://my.click.uz/services/pay"
      >
        <input type="hidden" name="merchant_id" value="12787" />
        <input
          type="hidden"
          name="transaction_param"
          value={order && order.id}
        />
        <input type="hidden" name="service_id" value="17654" />
        <input type="hidden" name="amount" value={orderReviewData.totalPrice} />
        <input
          type="hidden"
          name="return_url"
          value={`${host}/order/${order && order.order_key}`}
        />
      </form>
      <div className={`row ${s.cards}`}>
        <div className={`${s.left} col-lg-8`}>
          <div className={s.order}>
            {cartItems.length >= 1 ? (
              <div className={s.inner}>
                <div className={s.label}>
                  Персональные данные
                  <span>01</span>
                </div>
                <div className={s.flex}>
                  <div className={s.inputs}>
                    <input
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                      ref={register({ required: true })}
                      className={errors.name && s.error}
                      placeholder="Имя"
                    />
                    {errors.name ? (
                      <div className={s.errorMessage}>
                        <span
                          dangerouslySetInnerHTML={{ __html: icons.warning }}
                          data-for="error"
                          data-tip
                        />
                        <ReactTooltip id="error" type="dark" effect="solid">
                          <span>Необходимо заполнить</span>
                        </ReactTooltip>
                      </div>
                    ) : null}
                  </div>
                  <div className={s.inputs}>
                    <input
                      name="surname"
                      onChange={(e) => setSurname(e.target.value)}
                      ref={register({ required: true })}
                      className={errors.surname && s.error}
                      placeholder="Фамилия"
                    />
                    {errors.surname ? (
                      <div className={s.errorMessage}>
                        <span
                          dangerouslySetInnerHTML={{ __html: icons.warning }}
                          data-for="error"
                          data-tip
                        />
                        <ReactTooltip id="error" type="dark" effect="solid">
                          <span>Необходимо заполнить</span>
                        </ReactTooltip>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className={s.flex}>
                  <div className={s.inputs}>
                    <MaskedInput
                      mask="+\9\98 (99) 999 99 99"
                      alwaysShowMask
                      className={errors.phone && s.error}
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      name="phone"
                    >
                      {(inputProps) => (
                        <input
                          ref={register({
                            required: true,
                            pattern: /^[\+]?[0-9]{3}?[-\s\.]?[(]?[0-9]{2}?[)][-\s\.]?[0-9]{3}?[-\s\.]?[0-9]{2}?[-\s\.]?[0-9]{2}$/im,
                          })}
                          value={phone}
                          name={inputProps.name}
                          {...inputProps}
                        />
                      )}
                    </MaskedInput>
                    {errors.phone ? (
                      <div className={s.errorMessage}>
                        <span
                          dangerouslySetInnerHTML={{ __html: icons.warning }}
                          data-for="error"
                          data-tip
                        />
                        <ReactTooltip id="error" type="dark" effect="solid">
                          <span>Необходимо заполнить</span>
                        </ReactTooltip>
                      </div>
                    ) : null}
                  </div>
                  <div className={s.inputs}>
                    <input
                      name="mail"
                      onChange={(e) => setEmail(e.target.value)}
                      ref={register({ required: false })}
                      className={errors.name && s.errorInput}
                      placeholder="E-mail Необязательное"
                    />
                  </div>
                </div>
                <div className={s.flex}>
                  <div className={s.inputs}>
                    <input
                      name="country"
                      onChange={(e) => setCountry(e.target.value)}
                      ref={register({ required: true })}
                      className={errors.country && s.error}
                      placeholder="Страна"
                    />
                    {console.log(country)}
                    {errors.country ? (
                      <div className={s.errorMessage}>
                        <span
                          dangerouslySetInnerHTML={{ __html: icons.warning }}
                          data-for="error"
                          data-tip
                        />
                        <ReactTooltip id="error" type="dark" effect="solid">
                          <span>Необходимо заполнить</span>
                        </ReactTooltip>
                      </div>
                    ) : null}
                  </div>
                  <div className={s.inputs}>
                    <select
                      name="city"
                      onChange={(e) => setCity(e.target.value)}
                      ref={register({ required: true })}
                      className={errors.city && s.errorInput}
                    >
                      {cities.map((r, i) => (
                        <option key={i}> {r}</option>
                      ))}
                    </select>
                    {errors.city ? (
                      <div className={s.errorMessage}>
                        <span
                          dangerouslySetInnerHTML={{ __html: icons.warning }}
                          data-for="error"
                          data-tip
                        />
                        <ReactTooltip id="error" type="dark" effect="solid">
                          <span>Необходимо заполнить</span>
                        </ReactTooltip>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className={s.inputs}>
                  <input
                    name="address"
                    onChange={(e) => setAddress(e.target.value)}
                    ref={register({ required: true })}
                    className={errors.address && s.error}
                    placeholder="Адрес (Район, улица, номер дома и квартиры)"
                  />
                  {errors.address ? (
                    <div className={s.errorMessage}>
                      <span
                        dangerouslySetInnerHTML={{ __html: icons.warning }}
                        data-for="error"
                        data-tip
                      />
                      <ReactTooltip id="error" type="dark" effect="solid">
                        <span>Необходимо заполнить</span>
                      </ReactTooltip>
                    </div>
                  ) : null}
                </div>

                <div className={s.inputs}>
                  <textarea
                    name="comment"
                    onChange={(e) => setComment(e.target.value)}
                    ref={register}
                    placeholder="Комментарии"
                  />
                </div>
                <div className={s.label}>
                  Способ доставки
                  <span>02</span>
                </div>
                <div className={s.payments}>
                  {delivery.map((r) => (
                    <button
                      key={uuidv4()}
                      className={`${
                        selectDelivery === r.value ? s.active : ""
                      }`}
                      onClick={() => setSelectDelivery(r.value)}
                    >
                      <div className={s.checker}></div>
                      {r.text}
                    </button>
                  ))}
                  <div className={s.deliveryText}>
                    Доставка по Узбекистану в течение 48 часов
                  </div>
                </div>

                <div className={s.label}>
                  Метод оплаты
                  <span>03</span>
                </div>
                <div className={s.payments}>
                  {paymentMethods.map((r, i) => (
                    <button
                      key={uuidv4()}
                      className={`${selectMethod === r.value ? s.active : ""} ${
                        r.first ? s.first : ""
                      } ${i != 0 ? s.minWidth : ""}`}
                      onClick={() => setSelectMethod(r.value)}
                    >
                      <div className={s.checker}></div>
                      {r.img ? r.img : null}
                      {r.value === "cash" &&
                        "Оплата наличными или картой при доставке"}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className={s.emptyCart}>
                Корзина пуста
                <Link href="/catalog">
                  <a>Начать покупки</a>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className={`${s.right} col-lg-4`}>
          <div className={s.rightInner}>
            <OrderReview
              data={orderReviewData}
              selectDelivery={selectDelivery}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteAllFromCart: () => {
      dispatch(deleteAllFromCart());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationMain);
