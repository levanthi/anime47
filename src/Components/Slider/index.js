import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

import "swiper/css";
import { ReactComponent as Pre } from "../../static/icon/chevron-left-solid.svg";
import { ReactComponent as Next } from "../../static/icon/chevron-right-solid.svg";
import { ReactComponent as Play } from "../../static/icon/play-solid.svg";
import styles from "./slider.module.scss";
import Loading from "../Loading";
import { domain } from "../../FunctionSpJs/constant";

SwiperCore.use([Navigation]);

function Slider() {
  const [slider, setSlider] = useState([]);
  const [numberOfSlides, setNumberOfSlides] = useState(0);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1000) {
        setNumberOfSlides(5);
      } else if (width > 800) {
        setNumberOfSlides(4);
      } else if (width > 600) {
        setNumberOfSlides(3);
      } else {
        setNumberOfSlides(2);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    axios
      .get(`${domain}/slider`)
      .then((res) => res.data)
      .then((data) => {
          setSlider(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="slideShowWrap">
      <Swiper
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        className={styles.slideShow}
        direction="horizontal"
        slidesPerView={numberOfSlides}
        loop={true}
        slidesPerGroup={numberOfSlides - 1}
        speed={(numberOfSlides - 1) * 200}
      >
        <>
          {slider.map((slide) => {
            return (
              <SwiperSlide key={slide.id}>
                <div 
                  title={slide.name} 
                  className={styles.slide}
                >
                  <Link to={`detail/${slide.id}`}>
                    <span className={styles.play}>
                      <Play />
                    </span>
                    <div
                      className={styles.thumbnail}
                      style={{ backgroundImage: `url(${slide.thumbnail})` }}
                    ></div>
                    <span className={styles.brand}>
                      {`${slide.currentEp}/${slide.endEp}`}
                    </span>
                    <span className={styles.nameWrap}>
                      <span>{slide.name}</span>
                    </span>
                  </Link>
                </div>
              </SwiperSlide>
            );
          })}
          
          {!!slider.length || <Loading/>}
        </>
        <button ref={navigationPrevRef} className={styles.pre}>
          <Pre />
        </button>
        <button ref={navigationNextRef} className={styles.next}>
          <Next />
        </button>
      </Swiper>
    </div>
  );
}

export default Slider;
