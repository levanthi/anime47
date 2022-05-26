import clsx from "clsx";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./login.module.scss";
import Validator from "../../FunctionSpJs/Validator";
import Loading from "../Loading";
import { domain } from "../../FunctionSpJs/constant";

function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function signUp(result, exist) {
    setIsLoading(true);
    axios.post(`${domain}/auth/sign-up`, result).then((res) => {
      setIsLoading(false);
      if (res.data.type === "error") {
        const existElement = document.querySelector(exist.selector);
        if (existElement) {
          existElement.innerText = exist.message;
        }
      } else {
        setTimeout(() => {
          alert("Đăng ký tài khoản thành công vui lòng đăng nhập lại!");
          navigate("/login/sign-in");
        }, 100);
      }
    });
  }

  useEffect(() => {
    Validator({
      form: "#form1",
      rules: [
        Validator.isRequire("#name", "Vui lòng nhập tên đăng nhập!"),
        Validator.isRequire("#password", "Vui lòng nhập mật khẩu!"),
        Validator.isRequire(
          "#passwordConfirmation",
          "Vui lòng nhập lại mật khẩu"
        ),
        Validator.minLength("#password", 6),
        Validator.minLength("#passwordConfirmation", 6),
        Validator.passwordComfirmation("#passwordConfirmation", "#password"),
      ],
      errorSelector: styles.error,
      exist: {
        selector: "#exist",
        message: "Tài khoản đã tồn tại vui lòng dùng tên tài khoản khác!",
      },
      callBack: signUp,
    });
  }, []);
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
        <div className={styles.formGroup}>
          <label htmlFor="passwordConfirmation">Xác Nhận Mật Khẩu</label>
          <input
            name="passwordConfirmation"
            type="password"
            id="passwordConfirmation"
          />
        </div>
        <span className={clsx(styles.error, styles.confirmError)}></span>
      </div>
      <div>
        <div
          className={styles.error}
          id="exist"
          style={{ height: "16px" }}
        ></div>
        <button>Đăng Ký</button>
      </div>
      {isLoading && <Loading />}
    </>
  );
}

export default SignUp;
