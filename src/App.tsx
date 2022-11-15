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
import Naver from "./Start/SignUp/Naver";
import Redirect from "./Start/SignUp/Redirect";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tutorial />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/naver" element={<Naver />}></Route>
        <Route path="/redirect" element={<Redirect />}></Route>
        <Route path="/main" element={<Main />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
