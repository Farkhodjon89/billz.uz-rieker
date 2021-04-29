import s from "./order-review.module.scss";

const OrderReview = ({ data, selectDelivery }) => {
  return (
    <div className={s.orderreview}>
      <h4 className={s.title}>Итог заказа</h4>
      <ul className={s.list}>
        <li className={`${s.item} ${s.subtotal}`}>
          Подытог <span>{data.price} UZS</span>
        </li>
        <li className={`${s.item} ${s.sale}`}>
          Скидки <span>-{data.sale} UZS</span>
        </li>
        {selectDelivery === "flat_rate" ? (
          <li className={`${s.item} ${s.delivery}`}>
            Доставка <span>30 500 UZS</span>
          </li>
        ) : null}
        <li className={`${s.item} ${s.total}`}>
          Итого <span>{data.totalPrice} UZS</span>
        </li>
      </ul>
      {data.button ? data.button : null}
    </div>
  );
};

export default OrderReview;
