import React, { useCallback, useState } from "react";
import "./Detail.css";
import { useParams } from "react-router-dom";
import SettingModal from "./DetailSetting/SettingModal";
import ShareMember from "./DetailSetting/ShareMember";
import { useDispatch, useSelector } from "react-redux";
import { memberExitAsync, memberShareAsync } from "../store/user-slice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const DetailSetting = (props: any) => {
  const dispatch = useDispatch<any>();
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalOpen2, setModalOpen2] = useState<boolean>(false);

  const title = props.title;

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
    Swal.fire({
      icon: "question",
      text: `'${title}' 멤버에서 완전히 나가시겠습니까?`,
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      width: 450,
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(memberExitAsync({ email: userInfo.email, noteId: noteId }));
        Swal.fire({
          icon: "success",
          text: "다른 메모장에서 만나요 :)",
          width: 400,
        });
        navigate("/main", { replace: true });
      } else {
        Swal.fire({ icon: "error", text: "취소되었습니다.", width: 400 });
      }
    });
  };

  return (
    <div className="DetailSetIcon">
      <div className="detailsetting">
        <span onClick={openModal}>멤버 초대하기</span>
      </div>
      <div className="detailsetting">
        <span onClick={openModal2}>멤버 확인하기</span>
      </div>
      <div className="detailsetting">
        <span onClick={memberExit}>메모장 나가기</span>
      </div>
      <div className="detailsetting detailsetting_none">
        <span>PDF 내보내기</span>
      </div>
      <SettingModal
        open={modalOpen}
        close={closeModal}
        header={`'${title}' 공유 멤버 초대`}
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
