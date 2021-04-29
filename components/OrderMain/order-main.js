import s from "./order-main.module.scss";
import Link from "next/link";
import icons from "../../public/fixture";
import OrderReview from "../OrderReview";

const OrderMain = ({ order }) => {
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

  return (
    <>
      {console.log(order)}
      <section className={s.wrapper}>
        <div className={s.heading}>
          <div className={s.logo}>
            <span
              className={s.logo}
              dangerouslySetInnerHTML={{ __html: icons.logo }}
            />
          </div>
          <h2 className={s.title}>Спасибо за покупку!</h2>
          <div className={s.description}>
            Если у вас возникли вопросы, обращайтесь по телефону и мы
            обязательно решим возникший вопрос
            <Link href="tel:+998 (71) 200-11-11">
              <a> +998 (71) 200-11-11</a>
            </Link>
          </div>
        </div>
        <div className={s.clientData}>
          <h2 className={s.title}>Данные заказчика</h2>
          <ul className={s.list}>
            <li className={s.item}>
              <p>Номер заказа</p> <span>{order.databaseId}</span>
            </li>
            <li className={s.item}>
              <p>Имя</p> <span>{order.billing.firstName}</span>
            </li>
            <li className={s.item}>
              <p>Фамилия</p> <span>{order.billing.lastName}</span>
            </li>
            <li className={s.item}>
              <p>Номер телефона</p> <span>{order.billing.phone}</span>
            </li>
            <li className={s.item}>
              <p>Адрес доставки</p> <span>{order.billing.address1}</span>
            </li>
            <li className={s.item}>
              <p>Способ доставки</p>{" "}
              <span>
                {order.shippingLines
                  ? order.shippingLines.nodes[0].methodTitle
                  : null}
              </span>
            </li>
            <li className={s.item}>
              <p>Метод оплаты</p> <span>{order.paymentMethodTitle}</span>
            </li>
          </ul>
        </div>
        {/* <OrderReview /> */}
        <Link href="/">
          <a className={s.button}>Вернутся на главную страницу</a>
        </Link>
      </section>
    </>
  );
};

export default OrderMain;
