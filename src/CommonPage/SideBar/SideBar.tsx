import { useEffect, useState } from "react";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SideBar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SetModal from "./setModal";
import { logoutSuccess } from "../../store/user-slice";

function SideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const { userInfo } = useSelector((state: any) => ({
    userInfo: state.user.userInfo,
  }));

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const logoutHandler = () => {
    localStorage.clear();
    dispatch(logoutSuccess(false));
    alert("로그아웃되었습니다");
    navigate("/", { replace: true });
  };

  return (
    <div className="sidebar">
      <div className="sidebar-profile">
        <span className="profile-name">{userInfo.nickname.charAt(0)}</span>
        {/* userInfo.nickname.charAt(0) */}
        <span className="profile-info profile-info-top">
          {userInfo.nickname}님의
        </span>
        {/*  */}
        <span className="profile-info">다행 :)</span>
      </div>
      <div className="sidebar-btn-top">
        <span>
          <FontAwesomeIcon
            icon={faHome}
            className="sidebar-btn"
            onClick={() => navigate("/main")}
          />
        </span>
        <FontAwesomeIcon
          onClick={openModal}
          icon={faCog}
          className="sidebar-btn faCog"
        />
        <FontAwesomeIcon icon={faBell} className="sidebar-btn faBell" />
      </div>
      <div className="sidebar-btn-bottom">
        <FontAwesomeIcon
          onClick={logoutHandler}
          icon={faSignOut}
          className="sidebar-btn faSignOut"
        />
      </div>

      <SetModal open={modalOpen} close={closeModal} userInfo={userInfo} />
    </div>
  );
}

export default SideBar;
