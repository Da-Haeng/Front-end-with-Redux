import React, { useCallback, useState } from "react";
import "./Detail.css";
import { useParams } from "react-router-dom";
import SettingModal from "./DetailSetting/SettingModal";
import ShareMember from "./DetailSetting/ShareMember";
import { useDispatch, useSelector } from "react-redux";
import { memberExitAsync, memberShareAsync } from "../store/user-slice";
import { useNavigate } from "react-router-dom";

const DetailSetting = () => {
  const dispatch = useDispatch<any>();
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalOpen2, setModalOpen2] = useState<boolean>(false);
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
  const openModal2 = () => {
    const noteId = parseInt(id!);
    dispatch(memberShareAsync(noteId));
    setModalOpen2(true);
  };
  const closeModal2 = () => {
    setModalOpen2(false);
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
      <div className="detailsetting">
        <span onClick={openModal2}>멤버 확인하기</span>
      </div>
      <div className="detailsetting detailsetting_none">
        <span>PDF 내보내기</span>
      </div>
      <SettingModal
        open={modalOpen}
        close={closeModal}
        header="'JEJU' 멤버 초대"
      ></SettingModal>
      <ShareMember
        open={modalOpen2}
        close={closeModal2}
        header="공유 멤버 확인하기"
      ></ShareMember>
    </div>
  );
};

export default DetailSetting;
