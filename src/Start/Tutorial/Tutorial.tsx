import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { User } from "../../store/user-slice";
import { useDispatch, useSelector } from "react-redux";
import "./Tutorial.css";

function Tutorial() {
  const dispatch = useDispatch<any>();

  const { success, userInfo } = useSelector((state: any) => ({
    success: state.user.success,
    userInfo: state.user.userInfo,
  }));
  console.log(success);
  console.log(userInfo);

  return (
    <div className="tutorial">
      <div className="tutorial-header">
        <Link to="/" className="tutorial-title">
          DA:HAENG
        </Link>
        <div className="header-button">
          {success === false && (
            <Link to="/signup" className="tutorial-btn">
              가입하기
            </Link>
          )}
          {success === false && (
            <Link to="/login" className="tutorial-btn">
              로그인
            </Link>
          )}
          {success && (
            <Link to="/main" className="tutorial-btn">
              다행 메모장
            </Link>
          )}
        </div>
      </div>
      <div className="tutorial-main">
        <span className="tutorial-maintitle">너와 함께여서 다행이야</span>
        <span className="tutorial-maintitle">모든 공유의 시작</span>
        <span className="tutorial-subtitle">
          모든 계획과 기록을 손쉽게 공유해보세요.
        </span>
        <img className="tutorial-img" src="image/tutorial.png" />
      </div>
    </div>
  );
}

export default Tutorial;
