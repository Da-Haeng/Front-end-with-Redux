import React, { useCallback, useState } from "react";
import "./Detail.css";
import SettingModal from "./DetailSetting/SettingModal";

const DetailSetting = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="DetailSetIcon">
      <div className="detailsetting">
        <span>페이지 삭제</span>
      </div>
      <div className="detailsetting">
        <span onClick={openModal}>멤버 추가</span>
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
