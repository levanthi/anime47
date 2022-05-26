import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AnimeList from "../../Components/AnimeList";
import { userContext } from "../../App";
import styles from "./favorite.module.scss";
import { domain } from "../../FunctionSpJs/constant";

function Favorite() {
  const usercontext = useContext(userContext);
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState("anime");
  function handleActive(e) {
    document
      .querySelector(`.${styles.selectWrap} button.active`)
      .classList.remove("active");
    e.target.classList.add("active");
    setActiveType(e.target.name);
  }
  useEffect(() => {
    let timerId;
    if (!usercontext.user) {
      timerId = setTimeout(() => {
        navigate("/");
      }, 200);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [usercontext.user]);
  return (
    <div className={styles.favorite}>
      <h2>Tủ Phim</h2>
      <div className={styles.selectWrap}>
        <button
          name="anime"
          className="filter-btn active"
          onClick={handleActive}
        >
          Anime
        </button>
        <button name="china" className="filter-btn" onClick={handleActive}>
          Hoạt Hình Trung Quốc
        </button>
        <button
          name="live-action"
          className="filter-btn"
          onClick={handleActive}
        >
          Live Action
        </button>
      </div>
      <div className="row">
        {usercontext.user && (
          <AnimeList
            api={`${domain}/favorite`}
            pagination={true}
            authorization={{
              accessToken: usercontext.user.accessToken,
              type: activeType,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Favorite;
