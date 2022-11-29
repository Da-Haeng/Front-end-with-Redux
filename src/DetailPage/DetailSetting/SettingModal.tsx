import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Modal.css";
import { useDispatch, useSelector } from "react-redux";
import {
  memberFindAsync,
  memberInviteAsync,
  memberShareAsync,
} from "../../store/user-slice";
import Swal from "sweetalert2";

type ModalDefaultType = {
  open: boolean;
  close: () => void;
  header: String;
};

const SettingModal = (props: ModalDefaultType) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { emailSelect } = useSelector((state: any) => ({
    emailSelect: state.user.emailSelect,
  }));

  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  const dispatch = useDispatch<any>();

  const [email, setEmail] = useState("");
  const [showNickname, setShowNickName] = useState("");
  const [show, setShow] = useState(false);
  const [memNone, setMemNone] = useState(false);

  const emailList = emailSelect.map((it: any) => it.email);

  useEffect(() => {
    // setShowNickName(emaillist);
    // setShow(showState);
    // setMemNone(memNoneState);
    if (emailSelect.length == 0) {
      setMemNone(true);
    } else {
      setMemNone(false);
    }
  }, [emailSelect]);

  useEffect(() => {
    setShow(false);
    setMemNone(false);
  }, [open]);

  const onKeyPress = (e: any) => {
    if (e.key === "Enter") {
      dispatch(memberFindAsync(email));
      setShow(true);
      setEmail("");
    }
  };

  const inviteHandler = (email: any) => {
    const noteId = parseInt(id!);
    console.log(email);
    dispatch(memberInviteAsync({ email: email, noteId: noteId }));
    Swal.fire({ icon: "success", text: "멤버를 초대하였습니다.", width: 400 });
    close();
  };

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
          <div className="modal-div">
            <input
              placeholder="EMAIL을 검색해주세요"
              className="modal-span"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onKeyPress={onKeyPress}
            ></input>

            {show && memNone == false ? (
              emailList.map((it: any) => (
                <div className="modal-list modal-list-line">
                  <div className="modal-list">
                    <img
                      className="userimg"
                      src={process.env.PUBLIC_URL + "/userimg.png"}
                    ></img>
                    <span>{it}</span>
                  </div>
                  <div>
                    <span
                      className="user-invite"
                      onClick={() => inviteHandler(it)}
                    >
                      초대하기
                    </span>
                  </div>
                </div>
              ))
            ) : show && memNone ? (
              <div className="memberNone">
                <span className="memberSpan">가입된 멤버가 없습니다.</span>
              </div>
            ) : (
              <div className="memberNone">
                <span className="memberSpan">초대할 멤버를 검색해주세요</span>
              </div>
            )}
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default SettingModal;
