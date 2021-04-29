import s from "./marquee.module.scss";
import Slider from "react-slick";

import Ticker, { FinancialTicker, NewsTicker } from 'nice-react-ticker';
const Marquee = () => {
  

  return (
    <div className="ticker">
      <Ticker isNewsTicker={true}> 
        <NewsTicker id="1" title="Купи две по цене одной"  />
        <NewsTicker id="2" title="Купи две по цене одной"  />
        <NewsTicker id="3" title="Купи две по цене одной"  />
        <NewsTicker id="4" title="Купи две по цене одной"  />
        <NewsTicker id="5" title="Купи две по цене одной"  />
        <NewsTicker id="6" title="Купи две по цене одной"  />
      </Ticker>
    </div>
  );
};

export default Marquee;
