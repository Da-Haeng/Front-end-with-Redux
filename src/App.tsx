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
import { useEffect } from "react";
import { getUserInfoAtLocal } from "./store/user-slice";
import { getMemoListAsync, MemosState } from "./store/main-slice";
import { getCategoryListAsync } from "./store/category-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { render } from "@testing-library/react";

declare global {
  interface Window {
    naver: any;
  }
}

const App = () => {
  const dispatch = useDispatch<any>();
  const localEmail = localStorage.getItem("email")!;
  const noteId = localStorage.getItem("noteId")!;

  const getHandler = async () => {
    await dispatch(getUserInfoAtLocal());
    // await dispatch(getCategoryListAsync(parseInt(noteId)));
  };

  if (localEmail) {
    try {
      getHandler();
      console.log("app");
    } catch (e) {}
  } else {
  }

  useEffect(() => {});

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tutorial />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/naver" element={<NaverLogin />}></Route>
        <Route path="/main" element={<Main />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
