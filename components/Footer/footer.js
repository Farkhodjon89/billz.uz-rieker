import s from "./footer.module.scss";
import Link from "next/link";

import icons from "../../public/fixture";

const Footer = () => (
  <footer>
    <section className={s.footer}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className={s.menu}>
              <div className="row">
                <div className="col-lg-3">
                  <ul className={s.list}>
                    <li className={s.title}>Полезная информация</li>
                    <li className={s.item}>
                      <Link href="/about-us/fcn-group">
                        <a>О нас</a>
                      </Link>
                    </li>
                    <li className={s.item}>
                      <Link href="/about-us/fcn-group">
                        <a>Магазины</a>
                      </Link>
                    </li>
                    <li className={s.item}>
                      <Link href="/contacts">
                        <a>Контакты</a>
                      </Link>
                    </li>
                    <li className={s.item}>
                      <Link href="/info/politika-konfidenczialnosti">
                        <a>Публичная оферта</a>
                      </Link>
                    </li>
                    {/* <li className={s.item}>
                      <Link href="/"><a>Часто задаваемые вопросы</a></Link>
                    </li> */}
                  </ul>
                </div>
                <div className="col-lg-3">
                  <ul className={s.list}>
                    <li className={s.title}>Категории</li>
                    <li className={s.item}>
                      <Link href="/catalog/muzhskoj">
                        <a>Мужчины</a>
                      </Link>
                    </li>
                    <li className={s.item}>
                      <Link href="/catalog/zhenskij">
                        <a>Женщины</a>
                      </Link>
                    </li>
                    <li className={s.item}>
                      <Link href="/catalog/zhenskij">
                        <a>Дети</a>
                      </Link>
                    </li>
                    <li className={s.item}>
                      <Link href="/brands">
                        <a>Бренды</a>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3">
                  <ul className={s.list}>
                    <li className={s.title}>Помощь</li>
                    <li className={s.item}>
                      <Link href="/info/dostavka-i-vozvrat">
                        <a>Доставка</a>
                      </Link>
                    </li>
                    {/* <li className={s.item}>
                      <Link href="/"><a>Способы оплаты</a></Link>
                    </li> */}
                    <li className={s.item}>
                      <Link href="/info/dostavka-i-vozvrat">
                        <a>Возврат, обмен</a>
                      </Link>
                    </li>
                    {/* <li className={s.item}>
                      <Link href="/"><a>Накопительная система</a></Link>
                    </li> */}
                  </ul>
                </div>
                <div className="col-lg-3">
                  <ul className={s.list}>
                    <li className={s.title}>Помощь</li>
                    <li className={`${s.phone} ${s.item}`}>
                      <Link href="tel:+998712001111">
                        <a>
                          <span
                            dangerouslySetInnerHTML={{ __html: icons.phone }}
                          />
                          (71) 200-1111
                        </a>
                      </Link>
                    </li>
                    <li className={s.title}>Мы в социальных сетях</li>
                    <ul className={s.socialList}>
                      <li className={s.item}>
                        <Link href="/">
                          <a
                            dangerouslySetInnerHTML={{ __html: icons.telegram }}
                          />
                        </Link>
                      </li>
                      <li className={s.item}>
                        <Link href="/">
                          <a
                            dangerouslySetInnerHTML={{ __html: icons.facebook }}
                          />
                        </Link>
                      </li>
                      <li className={s.item}>
                        <Link href="/">
                          <a
                            dangerouslySetInnerHTML={{
                              __html: icons.instagram,
                            }}
                          />
                        </Link>
                      </li>
                    </ul>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className={s.copyright}>
              <div className="row">
                <div
                  className={`col-lg-3 col-xl-3 col-md-4 col-sm-12 ${s.left}`}
                >
                  2020 © Rieker-shop.uz — интернет магазин <br /> немецкой обуви
                  и аксессуаров. Все права защищены.
                </div>
                <div
                  className={`col-lg-6 col-xl-6 col-md-4  col-sm-12 ${s.center}`}
                >
                  <ul className={s.list}>
                    <li className={s.item}>
                      <span dangerouslySetInnerHTML={{ __html: icons.click }} />{" "}
                    </li>
                    <li className={s.item}>
                      <span dangerouslySetInnerHTML={{ __html: icons.payme }} />{" "}
                    </li>
                    <li className={s.item}>
                      <span dangerouslySetInnerHTML={{ __html: icons.visa }} />{" "}
                    </li>
                  </ul>
                </div>
                <div
                  className={`col-lg-3 col-xl-3 col-md-4 col-sm-12 ${s.right}`}
                >
                  <Link href="https://billz.uz">
                    <a target="_blank">
                      E-commerce решение от
                      <span
                        dangerouslySetInnerHTML={{ __html: icons.billzLogo }}
                      />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </footer>
);

export default Footer;
