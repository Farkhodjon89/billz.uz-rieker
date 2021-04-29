import React from "react";
import s from "./size-filter.module.scss";

const SizeFilter = ({ sizes, active, setFilterValues }) => {
  return (
    <div className={s.size}>
      {sizes.map((r, i) => (
        <div key={i} className={s.sizeInner}>
          <div
            className={(active || []).includes(r.name) ? s.active : ""}
            onClick={() => setFilterValues("sizes", r.name)}
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
export default SizeFilter;
