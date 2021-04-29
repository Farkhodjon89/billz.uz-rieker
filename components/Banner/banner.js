import s from "./banner.module.scss";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

const Banner = ({
  img,
  brand,
  title,
  subTitle,
  buttonTitle,
  url,
  style,
  noMargin,
}) => (
  <section className="banner">
    <div
      key={uuidv4()}
      className={noMargin ? `${s.banner} ${s.noMargin}` : s.banner}
    >
      <div style={{ backgroundImage: `url(${img})` }} className={s.bannerImg}>
        <div className={s.bannerContnet}>
          {style == 1 ? (
            <div>
              {brand ? <img className={s.brandStyleOne} src={brand} /> : null}
              <div className={s.titleStyleOne}>{title}</div>
              <div className={s.subTitleStyleOne}>
                {subTitle ? subTitle : null}
              </div>
              <Link href={url}>
                <a className={s.buttonStyleOne}>{buttonTitle}</a>
              </Link>
            </div>
          ) : null}
          {style == 2 ? (
            <div>
              {brand ? <img className={s.brandStyleTwo} src={brand} /> : null}
              <div className={s.titleStyleTwo}>{title}</div>
              <Link href={url}>
                <a className={s.buttonStyleOne}>{buttonTitle}</a>
              </Link>
            </div>
          ) : null}
          {style == 3 ? (
            <div>
              <div className={s.titleStyleThree}>{title}</div>
              <Link href={url}>
                <a className={s.buttonStyleThree}>{buttonTitle}</a>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  </section>
);
export default Banner;
