import { Link } from "react-router-dom";
import { useState, memo, useRef } from "react";
import { useEffect } from "react";
import axios from "axios";

import styles from "./animeList.module.scss";
import { ReactComponent as Comment } from "../../static/icon/comment-alt-solid.svg";
import { ReactComponent as Check } from "../../static/icon/check-solid.svg";
import { ReactComponent as Play } from "../../static/icon/play-solid.svg";
import Loading from "../Loading";
import Pagination from "../Pagination";
import { LIMIT } from "../../FunctionSpJs/constant";
import { type } from "@testing-library/user-event/dist/type";

function AnimeList({ api, pagination = false, authorization = {} }) {
  const [animeList, setAnimeList] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  const [pageNumb, setPageNumb] = useState();
  const [isEmpty, setIsEmpty] = useState(false);
  const currentPageFlag = useRef(true);

  function handleApiWithPagination(page) {
    if (pagination) {
      if (!api) return;
      axios
        .get(api, {
          params: {
            limit: LIMIT,
            page: page || currentPage,
            ...authorization,
          },
        })
        .then((res) => {
          if (!res.data.data.length) {
            setIsEmpty(true);
          } else {
            setIsEmpty(false);
          }
          setAnimeList(res.data.data);
          if (pageNumb !== res.data.pageNumb) {
            setPageNumb(res.data.pageNumb);
          }
        });
    }
  }

  //reset CURRENT PAGE and prevent useEffect currentPage running
  useEffect(() => {
    currentPageFlag.current = false;
    setCurrentPage(1);
    handleApiWithPagination(1);
  }, [authorization?.type, api]);

  useEffect(() => {
    // check is need to running? when type and api change, it's no need to call api again
    if (currentPageFlag.current) {
      handleApiWithPagination();
    } else {
      currentPageFlag.current = true;
    }
  }, [currentPage]);
  useEffect(() => {
    if (!pagination) {
      axios.get(api).then((res) => {
        setAnimeList(res.data);
      });
    }
  }, []);
  return (
    <>
      {animeList.map((anime) => {
        return (
          <div title={anime.name} key={anime.name} className="col l-3 m-4 c-6">
            <div className={styles.animeItem}>
              <span className={styles.brand}>{`${anime.currentEp}/${
                anime.endEp || "??"
              }`}</span>
              <Link to={`/detail/${anime.id}`}>
                <span className={styles.play}>
                  <Play />
                </span>
                <div className={styles.thumbnailWrap}>
                  <div
                    style={{ backgroundImage: `url(${anime.thumbnail})` }}
                    className={styles.thumbnail}
                  ></div>
                </div>
                <div className={styles.animeInfo}>
                  <div className={styles.name}>
                    {anime.displayName
                      ? anime.displayName.toUpperCase()
                      : anime.name.replaceAll("-", " ").toUpperCase()}
                  </div>
                  <div className={styles.numberGroup}>
                    <div>
                      <Comment />
                      <div className={styles.comments}>{anime.comments}</div>
                    </div>
                    <div>
                      <Check />
                      <div className={styles.views}>{anime.views}</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
      {!!animeList.length || isEmpty || <Loading />}
      {isEmpty && <h2 className={styles.notFound}>Không tìm thấy kết quả!</h2>}
      {pagination && !!animeList.length && (
        <Pagination
          pageNumb={pageNumb}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
}

export default memo(AnimeList);
