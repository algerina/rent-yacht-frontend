import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import YachtCard from './YachtCard';
import './swiper.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import { AiFillTwitterCircle, AiOutlineInstagram } from 'react-icons/ai';
// import { BsFacebook } from 'react-icons/bs';

import style from './Yacht.module.css';
import fetchYachts from '../../redux/actions/yachtActions';

const Yacht = () => {
  const { yachts } = useSelector((state) => state.yacht);
  const dispatch = useDispatch();

  const [widthScreen, setWidthScreen] = useState(window.innerWidth);

  useEffect(() => {
    dispatch(fetchYachts());
  }, []);

  window.addEventListener('resize', () => {
    setWidthScreen(window.innerWidth);
  });

  return (
    <main className={style.main}>
      <div className={style.main__header}>
        <h1>Your wish yachts</h1>
        <p>Please select a yacht</p>
        <hr />
      </div>
      <Swiper
        slidesPerView={widthScreen > 799 ? 3 : 1}
        spaceBetween={30}
        slidesPerGroup={widthScreen > 799 ? 3 : 1}
        loop
        loopFillGroupWithBlank
        pagination={{
          clickable: true,
        }}
        navigation
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        { yachts.map((yacht) => (
          <SwiperSlide key={yacht.id}>
            <YachtCard yacht={yacht} imageUrl={yacht.image_url} />
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
};

export default Yacht;
