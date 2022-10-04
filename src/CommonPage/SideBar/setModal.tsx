import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import {
  editUserNicknameAsync,
  User,
  editUserPassWordAsync,
} from "../../store/user-slice";
import "./setModal.css";
type PropsType = {
  open: boolean;
  close: () => void;
  userInfo: User;
};

const SetModal = (props: PropsType) => {
  const { open, close } = props;
  const [nickname, setNickName] = useState(props.userInfo.nickname);
  const [pw, setPw] = useState("");
  const [rePW, setRePW] = useState("");
  const dispatch = useDispatch<any>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  const pwHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  const rePWHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRePW(e.target.value);
  };

  const changeNickName = () => {
    dispatch(
      editUserNicknameAsync({ email: props.userInfo.email, nickname: nickname })
    );
  };

  const changePassWord = () => {
    if (pw === rePW) {
      dispatch(
        editUserPassWordAsync({ email: props.userInfo.email, password: pw })
      );
    } else {
      alert("비밀번호가 같지 않습니다. 다시 입력해주세요");
    }
    setPw("");
    setRePW("");
  };

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
              <div className="setModal-title">
                <span className="setTitle">이메일</span>
                <span className="setEmail">{props.userInfo.email}</span>
              </div>
            </div>
            <div className="setModal-info">
              <div className="setModal-title">
                <span className="setTitle">닉네임</span>
                <input
                  placeholder="닉네임"
                  className="setModal-input"
                  value={nickname}
                  onChange={handleChange}
                ></input>
                <button onClick={changeNickName}>변경</button>
              </div>
            </div>
          </div>
          <div className="setModal-div">
            <span className="setModal-span">비밀번호 변경</span>
            <div className="setModal-info">
              <input
                placeholder="비밀번호를 입력해주세요"
                className="setModal-inputPW"
                value={pw}
                onChange={pwHandleChange}
                type="password"
              ></input>
            </div>
            <div className="setModal-info">
              <input
                placeholder="비밀번호를 한번 더 입력해주세요"
                className="setModal-inputPW"
                value={rePW}
                onChange={rePWHandleChange}
                type="password"
              ></input>
              <button onClick={changePassWord}>변경</button>
            </div>
          </div>
          <div className="setModal-div">
            <div className="setModal-info logoutModal">
              <button className="logout-btn">로그아웃</button>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};
export default SetModal;
