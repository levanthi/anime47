import { Link } from "react-router-dom";
import { useRef, useState, useContext } from "react";
import clsx from "clsx";

import { userContext } from "../../App";
import { ReactComponent as ArrowDown } from "../../static/icon/caret-down-solid.svg";
import removeAccents from "../../FunctionSpJs/removeAccents";
import genresToPath from "../../FunctionSpJs/genresToPath";
import { ReactComponent as Search } from "../../static/icon/search-solid.svg";
import styles from "./navbar.module.scss";
import SearchWindow from "../SearchWindow";

function Navbar() {
  const searchWindownRef = useRef();
  const user = useContext(userContext).user;
  const setUser = useContext(userContext).setUser;
  const [searchInput, setSearchInput] = useState("");
  const filterRef = useRef({
    genres: [
      "Đời Thường",
      "Harem",
      "Shounen",
      "Học Đường",
      "Thể Thao",
      "Drama",
      "Trinh Thám",
      "Kinh Dị",
      "Mecha",
      "Phép Thuật",
      "Phiêu Lưu",
      "Ecchi",
      "Hài Hước",
      "Hành Động",
      "Romance",
      "Lịch Sử",
      "Âm Nhạc",
      "Tokusatsu",
      "Viễn Tưởng",
      "Fantasy",
      "Blu-ray",
      "Game",
      "Shoujo",
      "Seinen",
      "Super Power",
      "Space",
      "Martial Art",
      "Siêu Nhiên",
      "Vampire",
      "Mystery",
      "Psychological",
      "Yuri",
      "Shounen Ai",
      "Shoujo Ai",
      "Josei",
      "Parody",
      "Coming Of Age",
      "Tragedy",
      "Demon",
      "Car",
      "Dementia",
      "Hentai",
      "Kid",
      "Military",
      "Police",
      "Samurai",
      "Thriller",
      "Yaoi",
      "Hoạt Hình Trung Quốc",
      "Live Action",
    ],
    status: ["Hoàn Thành", "Đang Tiến Hành"],
    topViews: [
      "Ngày",
      "Tuần",
      "Tháng",
      "Mùa Này",
      "Năm Này",
      "Mùa Trước",
      "Năm Trước",
      "Tất Cả",
    ],
    topComments: ["Mùa Này", "Mùa Trước", "Năm Này", "Năm Trước", "Tất Cả"],
    duo: [
      "Hành động + Hài Hước",
      "Lãng Mạn + Hành Động",
      "Harem + Hài Hước",
      "Ecchi + Harem",
      "Đời Thường + Học Đường",
      "Học Đường + Ecchi",
      "Romance + Tragedy",
    ],
    year: [
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
    ],
    TVMovie: [
      "TV Series",
      "Movie",
      "Drama-Live action",
      "OVA",
      "SP",
      "Cartoon",
    ],
  });
  function getFilterElement(genres, path) {
    return genres.map((genre, index) => {
      return (
        <Link
          key={index}
          to={`/filter${path}/${removeAccents(
            genresToPath(genre).replaceAll(" ", "-").toLowerCase()
          )}`}
        >
          {genre}
        </Link>
      );
    });
  }

  return (
    <div className={styles.navbar}>
      <nav>
        <Link to={"/"}>
          <div className={styles.logo}></div>
        </Link>
        <div className={styles.search}>
          <div className={styles.inputWrap}>
            <label htmlFor="search">
              <Search />
            </label>
            <input
              autoComplete="off"
              id="search"
              placeholder="Tìm: tên anime..."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              onFocus={() => {
                searchWindownRef.current.style.display = "flex";
                searchWindownRef.current.style.opacity = 1;

              }}
              onBlur={() => {
                searchWindownRef.current.style.opacity = 0;
                setTimeout(() => {
                    searchWindownRef.current.style.display = "none";
                }, 200);
              }}
            />
            <div ref={searchWindownRef} className={styles.searchWindow}>
              <SearchWindow searchInput={searchInput} />
            </div>
          </div>
        </div>
        {user ? (
          <div className={styles.userGroup}>
            <button
              className={styles.userOption}
              onClick={function (e) {
                const root = document.querySelector("#root");

                function handleClick(e) {
                  if (
                    !e.target.closest(`.${styles.option}`) ||
                    e.target.closest(`.${styles.option} ul li`)
                  ) {
                    root.removeEventListener("click", handleClick, true);
                    setTimeout(() => {
                      optionElement.style.display = "none";
                    }, 20);
                  }
                }
                const optionElement = document.querySelector(
                  `.${styles.option}`
                );
                if (optionElement.style.display === "block") {
                  // optionElement.style.display='none'
                } else {
                  optionElement.style.display = "block";
                  setTimeout(() => {
                    root.addEventListener("click", handleClick, true);
                  }, 10);
                }
              }}
            >
              <span>{`Xin chào, ${user.name || 'user'}`}</span>
              <span className={styles.arrowDow}>
                <ArrowDown />
              </span>
              <div className={styles.option}>
                <ul>
                  <li
                    onClick={() => {
                      setUser(null);
                      localStorage.removeItem("anime47");
                    }}
                  >
                    Thoát
                  </li>
                </ul>
              </div>
            </button>
            <Link to={`/favorite`}>
              <button className={styles.userCollection}>Tủ phim</button>
            </Link>
          </div>
        ) : (
          <div className={styles.login}>
            <Link to={`/login/sign-up`}>
              <button>Đăng Ký</button>
            </Link>
            <Link to={`/login/sign-in`}>
              <button>Đăng Nhập</button>
            </Link>
          </div>
        )}
      </nav>
      <div className={styles.filter}>
        <ul className={styles.filterList}>
          <li className={styles.filterItem}>
            <span style={{ color: "white" }}> TRANG CHỦ</span>
            <Link className={styles.homeButton} to={"/"} />
          </li>
          <li className={styles.filterItem}>
            <div> THỂ LOẠI</div>
            <div className={clsx(styles.genres, "row")}>
              {getFilterElement(filterRef.current.genres, "/genres")}
            </div>
          </li>
          <li className={styles.filterItem}>
            <div> TRẠNG THÁI</div>
            <div className={styles.status}>
              {getFilterElement(filterRef.current.status, "/status")}
            </div>
          </li>
          <li className={styles.filterItem}>
            <div> XEM NHIỀU</div>
            <div className={styles.topViews}>
              {getFilterElement(filterRef.current.topViews, "/topview")}
            </div>
          </li>
          <li className={styles.filterItem}>
            <div> BÌNH LUẬN NHIỀU</div>
            <div className={styles.topComments}>
              {getFilterElement(filterRef.current.topComments, "/topcomment")}
            </div>
          </li>
          <li className={styles.filterItem}>
            <div> LƯỠNG LONG NHẤT THỂ</div>
            <div className={styles.duo}>
              {getFilterElement(filterRef.current.duo, "/duo")}
            </div>
          </li>
          <li className={styles.filterItem}>
            <div> NĂM</div>
            <div className={styles.year}>
              {getFilterElement(filterRef.current.year, "/year")}
            </div>
          </li>
          <li className={styles.filterItem}>
            <span style={{ color: "white" }}>HỎI ĐÁP</span>
            <Link className={styles.homeButton} to={`/q&a`}></Link>
          </li>
          <li className={styles.filterItem}>
            <div> TV/MOVIE</div>
            <div className={styles.tvMovie}>
              {getFilterElement(filterRef.current.TVMovie, "/tvMovie")}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
