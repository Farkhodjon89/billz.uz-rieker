import s from "./links-modal.module.scss";
import { chunk } from "../../utils";
import Link from "next/link";

const LinksModal = ({ category, parentCategory }) => {
  const categoriesChunks = chunk(category.children.nodes, 10);
  const col = 3;
  const categoryBox = 12 / categoriesChunks.length;
  const categoriesBox =
    categoriesChunks.length < 4 ? col * categoriesChunks.length : 12;

  let categoriesList = [];
  let productImages = [];

  for (const key in categoriesChunks) {
    let children = [];
    const categories = categoriesChunks[key];
    for (const key in categories) {
      const category = categories[key];
      children.push(
        <li className={s.item}>
          <Link href={`/catalog/${parentCategory}/${category.slug}`}>
            <a>
              {category.name}
              <span class="${s.count}">{category.count}</span>
            </a>
          </Link>
        </li>
      );
    }

    if (key == categoriesChunks.length - 1) {
      for (var i = 0; i < 4 - categoriesChunks.length; i++) {
        if (category.products.nodes[i]) {
          productImages.push(
            <div className={`col-lg-${12 / (4 - categoriesChunks.length)}`}>
              <Link href={`/product/${category.products.nodes[i].slug}`}>
                <a>
                  <div
                    className={s.product}
                    style={{
                      background: `url(${category.products.nodes[i].image.sourceUrl})`,
                    }}
                  ></div>
                </a>
              </Link>
            </div>
          );
        }
      }
    }

    categoriesList.push(
      <>
        <div className={`col-lg-${categoryBox}`}>
          <ul className={s.list}>{children}</ul>
        </div>
      </>
    );
  }

  return (
    <div className={`${s.subCategoryMenu} subCategoryMenu`}>
      <div className="container">
        <div className="row">
          <div className={`col-lg-${categoriesBox}`}>
            <div className={s.title}>Категории</div>
            <div className="row">{categoriesList}</div>
          </div>
          {categoriesChunks.length < 4 ? (
            <div className={`col-lg-${(4 - categoriesChunks.length) * 3}`}>
              <div className="row">{productImages}</div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LinksModal;
