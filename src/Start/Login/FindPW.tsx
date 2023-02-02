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
import {
  loginSuccess,
  emailOverlapAsync,
  findPasswordAsync,
  FindPWtoLogin,
} from "../../store/user-slice";
import Swal from "sweetalert2";

const FindPW = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const [email, setEmail] = useState("");

  const { emailcheck } = useSelector((state: any) => ({
    emailcheck: state.user.emailCheck,
  }));

  const { userInfo, error, success, result } = useSelector((state: any) => ({
    userInfo: state.user.userInfo,
    error: state.user.error,
    success: state.user.success,
    result: state.user.result,
  }));

  const [emailcheckState, setEmailCheckState] = useState(true);
  const [findPWSuccess, setFindPWSuccess] = useState(false);

  // useEffect(() => {
  //   if (Object.keys(userInfo).length > 1) {
  //     console.log(userInfo);
  //     dispatch(loginSuccess(true));
  //     Swal.fire({ icon: "success", text: "로그인되었습니다.", width: 400 });
  //     navigate("/main", { replace: true });
  //   } else {
  //     console.log("비었음");
  //   }
  //   console.log(result);
  // }, [userInfo]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleFindPW = () => {
    navigate("/main", { replace: true });
  };

  const emailCheck = (email: string) => {
    const reg =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return reg.test(email);
  };

  const handleSubmit = async () => {
    console.log(email);
    if (!email) {
      Swal.fire({
        icon: "error",
        text: "이메일을 입력해주세요.",
        width: 400,
      });
    } else {
      if (!emailCheck(email)) {
        Swal.fire({
          icon: "error",
          text: "이메일 형식에 맞게 입력해주세요.",
          width: 400,
        });
        return false;
      } else {
        await dispatch(emailOverlapAsync(email));
        setEmailCheckState(!emailcheckState);
      }
    }
  };

  useEffect(() => {
    // {
    //   join && navigate("/main", { replace: true });
    // }
    console.log(emailcheck);
    if (emailcheck === "NOT EXIST") {
      Swal.fire({
        icon: "error",
        text: "가입하지 않은 이메일입니다.",
        width: 400,
      });
      setEmail("");
    } else if (emailcheck === "EXIST") {
      dispatch(findPasswordAsync(email));
      Swal.fire({
        icon: "success",
        text: "인증번호가 전송되었습니다.",
        width: 400,
      });
      setFindPWSuccess(true);
    }
    // if (join === true && emailcheck === "NOT EXIST") {
    //   navigate("/login", { replace: true });
    // }
  }, [emailcheckState]);

  const handleLogin = () => {
    navigate("/login", { replace: true });
    dispatch(FindPWtoLogin());
  };

  const mainClick = () => {
    navigate("/", { replace: true });
    dispatch(FindPWtoLogin());
  };

  return (
    <div className="tutorial">
      <div className="tutorial-header">
        <span onClick={mainClick} className="tutorial-title">
          DA:HAENG
        </span>
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

        <div className="tutorial-start findPWBox">
          <span className="tutorial-maintitle signupTitle">비밀번호 찾기</span>

          <div className="loginBox">
            <input
              className="inputBox emailLoginBox"
              placeholder="이메일을 입력하세요"
              value={email}
              name="email"
              onChange={handleChange}
            ></input>

            {findPWSuccess ? (
              <button className="loginBtn" onClick={handleLogin}>
                로그인하러가기
              </button>
            ) : (
              <button className="loginBtn" onClick={handleSubmit}>
                비밀번호 찾기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FindPW;
