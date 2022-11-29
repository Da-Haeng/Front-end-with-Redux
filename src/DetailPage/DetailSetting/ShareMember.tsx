import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Modal.css";
import { useDispatch, useSelector } from "react-redux";
import { memberShareAsync } from "../../store/user-slice";
import MemoList from "../../Main/MemoList";

type ModalDefaultType = {
  open: boolean;
  close: () => void;
  header: String;
};

const ShareMember = (props: ModalDefaultType) => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  const { open, close, header } = props;

  const dispatch = useDispatch<any>();
  const { shareMember } = useSelector((state: any) => ({
    shareMember: state.user.shareMember,
  }));
  const MemberList = shareMember.map((it: any) => it.nickname);

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <div className="memberHeader">
            <button className="closeNone">&times;</button>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </div>
          <div className="shareMembermodal-div">
            {MemberList.map((it: any) => (
              <div className="modal-list modal-list-line">
                <img
                  className="userimg"
                  src={process.env.PUBLIC_URL + "/userimg.png"}
                ></img>
                <span>{it}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default ShareMember;
