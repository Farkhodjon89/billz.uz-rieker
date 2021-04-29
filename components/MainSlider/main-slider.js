import s from "./main-slider.module.scss";
import Slider from "react-slick";
import { v4 as uuidv4 } from "uuid";
import icons from "../../public/fixture";
import Link from "next/link";

const SliderPrevArrow = (props) => (
  <div
    className={s.sliderPrevArrow}
    onClick={props.onClick}
    dangerouslySetInnerHTML={{ __html: icons.arrowLeft }}
  />
);

const SliderNextArrow = (props) => (
  <div
    className={s.sliderNextArrow}
    onClick={props.onClick}
    dangerouslySetInnerHTML={{ __html: icons.arrowRight }}
  />
);

const settings = {
  dots: true,
  arrows: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <SliderPrevArrow />,
  nextArrow: <SliderNextArrow />,
};

const MainSlider = ({ SliderData, productMod }) => (
  <section className={!productMod ? `topSlider` : `productSlider`}>
    {console.log(SliderData)}
    <Slider {...settings}>
      {SliderData.map((v) => (
        <div key={uuidv4()} className={`${s.slider} slider`}>
          <div
            style={{
              backgroundImage: `url(${
                v.original ? v.original : v.image ? v.image.sourceUrl : null
              })`,
            }}
            className={`${s.sliderImg}`}
          ></div>
        </div>
      ))}
    </Slider>
  </section>
);
export default MainSlider;
