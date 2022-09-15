import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type User = {
  email: string;
  nickname: string;
  password: string;
  // id_token: boolean;
};

const initialState = {
  emailCheck: false,
  checknum: "",
  join: false,
  loading: false,
  userInfo: {},
  error: null,
  success: false,
};

// export type UsersState = User[];

// const UsersInitialState: UsersState = [
//     {
//         email: "louis@naver.com",
//         nickname: 'louis',
//         password: 'hihijiho1234',
//         id_token: false,
//     },
//     {
//         email: "JJangYunji@naver.com",
//         nickname: 'JJangYunji',
//         password: 'JJangYunji1234',
//         id_token: false,
//     }
// ]

// 회원추가
export const addUserAsync = createAsyncThunk(
  "user/addUserAsync",
  async (user: User) => {
    console.log(user);
    return await fetch("http://localhost:8080/user/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        nickname: user.nickname,
        password: user.password,
      }),
    }).then((res) => res);
  }
);

// 이메일 인증 요청 보내는 api 만들기
export const emailCertificationAsync = createAsyncThunk(
  "user/emailCertificationAsync",
  async (email: string) => {
    return await fetch("http://localhost:8080/user/mail-authentication", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }).then((res) => res.json());
  }
);

//이메일 중복 확인
export const emailOverlapAsync = createAsyncThunk(
  "user/emailOverlap",
  async (email: string) => {
    return await fetch("http://localhost:8080/user/check-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }).then((res) => res);
  }
);

// 추가되면 로그인
export const setUserAsync = createAsyncThunk(
  "SET_USER",
  async (user: {
    email: string;
    password: string;
  }): Promise<{ email: string; password: string }> => {
    const response = await axios.get("");
    return response.data;
  }
);

// //회원 정보 조회
// export const getUserInfoAsync = createAsyncThunk(
//   "GET_USERINFO",
//   async (user: {email: string}) => {
//     const response = await axios.get("");
//     return response.data;
//   }
// )

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(emailCertificationAsync.fulfilled, (state, action) => {
        console.log(action.payload.checkNum);
        state.checknum = action.payload.checkNum;
      })
      .addCase(emailOverlapAsync.fulfilled, (state, action) => {
        state.emailCheck = true;
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.join = true;
      })
      .addCase(addUserAsync.rejected, (state, action) => {
        console.log("error");
      })
      .addCase(setUserAsync.fulfilled, (state, action) => {
        state.success = true;
        state.userInfo = { ...action.payload };
      });
  },
});

export const userActions = userSlice.actions;
export default userSlice;
