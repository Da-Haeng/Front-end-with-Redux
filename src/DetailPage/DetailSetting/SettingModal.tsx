import React, { useState } from "react";
import "./Modal.css";

type ModalDefaultType = {
  open: boolean;
  close: () => void;
  header: String;
};

const SettingModal = (props: ModalDefaultType) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  const [nickname, setNickName] = useState("");
  const [showNickname, setShowNickName] = useState("");
  const [show, setShow] = useState(false);

  const onKeyPress = (e: any) => {
    if (e.key === "Enter") {
      setShow(true);
      setNickName("");
      setShowNickName(nickname);
    }
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <div className="modal-div">
            <input
              placeholder="EMAIL을 검색해주세요"
              className="modal-span"
              value={nickname}
              onChange={(e) => {
                setNickName(e.target.value);
              }}
              onKeyPress={onKeyPress}
            ></input>

            {show && (
              <div className="modal-list modal-list-line">
                <div className="modal-list">
                  <img
                    className="userimg"
                    src={process.env.PUBLIC_URL + "/userimg.png"}
                  ></img>
                  <span>{showNickname}</span>
                </div>
                <div>
                  <span className="user-invite">초대하기</span>
                </div>
              </div>
            )}
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default SettingModal;
