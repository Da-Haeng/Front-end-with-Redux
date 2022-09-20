import { faDraftingCompass } from "@fortawesome/free-solid-svg-icons";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";

export type Memo = {
  user: string;
  id: number;
  title: string;
  date: string;
  description: string;
  color: number;
};

const initialState = {
  join: false,
  error: null,
  memoData: [],
  success: false,
};

export type MemosState = Memo[];

const MemosInitialState: MemosState = [
  // {
  //   user: "louisluzet@naver.com",
  //   id: 1,
  //   title: "GO JEJU🌴",
  //   date: "JULY 12 ~ JULY 15",
  //   description: "제주 맛집 뿌시기 여행 :)",
  //   color: 1,
  // },
  // {
  //   id: 2,
  //   title: "JAPAN🍜",
  //   date: "MAY 25 ~ MAY 28",
  //   description: "셤끝나고 일본 여행",
  //   color: 2,
  // },
  // {
  //   id: 3,
  //   title: "NEWYORK🛫",
  //   date: "NOVEMBER 1 ~ NOVEMBER 28",
  //   description: "뉴욕 걸리버 여행기",
  //   color: 3,
  // },
];
// (/main) 모든 메모 조회
export const getMemoListAsync = createAsyncThunk(
  "note/getMemoListAsync",
  async (userEmail: string) => {
    return await fetch("http://localhost:8080/note/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail
      })
    }).then((res) => res.json());
  }
);

// (/main) 메모 추가 
export const addMemoAsync = createAsyncThunk(
  "note/addMemoAsync",
  async (memo: Memo) => {
    return await fetch("http://localhost:8080/note/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: memo.user,
        noteId: memo.id,
        noteName: memo.title,
        setDate: memo.date,
        noteDescription: memo.description,
        noteColor: memo.color
      })
    }).then((res) => res);
  }
);

// 수정 param = memo(객체)
export const editMemoAsync = createAsyncThunk(
  "note/editMemoAsync",
  async (memo: Memo) => {
    return await fetch("http://localhost:8080/note/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: memo.user,
        noteId: memo.id,
        noteName: memo.title,
        noteDate: memo.date,
        noteDescription: memo.description,
        noteColor: memo.color
      })
    }).then((res) => res);
  }
);
type deleteProps = {
  memoId: number,
  email: string
}

// (/main) 삭제 param = memoID
export const removeMemoAsync = createAsyncThunk(
  "note/removeMemoAsync",
  async (data: deleteProps) => {
    return await fetch("http://localhost:8080/member/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        noteId: data.memoId
      })
    }).then((res) => res);
  }
);



const mainSlice = createSlice({
  name: "main",
  initialState: initialState,
  reducers: {
    // addItemToMain: (state, { payload }: PayloadAction<Memo>) => {
    //   state.items.push({
    //     user: "louisluzet@naver.com",
    //     id: payload.id,
    //     title: payload.title,
    //     date: payload.date,
    //     description: payload.description,
    //     color: payload.color,
    //   });
    // },
    // editItemToMain: (state, { payload }: PayloadAction<Memo>) => {
    //   const newItem = state.items.find((it) => it.id === payload.id);
    //   if (newItem) {
    //     const idx = state.items.findIndex((it) => it.id === newItem.id);
    //     state.items[idx].title = payload.title;
    //     state.items[idx].date = payload.date;
    //     state.items[idx].description = payload.description;
    //     state.items[idx].color = payload.color;
    //   }
    // },
    // removeItemToMain: (
    //   state,
    //   {
    //     payload,
    //   }: PayloadAction<{
    //     id: number;
    //   }>
    // ) => {
    //   const newItem = payload;
    //   return produce(state, (draft) => {
    //     draft.items = draft.items.filter((item) => item.id !== newItem.id);
    //   });
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMemoListAsync.fulfilled, (state, action) => {
        state.success = true;
        state.memoData = action.payload;
      })
      .addCase(addMemoAsync.fulfilled, (state, action) => {
        state.join = true;
      })
      .addCase(removeMemoAsync.fulfilled, (state, action) => {
        // state.join = true;
      })
      .addCase(editMemoAsync.fulfilled, (state, action) => {
        // state.join = true;
      })
  }
});

export const mainActions = mainSlice.actions;
export default mainSlice;
