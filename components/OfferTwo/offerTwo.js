import s from "./offerTwo.module.scss";
import icons from "../../public/fixture";
import Accordion from "../Accordion";

const OfferTwo = () => (
  <section className={s.wrapper}>
    <Accordion title="Бесплатная доставка" icon={icons.truck} noMargin>
      <div className={s.content}>
        Осуществляется по Ташкенту при заказе на 500,000 сум и выше
      </div>
    </Accordion>
    <Accordion title="Бесплатная примерка" icon={icons.arrowsInSimple} noMargin>
      <div className={s.content}>
        Осуществляется по Ташкенту при заказе на 500,000 сум и выше
      </div>
    </Accordion>
    <Accordion title="Возврат товара" icon={icons.arrowsClockwise} noMargin>
      <div className={s.content}>
        Гарантия подлинности всех брендов, представленных в магазине
      </div>
    </Accordion>
    <Accordion title="90 дней гарантии" icon={icons.shieldCheck} noMargin>
      <div className={s.content}>
        Обменять или вернуть товары можно в течении 10 дней при наличии чека и
        товарного вида
      </div>
    </Accordion>
  </section>
);
export default OfferTwo;
