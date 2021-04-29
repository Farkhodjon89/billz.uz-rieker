import Product from "../Product";
import Slider from "react-slick";
import icons from "../../public/fixture"; 

const SliderPrevArrow = (props) => (
  <div
    className="sliderPrevArrow"
    onClick={props.onClick}
    dangerouslySetInnerHTML={{ __html: icons.arrowLeft }}
  />
);

const SliderNextArrow = (props) => (
  <div
    className="sliderNextArrow"
    onClick={props.onClick}
    dangerouslySetInnerHTML={{ __html: icons.arrowRight }}
  />
);



const ProductSlider = ({ products, quantity }) => {
  const settings = {
    infinite: true,
    dots: true,
    rows: 1,
    slidesToShow: quantity ? quantity : 3,
    slidesToScroll: quantity ? quantity : 3,
    dots: true,
    prevArrow: <SliderPrevArrow />,
    nextArrow: <SliderNextArrow />,
    responsive: [
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  return (
    <section className="product-slider">
      <Slider {...settings}>
        {products.map((product) => (
          <Product product={product} />
        ))}
      </Slider>
    </section>
  );
};

export default ProductSlider;
