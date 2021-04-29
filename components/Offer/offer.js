import s from "./offer.module.scss";
import icons from "../../public/fixture";

const HomeOne = () => (
  <section className={s.wrapper}>
    <div>
      <span
        dangerouslySetInnerHTML={{ __html: icons.truck }}
        className={s.icon}
      />
      <span>Бесплатная доставка</span>
      <p>В течении 48 часов по Ташкенту</p>
    </div>
    <div>
      <span
        dangerouslySetInnerHTML={{ __html: icons.arrowsInSimple }}
        className={s.icon}
      />
      <span>Бесплатная примерка</span>
      <p>Примеряйте, а потом покупайте!</p>
    </div>

    <div>
      <span
        dangerouslySetInnerHTML={{ __html: icons.arrowsClockwise  }}
        className={s.icon}
      />
      <span>Возврат товара</span>
      <p>
      3 месяца с момента покупки
      </p>
    </div>
    <div>
      <span
        dangerouslySetInnerHTML={{ __html: icons.shieldCheck }}
        className={s.icon}
      />
      <span>90 дней гарантии</span>
      <p>
      Будьте уверены в покупке
      </p>
    </div>
  </section>
);
export default HomeOne;
