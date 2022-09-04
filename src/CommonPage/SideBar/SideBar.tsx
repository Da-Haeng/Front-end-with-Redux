import { useState } from "react";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SideBar.css";
import { useNavigate } from "react-router-dom";
import SettingModal from "./setModal";

function SideBar() {
  const navigate = useNavigate();

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
        <span className="profile-name">가</span>
        <span className="profile-info profile-info-top">짱윤지님의</span>
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
      <SettingModal open={modalOpen} close={closeModal}/>
    </div>
  );
}

export default SideBar;
