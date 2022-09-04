import "./setModal.css";
type PropsType = {
  open: boolean;
  close: () => void;
};
const SettingModal = (props: PropsType) => {
  const { open, close } = props;
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal setModal" : "setModal"}>
      {open ? (
        <section>
          <header>
            계정
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <div className="setModal-div">
            <span className="setModal-span">개인정보</span>
            <div className="setModal-info">
              <div className="setModal-title">이메일</div>
              <div className="setModal-title">aaa@naver.com</div>
            </div>
            <div className="setModal-info">
              <div className="setModal-title">닉네임</div>
              <input placeholder="닉네임" className="setModal-input"></input>
              <button>변경</button>
            </div>
          </div>
          <div className="setModal-div">
            <span className="setModal-span">비밀번호 변경</span>
            <div className="setModal-info">
              <button>비밀번호 변경</button>
            </div>
          </div>
          <div className="setModal-div">
            <span className="setModal-span">로그아웃</span>
            <div className="setModal-info">
              <button className="logout-btn">로그아웃</button>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};
export default SettingModal;
