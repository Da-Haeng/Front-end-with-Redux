import React, { ChangeEvent, useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  setUserAsync,
  getUserInfoAtLocal,
} from "../../store/user-slice";
import { getMemoListAsync } from "../../store/main-slice";
import NaverLogin from "../SignUp/Naver";
import { loginSuccess } from "../../store/user-slice";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const { userInfo, error, success } = useSelector((state: any) => ({
    userInfo: state.user.userInfo,
    error: state.user.error,
    success: state.user.success,
  }));

  useEffect(() => {
    if (Object.keys(userInfo).length > 1) {
      console.log(userInfo);
      dispatch(loginSuccess(true));
      Swal.fire({ icon: "success", text: "로그인되었습니다.", width: 400 });
      navigate("/main", { replace: true });
    } else {
      console.log("비었음");
    }
  }, [userInfo]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const emailCheck = (email: string) => {
    const reg =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return reg.test(email);
  };

  const handleSubmit = () => {
    if (!login.email || !login.password) {
      Swal.fire({
        icon: "error",
        text: "로그인 정보를 입력해주세요.",
        width: 400,
      });
    } else {
      if (!emailCheck(login.email)) {
        Swal.fire({
          icon: "error",
          text: "이메일 형식에 맞게 입력해주세요.",
          width: 400,
        });
        return false;
      } else {
        dispatch(setUserAsync(login));
      }
    }
  };

  return (
    <div className="tutorial">
      <div className="tutorial-header">
        <Link to="/" className="tutorial-title">
          DA:HAENG
        </Link>
      </div>
      <div className="tutorial-content">
        <div className="tutorial-main">
          <span className="tutorial-maintitle">너와 함께여서 다행이야</span>
          <span className="tutorial-maintitle">모든 공유의 시작</span>
          <span className="tutorial-subtitle">
            모든 계획과 기록을 손쉽게 공유해보세요.
          </span>
          <img className="tutorial-img" src="image/tutorial.png" />
        </div>

        <div className="tutorial-start login-start">
          <span className="tutorial-maintitle signupTitle">로그인</span>
          <div className="loginBox snsBox">
            <NaverLogin />
          </div>
          <div className="loginBox">
            <input
              className="inputBox emailLoginBox"
              placeholder="이메일을 입력하세요"
              value={login.email}
              name="email"
              onChange={handleChange}
            ></input>
            <input
              type="password"
              className="inputBox"
              placeholder="비밀번호를 입력하세요"
              value={login.password}
              name="password"
              onChange={handleChange}
            ></input>
            <span className="passwordFind">비밀번호 찾기</span>
            <button className="loginBtn" onClick={handleSubmit}>
              로그인 하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
