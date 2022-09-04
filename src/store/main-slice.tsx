import { faDraftingCompass } from "@fortawesome/free-solid-svg-icons";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";

export type Memo = {
  id: number;
  title: string;
  date: string;
  description: string;
  color: number;
};

export type MemosState = Memo[];

const MemosInitialState: MemosState = [
  {
    id: 1,
    title: "GO JEJU🌴",
    date: "JULY 12 ~ JULY 15",
    description: "제주 맛집 뿌시기 여행 :)",
    color: 1,
  },
  {
    id: 2,
    title: "JAPAN🍜",
    date: "MAY 25 ~ MAY 28",
    description: "셤끝나고 일본 여행",
    color: 2,
  },
  {
    id: 3,
    title: "NEWYORK🛫",
    date: "NOVEMBER 1 ~ NOVEMBER 28",
    description: "뉴욕 걸리버 여행기",
    color: 3,
  },
];

const mainSlice = createSlice({
  name: "main",
  initialState: { items: MemosInitialState },
  reducers: {
    // initItemToMain(action) {
    //   const newItem = action.payload;
    //   return newItem;
    // },
    addItemToMain: (state, { payload }: PayloadAction<Memo>) => {
      state.items.push({
        id: payload.id,
        title: payload.title,
        date: payload.date,
        description: payload.description,
        color: payload.color,
      });
    },
    editItemToMain: (state, { payload }: PayloadAction<Memo>) => {
      const newItem = state.items.find((it) => it.id === payload.id);
      if (newItem) {
        const idx = state.items.findIndex((it) => it.id === newItem.id);
        state.items[idx].title = payload.title;
        state.items[idx].date = payload.date;
        state.items[idx].description = payload.description;
        state.items[idx].color = payload.color;
      }
    },
    removeItemToMain: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: number;
      }>
    ) => {
      const newItem = payload;
      return produce(state, (draft) => {
        draft.items = draft.items.filter((item) => item.id !== newItem.id);
      });
    },
  },
});

export const mainActions = mainSlice.actions;
export default mainSlice;
