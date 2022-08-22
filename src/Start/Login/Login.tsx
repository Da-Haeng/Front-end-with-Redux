import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
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
        <div className="tutorial-start">
          <span className="tutorial-maintitle">시작하기</span>
          <br></br>
          <div className="loginBox">
            <button className="btn-social">
              <img className="google-img" src="image/google.png" />
              구글로 시작하기
            </button>
            <button className="btn-social">
              <img className="naver-img" src="image/naver-icon-file.png" />
              네이버로 시작하기
            </button>
          </div>
          <br></br>
          <div className="loginBox">
            <input
              className="inputBox"
              placeholder="이메일을 입력하세요"
            ></input>
            <input
              className="inputBox"
              placeholder="비밀번호를 입력하세요"
            ></input>
            <a style={{ color: "grey" }}>비밀번호 찾기</a>
            <button className="loginBtn">로그인 하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;