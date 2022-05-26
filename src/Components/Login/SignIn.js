import clsx from "clsx";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { userContext } from "../../App";
import styles from "./login.module.scss";
import Validator from "../../FunctionSpJs/Validator";
import { domain } from "../../FunctionSpJs/constant";
import Loading from "../Loading";
function SignIn() {
  const usercontext = useContext(userContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  async function signIn(result, exist) {
    setIsLoading(true);
    axios
      .get(`${domain}/auth/sign-in`, {
        params: result,
      })
      .then((res) => {
        setIsLoading(false);
        if (res.data.type === "error") {
          const errorElement = document.querySelector(exist.selector);
          if (errorElement) {
            errorElement.innerText = exist.message;
          }
        } else {
          localStorage.setItem(
            "anime47",
            JSON.stringify({
              accessToken: res.data.accessToken,
              avata:res.data.avata,
              name:res.data.name,
            })
          );
          usercontext.setUser(res.data);
          setTimeout(() => {
            alert("Đăng nhập tài khoản thành công!");
            navigate("/");
          }, 100);
        }
      });
  }
  useEffect(() => {
    Validator({
      form: "#form1",
      rules: [
        Validator.isRequire("#name", "vui lòng nhập tên!"),
        Validator.isRequire("#password", "vui lòng nhập mật khẩu!"),
        Validator.minLength("#password", 6),
      ],
      errorSelector: styles.error,
      exist: {
        selector: "#error",
        message: "Tên tài khoản hoặc mật khẩu không đúng!",
      },
      callBack: signIn,
    });
  });
  return (
    <>
      <div>
        <div className={styles.formGroup}>
          <label htmlFor="name">Tài Khoản</label>
          <input name="name" id="name" autoComplete="off" />
        </div>
        <span className={clsx(styles.error, styles.nameError)}></span>
      </div>
      <div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Mật Khẩu</label>
          <input name="password" type="password" id="password" />
        </div>
        <span className={clsx(styles.error, styles.passwordError)}></span>
      </div>
      <div>
        <div
          style={{ height: "16px" }}
          id="error"
          className={styles.error}
        ></div>
        <button>Đăng Nhập</button>
      </div>
      {isLoading && <Loading />}
    </>
  );
}

export default SignIn;
