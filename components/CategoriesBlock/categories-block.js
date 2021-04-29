import s from "./categories-block.module.scss";
import Link from "next/link";
import icons from "../../public/fixture";

const CategoriesBlock = ({ categories, quantity }) => (
  <section className={quantity == 4 ? s.fourBlock : s.fiveBlock}>
    {categories.map((category) => (
      <div className={s.banner}>
        <div style={{ backgroundImage: `url(${category.image.sourceUrl})` }}>
          <Link href={category.link}>
            <a className={s.title}>{category.title}</a>
          </Link>
          <Link href={category.link}>
            <a className={s.link}>
              К покупке{" "}
              <span dangerouslySetInnerHTML={{ __html: icons.fullArrowLeft }} />
            </a>
          </Link>
        </div>
      </div>
    ))}
  </section>
);

export default CategoriesBlock;
