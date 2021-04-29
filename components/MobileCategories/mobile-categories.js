import { urlObjectKeys } from "next/dist/next-server/lib/utils";
import Link from "next/link";
import { useState } from "react";
import icons from "../../public/fixture";
import s from "./mobile-categories.module.scss";

const MobileCategories = ({
  categories,
  parentCategory,
  saleCategoryImage,
  getActiveStatus,
}) => {
  const [activeCategory, setActiveCategory] = useState();

  let parentCategories = [];

  for (const category of categories.children.nodes) {
    let childrenCategories = [];
    for (const children of category.children.nodes) {
      childrenCategories.push(
        <li className={s.item} onClick={() => getActiveStatus(false)}>
          <Link href={`/catalog/${parentCategory}/${children.slug}`}>
            <a>
              {children.name}
              <span className={s.count}>{children.count}</span>
            </a>
          </Link>
        </li>
      );
    }
    if (category.category_settings.mobilecategoryimage != null) {
      parentCategories.push(
        <div className={s.categories}>
          <div
            className={s.category}
            style={{
              backgroundImage: `url(${category.category_settings.mobilecategoryimage.sourceUrl})`,
            }}
            onClick={() => setActiveCategory(category.slug)}
          >
            <span className={s.title}>{category.name}</span>
          </div>
          <div
            className={`${s.children} ${
              activeCategory == category.slug ? s.active : null
            }`}
          >
            <button
              dangerouslySetInnerHTML={{ __html: icons.fullArrowLeft }}
              className={s.icon}
              onClick={() => setActiveCategory()}
            />
            <h3 className={s.title}>{category.name}</h3>
            <span className={s.subTitle}>Категории</span>
            <ul className={s.list}>{childrenCategories}</ul>
          </div>
        </div>
      );
    }
  }

  return (
    <>
      {parentCategories}
      {saleCategoryImage ? (
        <div className={s.categories}>
          <Link href={`/catalog/${parentCategory}/sale`}>
            <a onClick={() => getActiveStatus(false)}>
              <div
                className={s.category}
                style={{ backgroundImage: `url(${saleCategoryImage})` }}
              >
                <span className={s.title}>Скидки</span>
              </div>
            </a>
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default MobileCategories;
