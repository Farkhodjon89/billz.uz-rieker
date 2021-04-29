import React, { useState } from "react";
import s from "./color-filter.module.scss";

const ColorFilter = ({ colors, active, setFilterValues }) => {
  const [allColor, setAllColor] = useState(false);
  const AllColor = () => {
    setAllColor(!allColor);
  };

  return (
    <div className={allColor ? `${s.active} ${s.wrapper}` : s.wrapper}>
      <div className={s.colors}>
        {colors.map((r, i) => (
          <div
            key={i}
            className={s.inner}
            onClick={() => setFilterValues("colors", r.name)}
          >
            {(active || []).includes(r.name) ? (
              <div key={i} className={s.colorBlockActive}>
                <div
                  className={s.colorActive}
                  style={{
                    backgroundColor: r.color,
                  }}
                ></div>
                <div className={s.colorNameActive}>{r.name}</div>
              </div>
            ) : (
              <div key={i} className={s.colorBlock}>
                <div
                  className={s.color}
                  style={{
                    backgroundColor: r.color,
                  }}
                ></div>
                <div className={s.colorName}>{r.name}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      {colors.length > 6 ? (
        <button onClick={AllColor}>
          {allColor ? "Скрыть" : "Больше цветов"}
        </button>
      ) : null}
    </div>
  );
};
export default ColorFilter;
