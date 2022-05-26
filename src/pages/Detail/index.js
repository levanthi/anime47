import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import { userContext } from "../../App";
import styles from "./detail.module.scss";
import twoNumber from "../../FunctionSpJs/twoNumber";
import Loading from "../../Components/Loading";
import { domain } from "../../FunctionSpJs/constant";
import removeAccents from "../../FunctionSpJs/removeAccents";

function Detail() {
  const usercontext = useContext(userContext);
  const location = useLocation();
  const [anime, setAnime] = useState();
  useEffect(() => {
    axios.get(`${domain}${location.pathname}`).then((res) => {
      setAnime(res.data);
    });
  }, [location.pathname]);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  });
  function handleSave() {
    if (usercontext.user) {
      const animeId = location.pathname.split("/").pop();
      axios
        .post(`${domain}/favorite`, {
          animeId,
          accessToken: usercontext.user.accessToken,
        })
        .then((res) => {
          alert(res.data.message);
        });
    } else {
      alert("Bạn phải đăng nhập để sử dụng chức năng này!");
    }
  }
  return (
    <div className={styles.detailWrap}>
      {anime ? (
        <div className={styles.detail}>
          <div className="row">
            <div className="col l-12">
              {anime ? (
                <div className={styles.animeItem}>
                  <div className={styles.thumbnailGroup}>
                    <div
                      className={styles.thumbnail}
                      style={{ backgroundImage: `url(${anime.thumbnail})` }}
                    >
                      <div className={styles.buttonGroup}>
                        <button onClick={handleSave}>Lưu Lại</button>
                        <Link to={`/watch/${anime.id}`}>
                          <button>Xem Anime</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className={styles.animeInfo}>
                    <h2 className={styles.animeName}>{anime.name}</h2>
                    <div className={styles.infoGroup}>
                      <span>
                        Trạng thái:
                        <span className={styles.status}>
                          {`${twoNumber(anime.currentEp)}/${twoNumber(
                            anime.endEp
                          )}`}
                        </span>
                      </span>
                      <span>
                        Lượt Xem:
                        <span className={styles.views}>
                          {anime.views} Lượt xem
                        </span>
                      </span>
                      <span>
                        Thể loại:
                        <span className={styles.genres}>
                          {anime.genres.map((genre, index, arr) => {
                            return (
                              <Link
                                key={index}
                                to={`/filter/genres/${removeAccents(
                                  genre.name
                                ).replaceAll(" ", "-").toLowerCase()}`}
                                onClick={() => {
                                  window.scroll({ top: 0 });
                                }}
                              >
                                {genre.name}
                                {index === arr.length - 1 ? "" : ","}
                              </Link>
                            );
                          })}
                        </span>
                      </span>
                      <span>
                        Bình luận:
                        <span className={styles.comments}>
                          {anime.comments} Bình luận
                        </span>
                      </span>
                      <div>
                        Nội dung:
                        <span className={styles.desctiption}>
                          {anime.description === "undefined"
                            ? ""
                            : anime.description}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Detail;
