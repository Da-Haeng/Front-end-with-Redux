import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { act } from "react-dom/test-utils";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    items: [
      {
        mainId: 1,
        document: [
          {
            categoryId: 1,
            categoryTitle: "DAY1",
            cell: [
              {
                id: 1,
                text: "협재로 가서 숙소 체크인!",
                type: "h2",
                color: "black",
              },
              {
                id: 2,
                text: "일단 공항 근처에서 점심먹기 - 돼지국밥!",
                type: "h2",
                color: "black",
              },
            ],
          },
          {
            categoryId: 2,
            categoryTitle: "DAY2",
            cell: [
              {
                id: 1,
                text: "안녕하세요",
                type: "h2",
                color: "black",
              },
              {
                id: 2,
                text: "하이하이루",
                type: "h2",
                color: "black",
              },
            ],
          },
          { categoryId: 3, categoryTitle: "DAY3", cell: [] },
        ],
      },
      {
        mainId: 2,
        document: [
          {
            categoryId: 1,
            categoryTitle: "DAY1 두번째",
            cell: [
              {
                id: 1,
                text: "협재로 가서 숙소 체크인22!",
                type: "h2",
                color: "black",
              },
              {
                id: 2,
                text: "일단 공항 근처에서 점심먹기22 - 돼지국밥!",
                type: "h2",
                color: "black",
              },
            ],
          },
          { categoryId: 2, categoryTitle: "DAY2 두번째", cell: [] },
          { categoryId: 3, categoryTitle: "DAY3 두번째", cell: [] },
        ],
      },
      {
        mainId: 3,
        document: [
          { id: 1, cell: [] },
          { id: 2, cell: [] },
        ],
      },
    ],
  },
  reducers: {
    addItemToCategory(state, action) {
      const newItem = action.payload;
      return produce(state, (draft) => {
        const find = draft.items.find(
          (item) => parseInt(item.mainId) === parseInt(newItem.id)
        );
        find.document.push({
          categoryId: newItem.categoryId,
          categoryTitle: newItem.categoryTitle,
          cell: [],
        });
      });
    },
    editItemToCategory(state, action) {
      const newItem = action.payload;

      const find = state.items.find(
        (item) => parseInt(item.mainId) === parseInt(newItem.mainId)
      );
      const category = find.document.find(
        (item) => parseInt(item.categoryId) === parseInt(newItem.categoryId)
      );
      const cell = category.cell.find(
        (item) => parseInt(item.id) === parseInt(newItem.id)
      );

      cell.text = newItem.text;
    },
    addCellToCategory(state, action) {
      const newItem = action.payload;

      const find = state.items.find(
        (item) => parseInt(item.mainId) === parseInt(newItem.mainId)
      );
      const category = find.document.find(
        (item) => parseInt(item.categoryId) === parseInt(newItem.categoryId)
      );
      category.cell.push({ id: newItem.id, text: "입력해주세요" });
    },
    removeItemToCategory(state, action) {
      const newItem = action.payload;
      const find = state.items.find(
        (item) => parseInt(item.mainId) === parseInt(newItem.mainId)
      );
      find.document = find.document.filter(
        (item) => parseInt(item.categoryId) !== parseInt(newItem.categoryId)
      );
    },
  },
});

export const categoryActions = categorySlice.actions;
export default categorySlice;
