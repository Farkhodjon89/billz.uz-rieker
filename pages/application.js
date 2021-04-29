import React from "react";
import LayoutTwo from "../components/LayoutTwo";
import ApplicationMain from "../components/ApplicationMain";
import SectionTitle from "../components/SectionTitle";
import { HeadData } from "../components/Head";

const Application = () => {
  return (
    <>
      <HeadData title={"Оформление заказа"} pageUrl="/application" />
      <LayoutTwo>
        <SectionTitle title="Оформление заказа" />
        <ApplicationMain />
      </LayoutTwo>
    </>
  );
};

export default Application;
