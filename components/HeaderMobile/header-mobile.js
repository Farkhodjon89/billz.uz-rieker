import icons from "../../public/fixture";
import s from "./header-mobile.module.scss";
import MobileCategories from "../MobileCategories";
import Tabs from "../Tabs";
import Link from "next/link";

const HeaderMobile = ({
  activeStatus,
  getActiveStatus,
  categories,
  wishlistItems,
}) => {
  const men = categories.find((category) => category.slug === "muzhskoj");
  const woman = categories.find((category) => category.slug === "zhenskij");
  const boy = categories.find((category) => category.slug === "malchik");
  const girl = categories.find((category) => category.slug === "devochka");

  const mobileCategoryTabs = [
    {
      id: 0,
      name: "Мужчины",
      icon: null,
      content: (
        <MobileCategories
          categories={men}
          parentCategory="muzhskoj"
          saleCategoryImage={
            men.category_settings.mobilesaleimage
              ? men.category_settings.mobilesaleimage.sourceUrl
              : null
          }
          getActiveStatus={getActiveStatus}
        />
      ),
    },
    {
      id: 1,
      name: "Женщины",
      icon: null,
      content: (
        <MobileCategories
          categories={woman}
          parentCategory="zhenskij"
          saleCategoryImage={
            woman.category_settings.mobilesaleimage
              ? woman.category_settings.mobilesaleimage.sourceUrl
              : null
          }
          getActiveStatus={getActiveStatus}
        />
      ),
    },
    {
      id: 2,
      name: "Мальчики",
      icon: null,
      content: (
        <MobileCategories
          categories={boy}
          parentCategory="malchik"
          saleCategoryImage={
            boy.category_settings.mobilesaleimage
              ? boy.category_settings.mobilesaleimage.sourceUrl
              : null
          }
          getActiveStatus={getActiveStatus}
        />
      ),
    },
    {
      id: 3,
      name: "Девочки",
      icon: null,
      content: (
        <MobileCategories
          categories={girl}
          parentCategory="devochka"
          saleCategoryImage={
            girl.category_settings.mobilesaleimage
              ? girl.category_settings.mobilesaleimage.sourceUrl
              : null
          }
          getActiveStatus={getActiveStatus}
        />
      ),
    },
  ];

  return (
    <section className={`${s.wrapper}  ${activeStatus && s.active}`}>
      <div className={s.mobileMenu}>
        <Tabs data={mobileCategoryTabs} mobileCategory={true} />
        <ul className={s.list}>
          {/* <li className={`${s.user} ${s.item}`}>
                <Link href='/'>
                  <a >
                    <span dangerouslySetInnerHTML={{__html: icons.user }}  /> 
                    <h4 className={s.title}>Войти</h4>
                  </a>
                </Link>
              </li> */}
          <li className={`${s.wishlist} ${s.item}`}>
            <Link href="/wishlist">
              <a className={s.mobileWishlist}>
                <span dangerouslySetInnerHTML={{ __html: icons.wishlist }} />
                {wishlistItems.length > 0 && (
                  <span className={s.wishlistQuantity}>
                    {wishlistItems.length}
                  </span>
                )}
                <span className={s.title}>Избранное</span>
              </a>
            </Link>
          </li>

          <li className={`${s.help} ${s.item}`}>
            <Link href="/">
              <a>
                <span dangerouslySetInnerHTML={{ __html: icons.help }} />
                <h4 className={s.title}>Помощь</h4>
              </a>
            </Link>
          </li>
          <li className={`${s.phone} ${s.item}`}>
            <Link href="/">
              <a>
                <span dangerouslySetInnerHTML={{ __html: icons.phone }} />
                (71) 200-1111
              </a>
            </Link>
          </li>
        </ul>
        <div className={s.social}>
          <div className={s.title}>Мы в социальных сетях</div>
          <ul className={s.list}>
            <li className={s.item}>
              <Link href="/">
                <a dangerouslySetInnerHTML={{ __html: icons.telegram }} />
              </Link>
            </li>
            <li className={s.item}>
              <Link href="/">
                <a dangerouslySetInnerHTML={{ __html: icons.facebook }} />
              </Link>
            </li>
            <li className={s.item}>
              <Link href="/">
                <a dangerouslySetInnerHTML={{ __html: icons.instagram }} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={s.apply}>
        <button
          onClick={() => getActiveStatus(false)}
          dangerouslySetInnerHTML={{ __html: icons.times }}
        />
      </div>
    </section>
  );
};

export default HeaderMobile;
