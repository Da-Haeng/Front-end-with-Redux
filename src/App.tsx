import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Main from "./Main/Main";
import Detail from "./DetailPage/Detail";
import Tutorial from "./Start/Tutorial/Tutorial";
import SignUp from "./Start/SignUp/SignUp";
import Login from "./Start/Login/Login";
import NaverLogin from "./Start/SignUp/Naver";
import Redirect from "./Start/SignUp/Redirect";
import { useEffect } from "react";
import { getUserInfoAtLocal } from "./store/user-slice";
import { getMemoListAsync, MemosState } from "./store/main-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";

declare global {
  interface Window {
    naver: any;
  }
}

const App = () => {
  const dispatch = useDispatch<any>();
  const localEmail = localStorage.getItem("email")!;
  console.log(localEmail);
  const getMemoHandler = async () => {
    await dispatch(getMemoListAsync(localEmail));
    console.log("메모");
  };

  if (localEmail) {
    try {
      dispatch(getUserInfoAtLocal());
      getMemoHandler();
    } catch (e) {}
  } else {
  }
  // const mainItems: MemosState = useSelector(
  //   (state: RootState) => state.main.memoData
  // );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tutorial />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/naver" element={<NaverLogin />}></Route>
        <Route path="/redirect" element={<Redirect />}></Route>
        <Route path="/main" element={<Main />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
