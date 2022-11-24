import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  naverLoginToken,
  snsLoginCheckAsync,
  naverLoginEmail,
  // naverLoginNickname,
} from "../../store/user-slice";

const NaverLogin = () => {
  const { naver } = window;
  const dispatch = useDispatch<any>();
  const NAVER_CLIENT_ID = "_yBxXZBHL2cbgPxEWY1X";
  const NAVER_CALLBACK_URL = "http://localhost:3000/signup";

  const { userInfo } = useSelector((state: any) => ({
    userInfo: state.user.userInfo,
  }));

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: false,
      loginButton: { color: "green", type: 3, height: 58 },
      callbackHandle: true,
    });
    naverLogin.init();

    naverLogin.getLoginStatus(async function (status: any) {
      if (status) {
        // 아래처럼 선택하여 추출이 가능하고,
        const userid = naverLogin.user.getEmail();
        const username = naverLogin.user.getName();
        // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다.
        // setUserInfo(naverLogin.user)
        console.log(userid);
        console.log(username);
        // dispatch(naverLoginEmail(userid));
        // dispatch(naverLoginNickname(username));
      }
    });
  };

  const userAccessToken = () => {
    window.location.href.includes("access_token") && getToken();
  };

  const getToken = () => {
    const code = window.location.href.split("=")[1].split("&")[0];
    const state = window.location.href.split("=")[2].split("&")[0];
    console.log(window.location.href);
    console.log(state);
    console.log(code);
    localStorage.setItem("code", code);
    localStorage.setItem("state", state);
    dispatch(naverLoginToken(code));
    dispatch(snsLoginCheckAsync({ code: code, state: state })); // 백한테 토큰 보내줘서 유저정보 받아오기
  };

  const start = () => {
    initializeNaverLogin();
    userAccessToken();
  };

  useEffect(() => {
    start();
  }, []);

  // 화면 첫 렌더링이후 바로 실행하기 위해 useEffect 를 사용하였다.

  return <div id="naverIdLogin" onClick={start}></div>;
};

export default NaverLogin;
