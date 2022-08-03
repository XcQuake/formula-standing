/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';

import './Standing.scss';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import DriversList from '../DriversList/DriversList';
import Preloader from '../Preloader/Preloader';
import ConstructorsList from '../ConstructorsList/ConstructorsList';
import DriverInfo from '../DriverInfo/DriverInfo';

const Standing: React.FC = () => {
  const { fetchStanding } = useActions();
  const { standingList, loading } = useTypedSelector(
    (state) => state.standing,
  );
  const [championship, setChampionship] = useState('driver');
  const drivers = standingList?.DriverStandings;
  const constructors = standingList?.ConstructorStandings;
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    fetchStanding('current', championship);
  }, [championship]);

  const handleChangeChampionship = (): void => {
    if (championship === 'constructor') {
      setChampionship('driver');
    }
    if (championship === 'driver') {
      setChampionship('constructor');
    }
  };

  return (
    <section className="standing">
      <div className="standing__wrapper">
        <div className="standing__navigation">
          <button
            className="standing__button standing__button_prev"
            ref={(node) => setPrevEl(node)}
            type="button"
          >
            Drivers
          </button>
          <button
            className="standing__button standing__button_next"
            ref={(node) => setNextEl(node)}
            type="button"
          >
            Constructors
          </button>
        </div>
        <div className="standing__container">
          <Swiper
            className="standing__swiper"
            onSlideChange={() => { handleChangeChampionship(); }}
            navigation={{ prevEl, nextEl }}
            modules={[Navigation]}
            dir="ltr"
          >
            {loading && <Preloader />}
            <SwiperSlide>
              {
                !loading
                && drivers
                && <DriversList drivers={drivers} />
              }
            </SwiperSlide>
            <SwiperSlide>
              {
                !loading
                && constructors
                && <ConstructorsList constructors={constructors} />
              }
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <DriverInfo />
    </section>
  );
};

export default Standing;
