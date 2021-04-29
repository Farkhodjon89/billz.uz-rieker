import s from "./search-modal.module.scss";
import { chunk } from "../../utils";
import Link from "next/link";
import Tabs from "../Tabs";
import React, { useState, useEffect } from "react";
import { useLazyQuery } from '@apollo/react-hooks'
import client from '../../apollo/apollo-client'
import PRODUCTS from '../../queries/products'
import ProductSlider from "../ProductSlider";



const SearchModal = ({setSearchActiveTab, tabs}) => {

 


  return (
    <div className={`${s.searchResults} subCategoryMenu`}>
      <div className="container">
        <Tabs data={tabs} mobileCategory={true} setSearchActiveTab={setSearchActiveTab}/>
      </div>
    </div>
  );
};

export default SearchModal;
