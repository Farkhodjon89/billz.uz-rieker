import icons from "../../public/fixture";
import SectionTitle from "../SectionTitle";
import s from "./page-content.module.scss";

const PageContent = ({
  slug,
  title,
  content,
  activePage,
  openNavigation,
  setOpenNavigation,
}) => {
  return (
    <div
      className={`${s.pageContent} ${!openNavigation ? s.activeMobile : ""}`}
    >
      <button
        className={s.activeMenu}
        dangerouslySetInnerHTML={{ __html: icons.fullArrowLeft }}
        onClick={() => setOpenNavigation(!openNavigation)}
      />
      <SectionTitle title="О нас" />
      <div className={`${s.content} ${activePage == slug ? s.active : ""}`}>
        <h2 className={s.title} dangerouslySetInnerHTML={{ __html: title }} />
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default PageContent;
