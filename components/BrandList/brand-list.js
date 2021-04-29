import s from "./brand-list.module.scss";
import Link from "next/link";

const BrandList = ({ brands }) => {
  let letters = [];
  let brandList = [];

  for (const letter of brands) {
    let list = [];
    letters.push(
      <li
        className={`${s.item} ${letter.brands.length != 0 ? s.active : null}`}
      >
        {letter.letter}
      </li>
    );

    if (letter.brands.length != 0) {
      for (const brand of letter.brands) {
        list.push(
          <li className={s.item}>
            <Link href={`/catalog?filter_brands=${brand}`}>
              <a>{brand}</a>
            </Link>
          </li>
        );
      }
      brandList.push(
        <li className={s.item}>
          {letter.letter}
          <ul className={s.brands}>{list}</ul>
        </li>
      );
    }
  }

  return (
    <div className={s.brandList}>
      <div className={s.wrapper}>
        <div className={s.heading}>
          <ul className={s.list}>{letters}</ul>
        </div>
        <div className={s.content}>
          <ul className={s.list}>{brandList}</ul>
        </div>
      </div>
    </div>
  );
};

export default BrandList;
