import s from "./sub-menu.module.scss";
import LinksModal from "../LinksModal";
import Link from "next/link";
import { useRouter } from "next/router";

const SubMenu = ({ categories }) => {
  let categoriesList = [];

  for (const category of categories.children.nodes) {
    categoriesList.push(
      <li className={s.item}>
        <Link href={`/catalog/${categories.slug}/${category.slug}`}>
          <a className={s.link}>{category.name}</a>
        </Link>
        {category.children ? (
          <LinksModal category={category} parentCategory={categories.slug} />
        ) : null}
      </li>
    );
  }

  return (
    <section className={`${s.categoryMenu} categoryMenu`}>
      <div className="container">
        <ul className={s.list}>
          {categoriesList}
          <li className={`${s.item} ${s.sale}`}>
            <Link href={`/catalog/${categories.slug}/sale`}>
              <a className={s.link}>Скидки</a>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SubMenu;
