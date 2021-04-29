import s from "./catalog-top-bar.module.scss";
import icons from "../../public/fixture";
import Link from "next/link";

const CatalogTopBar = ({ state, setFilterValues, dispatch }) => {
  let activeButton = false;
  if (state.filters.sizes ? state.filters.sizes.length != 0 : null) {
    activeButton = true;
  } else if (state.filters.brands ? state.filters.brands.length != 0 : null) {
    activeButton = true;
  } else if (state.filters.colors ? state.filters.colors.length != 0 : null) {
    activeButton = true;
  }
  return (
    <div className={s.top}>
      <div className={s.activFilter}>
        <ul>
          {state.filters.brands
            ? state.filters.brands.map((v) => (
                <li>
                  <button onClick={() => setFilterValues("brands", v)}>
                    {v}
                    <span
                      dangerouslySetInnerHTML={{ __html: icons.miniTimes }}
                    />
                  </button>
                </li>
              ))
            : null}
          {state.filters.colors
            ? state.filters.colors.map((v) => (
                <li>
                  <button onClick={() => setFilterValues("colors", v)}>
                    {v}
                    <span
                      dangerouslySetInnerHTML={{ __html: icons.miniTimes }}
                    />
                  </button>
                </li>
              ))
            : null}
          {state.filters.sizes
            ? state.filters.sizes.map((v) => (
                <li>
                  <button onClick={() => setFilterValues("sizes", v)}>
                    {v}
                    <span
                      dangerouslySetInnerHTML={{ __html: icons.miniTimes }}
                    />
                  </button>
                </li>
              ))
            : null}
        </ul>
        {activeButton ? (
          <button
            className={s.resetFilter}
            onClick={() => dispatch({ type: "RESET_FILTERS" })}
          >
            Сбросить фильтр
          </button>
        ) : null}
      </div>
      {/* <div className={s.sort}>
            <button >Сортировка</button>
        </div> */}
    </div>
  );
};

export default CatalogTopBar;
