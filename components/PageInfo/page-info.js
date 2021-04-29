import React, { useEffect, useState } from "react";
import PageNavigation from "../../components/PageNavigation/page-navigation";
import SectionTitle from "../../components/SectionTitle";
import PageContent from "../../components/PageContent";

const PageInfo = ({ pageNavigation, pageContent, activePage }) => {
  const [openNavigation, setOpenNavigation] = useState(false);
  console.log("pageContent: ", pageContent);
  useEffect(() => {
    setOpenNavigation(false);
  }, [activePage]);

  return (
    <div className="row">
      <div className="col-lg-3 col-12 col-md-3 col-sm-12">
        <PageNavigation
          navigation={pageNavigation}
          activePage={activePage}
          openNavigation={openNavigation}
        />
      </div>
      <div className="col-lg-9 col-md-9 col-sm-12">
        <PageContent
          slug={pageContent.slug}
          title={pageContent.title}
          content={pageContent.content}
          activePage={activePage}
          openNavigation={openNavigation}
          setOpenNavigation={setOpenNavigation}
        />
      </div>
    </div>
  );
};

export default PageInfo;
