import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import icons from "../../public/fixture";
import s from "./page-navigation.module.scss";

const PageNavigation = ({ navigation, activePage, openNavigation }) => {
  let navigationList = [];

  for (const nav of navigation) {
    navigationList.push(
      <li
        key={uuidv4()}
        className={`${s.item} ${activePage == nav.link ? s.active : ""}`}
      >
        <Link href={nav.link}>
          <a>
            {nav.title}
            <span dangerouslySetInnerHTML={{ __html: icons.fullArrowLeft }} />
          </a>
        </Link>
      </li>
    );
  }

  return (
    <div
      className={`${s.LeftNavigation} ${openNavigation ? s.activeMobile : ""}`}
    >
      <ul className={s.list}>{navigationList}</ul>
    </div>
  );
};

export default PageNavigation;
