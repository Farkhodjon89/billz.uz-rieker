import s from "./header-two.module.scss";
import Link from "next/link";
import icons from "../../public/fixture";

const HeaderTwo = ({ orderPage }) => (
  <header className={s.header}>
    <div className="container">
      <div className={s.content}>
        <Link href="/">
          <a>
            <span
              className={s.logo}
              dangerouslySetInnerHTML={{ __html: icons.logo }}
            />
          </a>
        </Link>

        <Link href="/">
          <a>
            <span dangerouslySetInnerHTML={{ __html: icons.phone }} />
            (71) 200-1111
          </a>
        </Link>
      </div>
    </div>
  </header>
);

export default HeaderTwo;
