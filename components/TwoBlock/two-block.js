import s from "./two-block.module.scss";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

const TwoBlock = ({ data }) => (
  <div className={s.blockStyle}>
    {data.map((r) => (
      <div key={uuidv4()} style={{ backgroundImage: `url(${r.img})` }}>
        <Link href={r.slug}>
          <a> {r.title} </a>
        </Link>
      </div>
    ))}
  </div>
);
export default TwoBlock;
