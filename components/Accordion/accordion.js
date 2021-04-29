import s from "./accordion.module.scss";
import { useState } from "react";
import icons from "../../public/fixture";

const Accordion = ({ title, icon, children, noMargin, active }) => {
  const [expand, setExpand] = useState(active);
  return (
    <div className={(s.accordion, noMargin ? s.noMargin : null)}>
      <div
        className={`${s.title} ${expand ? s.active : ""} `}
        onClick={() => setExpand((expand) => !expand)}
      >
        <div>
          {icon ? (
            <div
              dangerouslySetInnerHTML={{ __html: icon }}
              className={s.icon}
            />
          ) : null}{" "}
          {title}
        </div>
        {expand ? (
          <span dangerouslySetInnerHTML={{ __html: icons.minus }} />
        ) : (
          <span dangerouslySetInnerHTML={{ __html: icons.plus }} />
        )}
      </div>
      {expand && <div className={s.content}>{children}</div>}
    </div>
  );
};
export default Accordion;
