import s from "./breadcrumbs.module.scss";
import Link from "next/link";

const Breadcrumbs = ({ path }) => (
  <div className={s.links}>
    {console.log(path)}
    {path.map((v) => (
      <Link href={v.link}>
        <a>{v.name}</a>
      </Link>
    ))}
  </div>
);
export default Breadcrumbs;
