import React from "react";
import s from "./brand-filter.module.scss";

const BrandFilter = ({ brands, active, setFilterValues }) => {
  return (
    <div className={s.brand}>
      {brands.map((r, i) => (
        <div key={i} className={s.brandInner}>
          <div
            className={(active || []).includes(r.name) ? s.active : ""}
            onClick={() => setFilterValues("brands", r.name)}
          >
            {(active || []).includes(r.name) ? (
              <img src="/check-square.svg" alt="" />
            ) : (
              <img src="/checkbox.svg" alt="" />
            )}
            <span>{r.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default BrandFilter;
