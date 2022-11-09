import { faDraftingCompass } from "@fortawesome/free-solid-svg-icons";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";

export type Memo = {
  user: string;
  noteId: number;
  noteName: string;
  startDate: Date;
  endDate: Date;
  noteDescription: string;
  noteColor: number;
};

const initialState = {
  join: false,
  error: null,
  memoData: [],
  update: false,
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
  "main/getMemoListAsync",
  async (userEmail: string) => {
    return await fetch("http://localhost:8080/note/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
      }),
    }).then((res) => res.json());
  }
);

// (/main) 메모 추가
export const addMemoAsync = createAsyncThunk(
  "main/addMemoAsync",
  async (memo: Memo) => {
    return await fetch("http://localhost:8080/note/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: memo.user,
        noteName: memo.noteName,
        startDate: memo.startDate,
        endDate: memo.endDate,
        noteDescription: memo.noteDescription,
        noteColor: memo.noteColor,
      }),
    }).then((res) => res);
  }
);

// 수정 param = memo(객체)
export const editMemoAsync = createAsyncThunk(
  "main/editMemoAsync",
  async (updateMemo: any) => {
    return await fetch("http://localhost:8080/note/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        noteId: updateMemo.noteId,
        noteName: updateMemo.noteName,
        noteDescription: updateMemo.noteDescription,
        noteColor: updateMemo.noteColor,
        startDate: updateMemo.startDate,
        endDate: updateMemo.endDate,
      }),
    }).then((res) => res.json());
  }
);
type deleteProps = {
  memoId: number;
  email: string;
};

// (/main) 삭제 param = memoID
export const removeMemoAsync = createAsyncThunk(
  "main/removeMemoAsync",
  async (data: deleteProps) => {
    console.log(data.memoId);
    return await fetch("http://localhost:8080/note/deleteCompletely", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        noteId: data.memoId,
      }),
    }).then((res) => res.json());
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
        state.memoData = action.payload;
        console.log("A");
        console.log(state.memoData);
      })
      .addCase(addMemoAsync.fulfilled, (state, action) => {
        state.update = !state.update;
        console.log("B");
      })
      .addCase(removeMemoAsync.fulfilled, (state, action) => {
        state.update = !state.update;
        console.log(action.payload);
      })
      .addCase(editMemoAsync.fulfilled, (state, action) => {
        state.update = !state.update;
        console.log(action.payload);
      });
  },
});

export const mainActions = mainSlice.actions;
export default mainSlice;
