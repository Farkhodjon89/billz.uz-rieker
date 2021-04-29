import s from "./brand-slider.module.scss";
import Link from "next/link";
import Slider from "react-slick";

import icons from "../../public/fixture";

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
  rows: 2,
  dots: true,
  arrows: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  prevArrow: <SliderPrevArrow />,
  nextArrow: <SliderNextArrow />,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        centerMode: false,
        slidesToScroll: 2,
      },
    },
  ],
};

const BrandSlider = ({ brands }) => (
  <section className="brands">
    <div className={s.brands}>
      <Slider {...settings}>
        {brands.map((brand) =>
          brand.brands_settings.image ? (
            <div className={`${s.brand} brand`}>
              <Link href={`/catalog?filter_brands=${brand.name}`}>
                <a>
                  <img
                    src={brand.brands_settings.image.sourceUrl}
                    alt=""
                    className={s.brandImage}
                  />
                </a>
              </Link>
            </div>
          ) : null
        )}
      </Slider>
    </div>
  </section>
);
export default BrandSlider;
