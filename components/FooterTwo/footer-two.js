import s from "./footer-two.module.scss";
import Link from "next/link";

import icons from "../../public/fixture";

const FooterTwo = () => (
  <footer>
    <section className={s.footer}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className={s.copyright}>
              <div className="row">
                <div
                  className={`col-lg-3 col-xl-3 col-md-4 col-sm-12 ${s.left}`}
                >
                  Все права защищены 2021
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

export default FooterTwo;
