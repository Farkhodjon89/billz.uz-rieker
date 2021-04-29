import s from "./four-block.module.scss";
import Link from "next/link";

const FourBlock = () => (
  <section className={s.banners}>
    <div className="row">
      <div className={s.banner + " col-xl-4 col-lg-4 col-sm-12"}>
        <div style={{ backgroundImage: `url(/home/post1.png)` }}>
          <Link href="/">
            <a className={s.title}>Мужчины</a>
          </Link>
          <Link href="/">
            <a className={s.link}>Перейти к покупке</a>
          </Link>
        </div>
      </div>
      <div className={s.banner + " col-xl-4 col-lg-4 col-sm-12"}>
        <div style={{ backgroundImage: `url(/home/post2.png)` }}>
          <Link href="/">
            <a className={s.title}>Женщины</a>
          </Link>
          <Link href="/">
            <a className={s.link}>Перейти к покупке</a>
          </Link>
        </div>
      </div>
      <div className={s.banner + " col-xl-4 col-lg-4 col-sm-12"}>
        <div style={{ backgroundImage: `url(/home/post3.png)` }}>
          <Link href="/">
            <a className={s.title}>Мальчики</a>
          </Link>
          <Link href="/">
            <a className={s.link}>Перейти к покупке</a>
          </Link>
        </div>

        <div style={{ backgroundImage: `url(/home/post4.png)` }}>
          <Link href="/">
            <a className={s.title}>Девочки</a>
          </Link>
          <Link href="/">
            <a className={s.link}>Перейти к покупке</a>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default FourBlock;
