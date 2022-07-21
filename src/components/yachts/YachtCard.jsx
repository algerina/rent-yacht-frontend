import React from 'react';
import PropTypes from 'prop-types';
import { SwiperSlide } from 'swiper/react';
import { AiFillTwitterCircle, AiOutlineInstagram } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import style from './Yacht.module.css';
import './swiper.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function YachtCard({ yacht, imageUrl }) {
  const { id, description, name } = yacht;

  return (
    <SwiperSlide>
      <a href={`/yacht/${id}`} className={style.linkImg}>
        <img src={imageUrl} alt="Yacht" className={style.cardImage} />
      </a>
      <div className={style.cardInfo}>
        <h2>{name}</h2>
        <hr />
        <p>{description}</p>
        <div className={style.cardInfo__icons}>
          <BsFacebook />
          <AiFillTwitterCircle />
          <AiOutlineInstagram />
        </div>
      </div>
    </SwiperSlide>
  );
}

export default YachtCard;

YachtCard.defaultProps = {
  yacht: {
    id: '',
    name: '',
    description: '',
    price: '',
    image_url: '',
  },
  imageUrl: '',
};

YachtCard.propTypes = {
  yacht: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
    image_url: PropTypes.string,
  }),
  imageUrl: PropTypes.string,
};
