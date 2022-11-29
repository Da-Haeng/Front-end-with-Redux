import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import {
  addUserAsync,
  emailCertificationAsync,
  emailOverlapAsync,
  User,
  loginSuccess,
  addUserNaverLoginAsync,
  snsLoginCheckAsync,
  Naver,
  setUserAsync,
} from "../../store/user-slice";
import { useDispatch, useSelector } from "react-redux";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { spawn } from "child_process";
import NaverLogin from "./Naver";
import Swal from "sweetalert2";

import Main from "../../Main/Main";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const {
    emailcheck,
    checknum,
    join,
    loading,
    userInfo,
    error,
    success,
    snsNickname,
  } = useSelector((state: any) => ({
    emailcheck: state.user.emailCheck,
    checknum: state.user.checknum,
    join: state.user.join,
    loading: state.user.loading,
    userInfo: state.user.userInfo,
    error: state.user.error,
    success: state.user.success,
    snsNickname: state.user.snsNickname,
  }));

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    nickname: "",
    // id_token: false,
  });

  console.log(success);
  const [code, setCode] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [certification, setCertification] = useState(false);
  const [joinState, setJoinState] = useState(join);
  const [emailcheckState, setEmailCheckState] = useState(true);

  useEffect(() => {
    // {
    //   join && navigate("/main", { replace: true });
    // }
    console.log(emailcheck);
    if (join === false && emailcheck === "EXIST") {
      setUser({ ...user, email: "" });
      Swal.fire({
        icon: "error",
        text: "이미 등록된 이메일입니다.",
        width: 400,
      });
    } else if (join === false && emailcheck === "NOT EXIST") {
      dispatch(emailCertificationAsync(user.email));
      Swal.fire({
        icon: "success",
        text: "인증번호가 전송되었습니다.",
        width: 400,
      });
    }
    // if (join === true && emailcheck === "NOT EXIST") {
    //   navigate("/login", { replace: true });
    // }
  }, [emailcheckState]);

  // sns로그인 후 유저정보 확인하고 닉네임 쓸지말지
  useEffect(() => {
    console.log(userInfo);
    if (userInfo.email) {
      dispatch(loginSuccess(true));
      navigate("/", { replace: true });
    }
  }, [userInfo]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };
  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  };
  const emailCheck = (email: string) => {
    const reg =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return reg.test(email);
  };

  const handleCertification = async () => {
    if (!user.email) {
      Swal.fire({ icon: "error", text: "이메일을 입력해주세요.", width: 400 });
      return false;
    } else {
      if (!emailCheck(user.email)) {
        Swal.fire({
          icon: "error",
          text: "이메일 형식에 맞게 입력해주세요.",
          width: 400,
        });
        return false;
      } else {
        console.log(user.email);
        await dispatch(emailOverlapAsync(user.email));
        setEmailCheckState(!emailcheckState);
      }
    }
  };

  const handleCodeCheck = () => {
    if (!code) {
      Swal.fire({
        icon: "error",
        text: "인증 번호를 입력해주세요.",
        width: 400,
      });
    } else {
      if (checknum === code) {
        setCertification(true);
      } else {
        Swal.fire({
          icon: "error",
          text: "인증 번호가 일치하지 않습니다.",
          width: 400,
        });
      }
    }
    console.log(user);
  };

  //최종회원가입
  const handleSubmit = () => {
    if (user.password === passwordCheck) {
      dispatch(addUserAsync(user));
      Swal.fire({
        icon: "success",
        title: "회원가입 완료",
        text: "다시 로그인하세요.",
        width: 400,
      });
      navigate("/login", { replace: true });
    } else {
      Swal.fire({
        icon: "error",
        text: "비밀번호가 일치하지 않습니다.",
        width: 400,
      });
    }
  };

  // sns 회원가입
  const snsLoginSubmit = () => {
    if (user.nickname) {
      // dispatch(
      //   addUserNaverLoginAsync({
      //     code: userInfo.code,
      //     state: userInfo.state,
      //     nickname: user.nickname,
      //   })
      // );
      // 백 완료하면 이걸로 쓰기

      dispatch(Naver());
      // 백완료하면 이거 삭제

      dispatch(loginSuccess(true));
      Swal.fire({ icon: "success", text: "로그인되었습니다.", width: 400 });
      navigate("/", { replace: true });
    }
  };

  if (userInfo.email) {
    return <div>hi</div>;
  }

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
        <div className="tutorial-start signup-start">
          {snsNickname === false && (
            <>
              <span className="tutorial-maintitle signupTitle">회원가입</span>
              <div className="loginBox">
                {/* <div className="btn-social" onClick={snsNicknameHandler}>
              <img className="google-img" src="image/google.png" />
              <span>구글로 시작하기</span>
            </div> */}

                <NaverLogin />
              </div>
            </>
          )}

          {!certification && snsNickname === false && !userInfo.email && (
            <div className="loginBox signupBox">
              <input
                type="email"
                className="inputBox"
                placeholder="이메일을 입력하세요"
                value={user.email}
                name="email"
                onChange={handleChange}
              ></input>
              <button className="emailBtn" onClick={handleCertification}>
                이메일로 인증하기
              </button>
              <input
                className="inputBox"
                placeholder="인증코드를 입력하세요"
                value={code}
                onChange={handleCodeChange}
              ></input>
              <button className="emailFinishBtn" onClick={handleCodeCheck}>
                인증완료 하기
              </button>
            </div>
          )}
          {certification && snsNickname === false && !userInfo.email && (
            <div className="loginBox">
              <span className="tutorial-maintitle signupTitle">인증완료</span>
              <div className="loginBox">
                <input
                  type="text"
                  className="inputNextBox"
                  placeholder="닉네임을 입력하세요"
                  value={user.nickname}
                  name="nickname"
                  onChange={handleChange}
                ></input>
                <input
                  type="password"
                  className="inputNextBox"
                  placeholder="비밀번호를 입력하세요"
                  value={user.password}
                  name="password"
                  onChange={handleChange}
                ></input>
                <input
                  type="password"
                  className="inputNextBox"
                  placeholder="비밀번호 확인"
                  value={passwordCheck}
                  onChange={handlePasswordChange}
                ></input>
                <button className="getStart" onClick={handleSubmit}>
                  가입하기
                </button>
              </div>
            </div>
          )}
          {snsNickname && (
            <div className="loginBox snsloginBox">
              <span className="tutorial-maintitle signupTitle">회원가입</span>
              <input
                type="text"
                className="inputNextBox nicknameBox"
                placeholder="닉네임을 입력하세요"
                value={user.nickname}
                name="nickname"
                onChange={handleChange}
              ></input>
              <button className="getStart" onClick={snsLoginSubmit}>
                가입하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
