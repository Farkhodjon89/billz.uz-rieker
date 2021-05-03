import s from "./header.module.scss";
import Link from "next/link";
import { useState, useEffect } from "react";
import HeaderMobile from "../HeaderMobile";
import CartModal from "../CartModal";
import { connect } from "react-redux";
import icons from "../../public/fixture";
import SubMenu from "../../components/SubMenu";
import { useRouter } from "next/router";
import SearchModal from "../SearchModal";
import { useLazyQuery } from "@apollo/client";
import client from "../../apollo/apollo-client";
import SEARCHPRODUCT from "../../queries/searchProduct";
import ProductSlider from "../ProductSlider";
import MobileSearch from "../MobileSearch";
import ProductsList from "../ProductsList";

const Header = ({
  cartItems,
  wishlistItems,
  openCart,
  setOpenCart,
  categories,
  parentCategory,
}) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);
  const [activeSearch, setActiveSearch] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector("section");
    setHeaderTop(header.offsetTop);
    setHeaderHeight(header.offsetHeight);
    window.addEventListener("scroll", handleScroll);
    scroll > headerTop
      ? (document.body.style.paddingTop = `${headerHeight}px`)
      : (document.body.style.paddingTop = 0);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  const router = useRouter();
  const { slug, parent } = router.query;
  let findSlug = "";
  if (parent) {
    findSlug = parent;
  } else if (parentCategory) {
    findSlug = parentCategory;
  } else if (slug) {
    findSlug = slug;
  }

  let ActivCategory = false;
  categories || parentCategory
    ? (ActivCategory = categories.find((c) => c.slug === findSlug))
    : null;

  // const parentCategories = []
  // if (categories) {
  //   for (const category of categories) {
  //     parentCategories.push(
  //     <li>
  //       <Link href={`/catalog/${category.slug}`}>
  //         <a>{category.slug}</a>
  //       </Link>
  //     </li>)
  //   }
  // }
  const [activeMobileSearch, setActiveMobileSearch] = useState(false);
  const [searchActiveTab, setSearchActiveTab] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadProducts, { data, loading }] = useLazyQuery(SEARCHPRODUCT, {
    client,
  });

  useEffect(() => {
    setSearchResults([]);
    loadProducts({
      variables: {
        first: 10,
        categories: searchActiveCategory.slug,
        search: searchQuery,
      },
    });
  }, [searchActiveTab]);

  useEffect(() => {
    if (data && searchQuery.length) {
      setSearchResults(data.products.nodes);
    }
  }, [data]);

  const searchData = (e) => {
    setSearchResults([]);

    setSearchQuery(e.target.value);

    if (searchQuery.length) {
      loadProducts({
        variables: {
          first: 10,
          categories: searchActiveCategory.slug,
          search: searchQuery,
        },
      });
    }
  };

  const searchTabs = [
    {
      id: 0,
      name: "Мужчины",
      slug: "muzhskoj",
      icon: null,
      content:
        loading && !searchResults.length ? (
          <div className={s.searchLoading}>Загрузка...</div>
        ) : searchQuery.length && !searchResults.length ? (
          <div className={s.searchEmpty}>Товары не найдены</div>
        ) : searchResults.length ? (
          searchResults.length <= 3 ? (
            <ProductsList products={searchResults} catalogMod={true} />
          ) : (
            <ProductSlider products={searchResults} quantity={4} />
          )
        ) : null,
    },
    {
      id: 1,
      name: "Женщины",
      slug: "zhenskij",
      icon: null,
      content:
        loading && !searchResults.length ? (
          <div className={s.searchLoading}>Загрузка...</div>
        ) : searchQuery.length && !searchResults.length ? (
          <div className={s.searchEmpty}>Товары не найдены</div>
        ) : searchResults.length ? (
          searchResults.length <= 3 ? (
            <ProductsList products={searchResults} catalogMod={true} />
          ) : (
            <ProductSlider products={searchResults} quantity={4} />
          )
        ) : null,
    },
    {
      id: 2,
      name: "Мальчики",
      slug: "malchik",
      icon: null,
      content:
        loading && !searchResults.length ? (
          <div className={s.searchLoading}>Загрузка...</div>
        ) : searchQuery.length && !searchResults.length ? (
          <div className={s.searchEmpty}>Товары не найдены</div>
        ) : searchResults.length ? (
          searchResults.length <= 3 ? (
            <ProductsList products={searchResults} catalogMod={true} />
          ) : (
            <ProductSlider products={searchResults} quantity={4} />
          )
        ) : null,
    },
    {
      id: 3,
      name: "Девочки",
      slug: "devochka",
      icon: null,
      content:
        loading && !searchResults.length ? (
          <div className={s.searchLoading}>Загрузка...</div>
        ) : searchQuery.length && !searchResults.length ? (
          <div className={s.searchEmpty}>Товары не найдены</div>
        ) : searchResults.length ? (
          searchResults.length <= 3 ? (
            <ProductsList products={searchResults} catalogMod={true} />
          ) : (
            <ProductSlider products={searchResults} quantity={4} />
          )
        ) : null,
    },
  ];
  const searchMobileTabs = [
    {
      id: 0,
      name: "Мужчины",
      slug: "muzhskoj",
      icon: null,
      content:
        loading && !searchResults.length ? (
          <div className={s.searchLoading}>Загрузка...</div>
        ) : searchQuery.length && !searchResults.length ? (
          <div className={s.searchEmpty}>Товары не найдены</div>
        ) : searchResults.length ? (
          <ProductsList products={searchResults} catalogMod={true} />
        ) : null,
    },
    {
      id: 1,
      name: "Женщины",
      slug: "zhenskij",
      icon: null,
      content:
        loading && !searchResults.length ? (
          <div className={s.searchLoading}>Загрузка...</div>
        ) : searchQuery.length && !searchResults.length ? (
          <div className={s.searchEmpty}>Товары не найдены</div>
        ) : searchResults.length ? (
          <ProductsList products={searchResults} catalogMod={true} />
        ) : null,
    },
    {
      id: 2,
      name: "Мальчики",
      slug: "malchik",
      icon: null,
      content:
        loading && !searchResults.length ? (
          <div className={s.searchLoading}>Загрузка...</div>
        ) : searchQuery.length && !searchResults.length ? (
          <div className={s.searchEmpty}>Товары не найдены</div>
        ) : searchResults.length ? (
          <ProductsList products={searchResults} catalogMod={true} />
        ) : null,
    },
    {
      id: 3,
      name: "Девочки",
      slug: "devochka",
      icon: null,
      content:
        loading && !searchResults.length ? (
          <div className={s.searchLoading}>Загрузка...</div>
        ) : searchQuery.length && !searchResults.length ? (
          <div className={s.searchEmpty}>Товары не найдены</div>
        ) : searchResults.length ? (
          <ProductsList products={searchResults} catalogMod={true} />
        ) : null,
    },
  ];

  const searchActiveCategory = searchTabs.find(
    (category) => category.id == searchActiveTab
  );
  const searchMobileActiveCategory = searchTabs.find(
    (category) => category.id == searchActiveTab
  );

  return (
    <>
      <header>
        {scroll > headerTop ? (
          <div style={{ height: "100px", transition: "1.5s" }} />
        ) : null}

        <div className={scroll > headerTop ? s.sticky : ""}>
          <section className={s.top}>
            <div className="container">
              <div className={s.topInner}>
                <div className={s.topLeft}>
                  <div>
                    <Link href="/">
                      <a>
                        <span
                          dangerouslySetInnerHTML={{ __html: icons.phone }}
                        />
                        Заказ по телефону: (99) 066 28 50 (90) 041 28 50
                      </a>
                    </Link>
                  </div>
                  
                </div>
                <div className={s.topCenter}>
                <div>
                    <Link href="/">
                      <a>
                        <span
                          dangerouslySetInnerHTML={{ __html: icons.clock }}
                        />
                        Время работы: 8:00 - 20:00
                      </a>
                    </Link>
                  </div>
                </div> 
              </div>
            </div>
          </section>
          <section>
            {searchQuery ? (
              <SearchModal
                tabs={searchTabs}
                setSearchActiveTab={setSearchActiveTab}
                searchResults={searchResults}
                loading={loading}
                searchQuery={searchQuery}
              />
            ) : null}

            {activeMobileSearch ? (
              <MobileSearch
                searchData={searchData}
                tabs={searchMobileTabs}
                setSearchActiveTab={setSearchActiveTab}
                setActiveMobileSearch={setActiveMobileSearch}
              />
            ) : null}
            <div className="container">
              <div
                className={`${s.bot} ${activeSearch ? s.activeSearch : ""} `}
              >
                <div className={s.botLeft}>
                  <div className={s.logo}>
                    <Link href="/">
                      <a>
                        <span
                          dangerouslySetInnerHTML={{ __html: icons.logo }}
                        />
                      </a>
                    </Link>
                  </div>
                  <ul>
                    {/* {parentCategories} */}
                    <li
                      className={
                        ActivCategory
                          ? ActivCategory.slug == "muzhskoj"
                            ? s.active
                            : null
                          : null
                      }
                    >
                      <Link href="/catalog/muzhskoj">
                        <a>Мужчины</a>
                      </Link>
                    </li>
                    <li
                      className={
                        ActivCategory
                          ? ActivCategory.slug == "zhenskij"
                            ? s.active
                            : null
                          : null
                      }
                    >
                      <Link href="/catalog/zhenskij">
                        <a>Женщины</a>
                      </Link>
                    </li>
                    <li
                      className={
                        ActivCategory
                          ? ActivCategory.slug == "malchik"
                            ? s.active
                            : null
                          : null
                      }
                    >
                      <Link href="/catalog/malchik">
                        <a>Юнисекс</a>
                      </Link>
                    </li>
                    <li
                      className={
                        ActivCategory
                          ? ActivCategory.slug == "devochka"
                            ? s.active
                            : null
                          : null
                      }
                    >
                      <Link href="/catalog/devochka">
                        <a>Последняя пара</a>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className={s.botRight}>
                  <ul>
                    <li className={s.search}>
                      <form onClick={() => setActiveSearch(true)}>
                        <label
                          for="search"
                          dangerouslySetInnerHTML={{ __html: icons.search }}
                        />
                        <input
                          value={searchQuery}
                          onChange={searchData}
                          type="text"
                          id="search"
                          placeholder="Поиск"
                        />
                      </form>
                      <div
                        className={s.closeSearch}
                        onClick={() => {
                          setActiveSearch(false), setSearchQuery("");
                        }}
                      >
                        <span
                          dangerouslySetInnerHTML={{ __html: icons.times }}
                        />
                        Закрыть
                      </div>
                    </li>
                    <li className={s.mobileSearch}>
                      <button
                        dangerouslySetInnerHTML={{ __html: icons.search }}
                        onClick={() => setActiveMobileSearch(true)}
                      />
                    </li>
                    <li className={s.user}>
                    <Link href='/user'>
                      <a className={s.headerUser}>
                        <span dangerouslySetInnerHTML={{__html: icons.user }}  /> 
                        <span className={s.title}>Войти</span>
                      </a>
                    </Link>
                  </li>
                    <li className={s.wishlist}>
                      <Link href="/wishlist">
                        <a className={s.headerWishlist}>
                          <span
                            dangerouslySetInnerHTML={{ __html: icons.wishlist }}
                          />
                          {wishlistItems.length > 0 && (
                            <span className={s.wishlistQuantity}>
                              {wishlistItems.length}
                            </span>
                          )}
                          <span className={s.title}>Избранное</span>
                        </a>
                      </Link>
                    </li>
                    <li className={s.cart}>
                      <Link href="/cart">
                        <a className={s.headerCart}>
                          <span
                            dangerouslySetInnerHTML={{ __html: icons.cart }}
                          />
                          {cartItems.length > 0 && (
                            <span className={s.cartQuantity}>
                              {cartItems.length}
                            </span>
                          )}
                          <span className={s.title}>Корзина</span>
                        </a>
                      </Link>
                      <CartModal
                        activeStatus={openCart}
                        getActiveStatus={setOpenCart}
                      />
                    </li>

                    <li className={s.burger}>
                      <span
                        onClick={() => setOpen(true)}
                        dangerouslySetInnerHTML={{ __html: icons.burger }}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <HeaderMobile
            activeStatus={open}
            getActiveStatus={setOpen}
            categories={categories}
            wishlistItems={wishlistItems}
          />

          {ActivCategory ? <SubMenu categories={ActivCategory} /> : null}
        </div>
      </header>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
  };
};

export default connect(mapStateToProps)(Header);
