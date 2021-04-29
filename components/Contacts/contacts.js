import s from "./contacts.module.scss";
import { useEffect, useState } from "react";
import icons from "../../public/fixture";
import Link from "next/link";
import Slider from "react-slick";

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

const Contacts = ({ contacts }) => {
  const [activeTap, setActiveTab] = useState(contacts[0].name);

  console.log(contacts);
  const tabs = [];
  const map = [];

  for (const contact of contacts) {
    if (contact.brands_settings.address) {
      console.log(contact.brands_settings.mapLink);
      if (activeTap == contact.name) {
        map.push(
          <iframe
            src={contact.brands_settings.mapLink}
            allowfullscreen=""
            loading="lazy"
          />
        );
      }

      const phones = [];

      if (contact.brands_settings.phones) {
        for (const phone of contact.brands_settings.phones) {
          phones.push(
            <>
              <Link href={`tel:${phone.phone}`}>
                <a>
                  <span dangerouslySetInnerHTML={{ __html: icons.phone }} />
                  {phone.phone}
                </a>
              </Link>
            </>
          );
        }
      }

      const social = [];

      if (contact.brands_settings.telegram) {
        social.push(
          <li className={s.item}>
            <Link href={contact.brands_settings.telegram}>
              <a>
                <span dangerouslySetInnerHTML={{ __html: icons.telegram }} />
              </a>
            </Link>
          </li>
        );
      }
      if (contact.brands_settings.facebook) {
        social.push(
          <li className={s.item}>
            <Link href={contact.brands_settings.facebook}>
              <a>
                <span dangerouslySetInnerHTML={{ __html: icons.facebook }} />
              </a>
            </Link>
          </li>
        );
      }
      if (contact.brands_settings.instagram) {
        social.push(
          <li className={s.item}>
            <Link href={contact.brands_settings.instagram}>
              <a>
                <span dangerouslySetInnerHTML={{ __html: icons.instagram }} />
              </a>
            </Link>
          </li>
        );
      }

      tabs.push(
        <li
          className={`${s.item} ${activeTap == contact.name ? s.active : ""}`}
          onClick={() => setActiveTab(contact.name)}
        >
          <div className={s.title}>
            <div className={s.name}>{contact.name}</div>
            {contact.brands_settings.image ? (
              <img src={contact.brands_settings.image.sourceUrl} />
            ) : null}
          </div>
          <div className={s.phone}>{phones}</div>
          <div className={s.address}>
            <span dangerouslySetInnerHTML={{ __html: icons.address }} />
            {contact.brands_settings.address}
          </div>
          <div className={s.social}>
            <ul className={s.list}>{social}</ul>
          </div>
        </li>
      );
    }
  }

  return (
    <>
      <div className={s.contacts}>
        <div className="row">
          <div className="col-lg-5 col-md-5">
            <div className={s.left}>
              <ul className={s.list}>{tabs}</ul>
            </div>
          </div>
          <div className="col-lg-7 col-md-7">
            <div className={s.right}>{map}</div>
          </div>
        </div>
      </div>
      <div className={s.mobileContacts}>
        <div className={s.left}>
          <ul className={s.list}>
            <Slider {...settings}>{tabs}</Slider>
          </ul>
        </div>
        <div className={s.right}>{map}</div>
      </div>
    </>
  );
};
export default Contacts;
