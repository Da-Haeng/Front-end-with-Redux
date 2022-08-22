import "./SignUp.css";
import { Link } from "react-router-dom";

const SignUp = () => {
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
          <div className="loginBox">
            <input
              className="inputBox"
              placeholder="이메일을 입력하세요"
            ></input>
            <button className="emailBtn">이메일로 인증하기</button>
            <input
              className="inputBox"
              placeholder="인증코드를 입력하세요"
            ></input>
            <button className="emailFinishBtn">인증완료 하기</button>
          </div>
          <div className="loginBox">
            <span className="tutorial-maintitle">인증완료</span>
            <input
              className="inputNextBox"
              placeholder="닉네임을 입력하세요"
            ></input>
            <input
              className="inputNextBox"
              placeholder="비밀번호를 입력하세요"
            ></input>
            <input className="inputNextBox" placeholder="비밀번호 확인"></input>
            <button className="getStart">시작하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;