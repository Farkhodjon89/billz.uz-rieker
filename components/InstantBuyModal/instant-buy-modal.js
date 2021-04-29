import React from "react";
import s from "./instant-buy-modal.module.scss";
import ReactModal from "react-modal";
import { useState } from "react";
import axios from "axios";
import icons from "../../public/fixture";
import MaskedInput from "react-input-mask";
import { useForm } from "react-hook-form";
import ReactTooltip from "react-tooltip";
import { useRouter } from "next/router";
import Link from "next/link";

const InstantBuyModal = ({
  buy,
  setBuy,
  product,
  selectedProductId,
  selectedProductColor,
  selectedProductSize,
  selectedProductStock,
  normalPriceFront,
  salePriceFront,
  normalPrice,
  salePrice,
  changeSize,
}) => {
  console.log(normalPriceFront);
  console.log(salePriceFront);
  const { register, handleSubmit, errors } = useForm();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [thank, setThank] = useState(false);
  const [orderID, setOrderID] = useState("");

  const sendInfo = async () => {
    setIsLoading(true);

    const orderData = {
      set_paid: false,
      currency: "UZS",
      status: "processing",
      payment_method_title: "cash",
      line_items: [
        {
          product_id: product.databaseId,
          name: product.name,
          price: product.onSale ? salePrice : normalPrice,
          quantity: product.quantity,
          variation_id: product.variations && selectedProductId,
        },
      ],
      billing: {
        first_name: name,
        phone: phone,
      },
    };

    const response = await axios.post("/api/order", { order: orderData });

    if (response.data.status) {
      setBuy(false);
      setOrderID(response.data.order.id);
      setThank(true);
    } else {
      alert(response.data.message);
      router.reload();
    }

    setIsLoading(false);
  };

  return (
    <>
      <ReactModal
        isOpen={buy}
        onRequestClose={() => setBuy(false)}
        ariaHideApp={false}
        overlayClassName={s.modalOverlay}
        className={s.modalContent}
      >
        <div className={s.modalTop}>
          <div>
            <img src="/instantBuyModal.svg" alt="" />
            Купить сейчас
          </div>
          <button
            className={s.close}
            dangerouslySetInnerHTML={{ __html: icons.times }}
            onClick={() => setBuy(false)}
          />
        </div>
        <div className={s.product}>
          <div className={s.image}>
            <img src={product.image ? product.image.sourceUrl : null} alt="" />
          </div>
          <div className={s.details}>
            <div className={s.title}>
              <div>
                {product.paBrands.nodes[0].name
                  ? product.paBrands.nodes[0].name
                  : null}
              </div>
              <div className={s.price}>
                <span>{salePrice ? salePriceFront : normalPriceFront}</span>
              </div>
            </div>
            <div className={s.name}>{product.name}</div>
            <div className={s.color}>
              Цвет: <span> {selectedProductColor}</span>
            </div>
          </div>
        </div>
        <div className={s.sizeSelection}>
          {product.variations ? (
            <select
              value={selectedProductSize}
              name="Выберите размер"
              onChange={changeSize}
            >
              Размер:
              {product.variations.nodes.map((product) => (
                <option> {product.size.nodes[0].value}</option>
              ))}
            </select>
          ) : null}
        </div>
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
        <div className={s.totalPirce}>
          Итого
          <span className={s.price}>
            {salePrice ? salePriceFront : normalPriceFront}
          </span>
        </div>
        <button
          className={`orderReviewButton ${s.order}`}
          disabled={!selectedProductStock || isLoading}
          onClick={handleSubmit(sendInfo)}
        >
          {isLoading ? (
            <div className={s.loaderAnimation}></div>
          ) : (
            <>{!selectedProductStock ? "Нет в наличии" : "Купить"}</>
          )}
        </button>
      </ReactModal>
      {thank ? (
        <ReactModal
          isOpen={thank}
          onRequestClose={() => setThank(false)}
          ariaHideApp={false}
          overlayClassName={s.modalOverlay}
          className={s.modalContent}
        >
          <section className={s.wrapper}>
            <div className={s.heading}>
              <div className={s.logo}>
                <span
                  className={s.logo}
                  dangerouslySetInnerHTML={{ __html: icons.logo }}
                />
              </div>
              <h2 className={s.title}>Успешно отправлен</h2>
              <div className={s.description}>
                Если у вас возникли вопросы, обращайтесь по телефону и мы
                обязательно решим возникший вопрос
                <Link href="tel:+998 (71) 200-11-11">
                  <a> +998 (71) 200-11-11</a>
                </Link>
              </div>
            </div>
            <div className={s.clientData}>
              <h2 className={s.title}>Данные заказа</h2>
              <ul className={s.list}>
                <li className={s.item}>
                  <p>Номер заказа</p> <span>{orderID}</span>
                </li>
                <li className={s.item}>
                  <p>Имя</p> <span>{name}</span>
                </li>
                <li className={s.item}>
                  <p>Номер телефона</p> <span>{phone}</span>
                </li>
                <li className={s.item}>
                  <p>Итого</p>{" "}
                  <span>{salePrice ? salePriceFront : normalPriceFront}</span>
                </li>
              </ul>
            </div>
            {/* <OrderReview /> */}
            <button className={s.button} onClick={() => setThank(false)}>
              Ок
            </button>
          </section>
        </ReactModal>
      ) : null}
    </>
  );
};

export default InstantBuyModal;
