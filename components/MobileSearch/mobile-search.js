import s from "./mobile-search.module.scss";
import { chunk } from "../../utils";
import Link from "next/link";
import Tabs from "../Tabs";
import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import client from "../../apollo/apollo-client";
import PRODUCTS from "../../queries/products";
import icons from "../../public/fixture";

const MobileSearch = ({
  searchData,
  tabs,
  setSearchActiveTab,
  setActiveMobileSearch,
}) => {
  return (
    <div className={s.mobileSearch}>
      <div className={s.title}>Поиск</div>
      <div
        className={s.close}
        dangerouslySetInnerHTML={{ __html: icons.times }}
        onClick={() => setActiveMobileSearch(false)}
      />
      <div className={s.search}>
        <form>
          <label
            for="search"
            dangerouslySetInnerHTML={{ __html: icons.search }}
          />
          <input type="text" id="search" onChange={searchData} />
        </form>
      </div>
      <div className={s.searchResults}>
        <Tabs
          data={tabs}
          mobileCategory={true}
          setSearchActiveTab={setSearchActiveTab}
        />
      </div>
    </div>
  );
};

export default MobileSearch;
