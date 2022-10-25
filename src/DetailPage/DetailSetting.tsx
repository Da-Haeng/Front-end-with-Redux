import React, { useCallback, useState } from "react";
import "./Detail.css";
import { useParams } from "react-router-dom";
import SettingModal from "./DetailSetting/SettingModal";
import { useDispatch, useSelector } from "react-redux";
import { memberExitAsync } from "../store/user-slice";
import { useNavigate } from "react-router-dom";

const DetailSetting = () => {
  const dispatch = useDispatch<any>();
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: any) => ({
    userInfo: state.user.userInfo,
  }));

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const memberExit = () => {
    const noteId = parseInt(id!);
    dispatch(memberExitAsync({ email: userInfo.email, noteId: noteId }));
    alert("메모장 멤버에서 나가셨습니다.");
    navigate("/main", { replace: true });
  };

  return (
    <div className="DetailSetIcon">
      <div className="detailsetting">
        <span onClick={openModal}>멤버 추가</span>
      </div>
      <div className="detailsetting">
        <span onClick={memberExit}>멤버 나가기</span>
      </div>
      <div className="detailsetting detailsetting_none">
        <span>PDF 내보내기</span>
      </div>
      <SettingModal
        open={modalOpen}
        close={closeModal}
        header="'JEJU' 멤버 초대"
      ></SettingModal>
    </div>
  );
};

export default DetailSetting;
