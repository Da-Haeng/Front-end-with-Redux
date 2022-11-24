import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type User = {
  email: string;
  nickname: string;
  password: string;
  // id_token: boolean;
};

export type NaverUser = {
  token: string;
  nickname: string;
};

export type NaverCheck = {
  code: string;
  state: string;
};

export type loginUser = {
  email: string;
  password: string;
};

export type editNickname = {
  email: string;
  nickname: string;
};

export type editPassword = {
  email: string;
  password: string;
};

export type memberInvite = {
  email: string;
  noteId: number;
};

const initialState = {
  emailCheck: "",
  checknum: "",
  join: false,
  loading: false,
  userInfo: {},
  error: null,
  success: false,
  emailSelect: [],
  shareMember: [],
  snsNickname: false,
};

// 회원추가
export const addUserAsync = createAsyncThunk(
  "user/addUserAsync",
  async (user: User) => {
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

// sns 회원가입 (닉네임,토큰)
export const addUserNaverLoginAsync = createAsyncThunk(
  "user/addUserNaverLoginAsync",
  async (NaverUser: NaverUser) => {
    return await fetch("http://localhost:8080/user/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: NaverUser.token,
        nickname: NaverUser.nickname,
      }),
    }).then((res) => res);
    // 유저정보 다 받아오기
  }
);

// sns 로그인 가입여부 확인 (토큰보내서)
export const snsLoginCheckAsync = createAsyncThunk(
  "user/snsLoginCheckAsync",
  async (NaverCheck: NaverCheck) => {
    return await fetch("http://localhost:8080/naver/callback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: NaverCheck.code,
        state: NaverCheck.state,
      }),
    }).then((res) => res.json());
    // 유저정보 다 받아오기
  }
);

// 로그인
export const setUserAsync = createAsyncThunk(
  "user/setUserAsync",
  async (user: loginUser) => {
    return await fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    }).then((res) => res.json());
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
  "user/emailOverlapAsync",
  async (email: string) => {
    console.log(email);
    return await fetch("http://localhost:8080/user/check-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }).then((res) => res.json());
  }
);

// 닉네임 변경
export const editUserNicknameAsync = createAsyncThunk(
  "user/editUserNicknameAsync",
  async (user: editNickname) => {
    return await fetch("http://localhost:8080/user/edit-nickname", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        nickname: user.nickname,
      }),
    }).then((res) => res.json());
  }
);

//비번 수정
export const editUserPassWordAsync = createAsyncThunk(
  "user/editUserPassWordAsync",
  async (user: editPassword) => {
    return await fetch("http://localhost:8080/user/edit-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    }).then((res) => res);
  }
);

//멤버 검색
export const memberFindAsync = createAsyncThunk(
  "user/memberFindAsync",
  async (email: string) => {
    return await fetch("http://localhost:8080/user/find-member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }).then((res) => res.json());
  }
);

//멤버 초대
export const memberInviteAsync = createAsyncThunk(
  "user/memberInviteAsync",
  async (member: memberInvite) => {
    return await fetch("http://localhost:8080/member/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: member.email, noteId: member.noteId }),
    }).then((res) => res.json());
  }
);

//공유멤버 확인
export const memberShareAsync = createAsyncThunk(
  "user/memberShareAsync",
  async (noteId: any) => {
    return await fetch("http://localhost:8080/user/memberlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ noteId }),
    }).then((res) => res.json());
  }
);

//멤버 나가기
export const memberExitAsync = createAsyncThunk(
  "user/memberExitAsync",
  async (member: memberInvite) => {
    return await fetch("http://localhost:8080/member/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: member.email, noteId: member.noteId }),
    }).then((res) => res.json());
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
  reducers: {
    naverLoginToken(state, action) {
      state.userInfo = {
        ...state.userInfo,
        token: action.payload,
      };
      state.snsNickname = true;
    },
    naverLoginEmail(state, action) {
      state.userInfo = {
        ...state.userInfo,
        email: action.payload,
      };
    },
    // naverLoginNickname(state, action) {
    //   state.userInfo = {
    //     ...state.userInfo,
    //     nickname: action.payload,
    //   };
    // },
    loginSuccess(state, action) {
      state.success = action.payload;
    },
    getUserInfoAtLocal(state) {
      state.userInfo = {
        ...state.userInfo,
        email: localStorage.getItem("email"),
        nickname: localStorage.getItem("nickname"),
        id_token: localStorage.getItem("id_token"),
        notificationCheck: localStorage.getItem("notificationCheck"),
        password: localStorage.getItem("password"),
      };
      state.success = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(emailCertificationAsync.fulfilled, (state, action) => {
        console.log(action.payload.checkNum);
        state.checknum = action.payload.checkNum;
      })
      .addCase(emailOverlapAsync.fulfilled, (state, action) => {
        state.emailCheck = action.payload.result;
        console.log(state.emailCheck);
      })
      .addCase(emailOverlapAsync.rejected, (state, action) => {
        console.log("no");
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.join = true;
      })
      .addCase(addUserAsync.rejected, (state, action) => {
        console.log("catch");
      })
      .addCase(setUserAsync.fulfilled, (state, action) => {
        state.success = true;
        state.userInfo = { ...action.payload };
        localStorage.setItem("email", action.payload.email);
        localStorage.setItem("nickname", action.payload.nickname);
        localStorage.setItem("id_token", action.payload.id_token);
        localStorage.setItem(
          "notificationCheck",
          action.payload.notificationCheck
        );
        localStorage.setItem("password", action.payload.password);

        console.log(action.payload);
      })
      .addCase(memberFindAsync.fulfilled, (state, action) => {
        state.emailSelect = action.payload;
      })
      .addCase(memberInviteAsync.fulfilled, (state, action) => {
        console.log("memberInvite");
      })
      .addCase(memberShareAsync.fulfilled, (state, action) => {
        state.shareMember = action.payload;
        console.log("memberShare");
      })
      .addCase(editUserNicknameAsync.fulfilled, (state, action) => {
        state.userInfo = {
          ...state.userInfo,
          nickname: action.payload.nickname,
        };
      })
      .addCase(memberExitAsync.fulfilled, (state, action) => {})
      .addCase(editUserPassWordAsync.fulfilled, (state, action) => {
        console.log("g");
      })
      .addCase(snsLoginCheckAsync.fulfilled, (state, action) => {
        console.log(action);
      });
  },

  // extraReducers: {
  //   [emailCertificationAsync.pending.type]: (state, action) => {
  //     console.log("emailCertification_pending");
  //   },
  //   [emailCertificationAsync.fulfilled.type]: (state, action) => {
  //     console.log("emailCertification_fulfilled");
  //     console.log(action.payload.checkNum);
  //     state.checknum = action.payload.checkNum;
  //   },
  //   [emailCertificationAsync.rejected.type]: (state, action) => {
  //     console.log("emailCertification_rejected");
  //   },
  // },
});
export let {
  naverLoginToken,
  naverLoginEmail,
  getUserInfoAtLocal,
  // naverLoginNickname,
  loginSuccess,
} = userSlice.actions;
export const userActions = userSlice.actions;
export default userSlice;
