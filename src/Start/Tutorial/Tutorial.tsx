import React from "react";
import { Link } from "react-router-dom";
import "./Tutorial.css";

function Tutorial() {
  return (
    <div className="tutorial">
      <div className="tutorial-header">
        <Link to="/" className="tutorial-title">
          DA:HAENG
        </Link>
        <div className="header-button">
          <Link to="/start" className="tutorial-btn">
            시작하기
          </Link>
          <Link to="/login" className="tutorial-btn">
            로그인
          </Link>
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