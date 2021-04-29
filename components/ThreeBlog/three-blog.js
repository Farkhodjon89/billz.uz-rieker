import s from "./three-blog.module.scss";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

const ThreeBlog = ({ data }) => (
  <div className={s.blogStyle}>
    {data.map((r) => (
      <div key={uuidv4()}>
        <img src={r.img} alt="" className={s.blogStyleImg} />
        <div className={s.blogStyleInner}>
          <div> {r.title} </div>
          <div> {r.text} </div>
          <Link href={r.link}>
            <a>
              {r.linkName} <img src="/home/smallArrowRight.svg" alt="" />
            </a>
          </Link>
        </div>
      </div>
    ))}
  </div>
);
export default ThreeBlog;
