import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: "category",
  initialState: {
    mainId: 1,
    items: [
      {
        id: 1,
        list: [
          { id: 1, cell },
          { id: 2, cell },
        ],
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
    ],
  },
  reducers: {
    addItemToMain(state, action) {
      const newItem = action.payload;
      state.items.push({
        id: newItem.id,
        title: newItem.title,
        date: newItem.date,
        description: newItem.description,
        color: 1,
      });
    },
    removeItemToMain(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.items = state.items.filter((item) => item.id !== id);
    },
  },
});

export const mainActions = mainSlice.actions;
export default mainSlice;
