import { useEffect, useState } from "react";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SideBar.css";
import { useNavigate } from "react-router-dom";
import SetModal from "./setModal";
import { useSelector } from "react-redux";

function SideBar() {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: any) => ({
    userInfo: state.user.userInfo,
  }));

  // useEffect(() => {}, [userInfo]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
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
        <FontAwesomeIcon icon={faSignOut} className="sidebar-btn faSignOut" />
      </div>

      <SetModal open={modalOpen} close={closeModal} userInfo={userInfo} />
    </div>
  );
}

export default SideBar;
