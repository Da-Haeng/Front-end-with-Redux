import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Tutorial.css";
import { zz } from "../../store/user-slice";
import axios from "axios";

function Tutorial() {
  const dispatch = useDispatch<any>();

  const { success, userInfo } = useSelector((state: any) => ({
    success: state.user.success,
    userInfo: state.user.userInfo,
  }));

  // const reloadHandler = async () => {
  //   //window.location.reload();
  //   await axios
  //     .get("/o/oauth2/v2/auth", {
  //       params: {
  //         scope: "https://www.googleapis.com/auth/userinfo.email",
  //         include_granted_scopes: true,
  //         response_type: "code",
  //         state: "state_parameter_passthrough_value",
  //         redirect_uri:
  //           "http://semtle.catholic.ac.kr:8080/codev/user/google/login",
  //         client_id:
  //           "413806176191-5ubglt67tr3gdl7u45l4qmepgcj5h71k.apps.googleusercontent.com",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     });
  // };

  const reloadHandler = async () => {
    window.location.reload();
    // await axios
    //   .get(
    //     "/codev/project/projects/1?coLocationTag=&coPartTag=&coKeyword&coProcessTag=&coSortingTag="
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //   });
    //dispatch(zz());
  };

  return (
    <div className="tutorial">
      <div className="tutorial-header">
        {/* <Link to="/" className="tutorial-title">
          DA:HAENG
        </Link> */}
        <span className="tutorial-title" onClick={reloadHandler}>
          DA:HAENG
        </span>
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
