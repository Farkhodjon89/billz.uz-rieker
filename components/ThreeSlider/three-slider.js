import s from "./three-slider.module.scss";
import Link from "next/link";
import Slider from "react-slick";
import { v4 as uuidv4 } from "uuid";

const SliderPrevArrow = (props) => (
  <img
    src="/home/arrowRight.svg"
    alt=""
    onClick={props.onClick}
    className="sliderPrevArrow"
  />
);

const SliderNextArrow = (props) => (
  <img
    src="/home/arrowRight.svg"
    alt=""
    onClick={props.onClick}
    className="sliderNextArrow"
  />
);

const settings = {
  slidesToShow: 3,
  slidesToScroll: 3,
  prevArrow: <SliderPrevArrow />,
  nextArrow: <SliderNextArrow />,
};

const ThreeSlider = ({ data }) => (
  <Slider {...settings}>
    {data.map((r) => (
      <div key={uuidv4()}>
        <Link href="/">
          <a>
            <img src={r.img} alt="" className={s.sliderImg} />
          </a>
        </Link>
        <div className={s.sliderInfo}>
          <div>{r.title}</div>
          <div>{r.text}</div>
        </div>
      </div>
    ))}
  </Slider>
);
export default ThreeSlider;
