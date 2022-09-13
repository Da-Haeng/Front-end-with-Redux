import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";

export type Cell = {
  id: number;
  text: string;
  type: string;
  color: string;
  bgcolor: string;
  font: string;
};

export type Document = {
  categoryId: number;
  categoryTitle: string;
  cell: Cell[];
};

export type Item = {
  mainId: number;
  document: Document[];
};

export type MemoDataState = Item[];

const MemoDataInitialState: MemoDataState = [
  {
    mainId: 1,
    document: [
      {
        categoryId: 1,
        categoryTitle: "DAY1",
        cell: [
          {
            id: 1,
            text: "아침",
            type: "h1",
            color: "black",
            bgcolor: "basicbg",
            font: "bold",
          },
          {
            id: 2,
            text: "모닝 조깅 후 조식 먹기╰(*°▽°*)",
            type: "h3",
            color: "black",
            bgcolor: "purple_bg",
            font: "basic",
          },
          {
            id: 3,
            text: "먹은 다음에 바로 커피 마시러 호텔 앞 카페로~╯",
            type: "h3",
            color: "black",
            bgcolor: "yellow_bg",
            font: "basic",
          },
          {
            id: 4,
            text: "",
            type: "h3",
            color: "black",
            bgcolor: "basicbg",
            font: "basic",
          },
          {
            id: 5,
            text: "해녀라면 꿀떡",
            type: "h3",
            color: "black",
            bgcolor: "basicbg",
            font: "basic",
          },
        ],
      },
      {
        categoryId: 2,
        categoryTitle: "DAY2",
        cell: [
          {
            id: 1,
            text: "하이!",
            type: "h2",
            color: "black",
            bgcolor: "basicbg",
            font: "bold",
          },
          {
            id: 2,
            text: "방가",
            type: "h1",
            color: "black",
            bgcolor: "green_bg",
            font: "bold",
          },
        ],
      },
      {
        categoryId: 3,
        categoryTitle: "DAY3",
        cell: [
          {
            id: 1,
            text: "안녕하세요3!",
            type: "h2",
            color: "black",
            bgcolor: "yellow_bg",
            font: "bold",
          },
          {
            id: 2,
            text: "방가3",
            type: "h3",
            color: "black",
            bgcolor: "yellow_bg",
            font: "basic",
          },
        ],
      },
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
            bgcolor: "yellow_bg",
            font: "basic",
          },
          {
            id: 2,
            text: "일단 공항 근처에서 점심먹기22 - 돼지국밥!",
            type: "h2",
            color: "black",
            bgcolor: "yellow_bg",
            font: "basic",
          },
        ],
      },
      {
        categoryId: 2,
        categoryTitle: "DAY2 두번째",
        cell: [
          {
            id: 1,
            text: "후하2!",
            type: "h2",
            color: "black",
            bgcolor: "yellow_bg",
            font: "italic",
          },
          {
            id: 2,
            text: "음하하2!",
            type: "h2",
            color: "black",
            bgcolor: "yellow_bg",
            font: "italic",
          },
        ],
      },
      {
        categoryId: 3,
        categoryTitle: "DAY3 두번째",
        cell: [
          {
            id: 1,
            text: "후하3!",
            type: "h2",
            color: "black",
            bgcolor: "yellow_bg",
            font: "bold",
          },
          {
            id: 2,
            text: "음하하3!",
            type: "h2",
            color: "black",
            bgcolor: "yellow_bg",
            font: "bold",
          },
        ],
      },
    ],
  },
  {
    mainId: 3,
    document: [
      // { id: 1, cell: [] },
      // { id: 2, cell: [] },
    ],
  },
];

const categorySlice = createSlice({
  name: "category",
  initialState: { items: MemoDataInitialState },
  reducers: {
    // addItemToCategory(state, action) {
    //   const newItem = action.payload;
    //   return produce(state, (draft) => {
    //     const find = draft.items.find(
    //       (item) => parseInt(item.mainId) === parseInt(newItem.id)
    //     );
    //     find.document.push({
    //       categoryId: newItem.categoryId,
    //       categoryTitle: newItem.categoryTitle,
    //       cell: [],
    //     });
    //   });
    addItemToCategory: (
      state,
      {
        payload,
      }: PayloadAction<{
        categoryId: number;
        categoryTitle: string;
        mainId: number;
      }>
    ) => {
      const newItem = payload;
      return produce(state, (draft) => {
        const find = draft.items.find((item) => item.mainId === newItem.mainId);
        if (find) {
          find.document.push({
            categoryId: newItem.categoryId,
            categoryTitle: newItem.categoryTitle,
            cell: [
              {
                id: 1,
                text: "입력해주세요",
                type: "h3",
                color: "black",
                bgcolor: "basicbg",
                font: "basic",
              },
            ],
          });
        }
      });
    },
    addCellToCategory: (
      state,
      {
        payload,
      }: PayloadAction<{
        index: any;
        id: number;
        categoryId: number;
        mainId: number;
        text: string;
      }>
    ) => {
      return produce(state, (draft) => {
        const newItem = payload;
        const find = draft.items.find((item) => item.mainId === newItem.mainId);
        const category = find?.document.find(
          (item) => item.categoryId === newItem.categoryId
        );

        if (category) {
          category.cell.splice(newItem.index + 1, 0, {
            id: newItem.id,
            text: newItem.text,
            type: "h3",
            color: "black",
            bgcolor: "basicbg",
            font: "basic",
          });
        }
      });
    },
    editCellToCategory: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: number;
        text: string;
        categoryId: number;
        mainId: number;
      }>
    ) => {
      return produce(state, (draft) => {
        const newItem = payload;

        const find = draft.items.find((item) => item.mainId === newItem.mainId);
        const category = find?.document.find(
          (item) => item.categoryId === newItem.categoryId
        );

        const cell = category?.cell.find((item) => item.id === newItem.id);
        if (cell) {
          cell.text = newItem.text;
        }
      });
    },
    StyleSizeToCategory: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: number;
        style: string;
        categoryId: number;
        mainId: number;
      }>
    ) => {
      return produce(state, (draft) => {
        const newItem = payload;

        const find = draft.items.find((item) => item.mainId === newItem.mainId);
        const category = find?.document.find(
          (item) => item.categoryId === newItem.categoryId
        );
        const cell = category?.cell.find((item) => item.id === newItem.id);
        if (cell) {
          cell.type = newItem.style;
        }
      });
    },
    StyleColorToCategory: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: number;
        style: string;
        categoryId: number;
        mainId: number;
      }>
    ) => {
      return produce(state, (draft) => {
        const newItem = payload;

        const find = draft.items.find((item) => item.mainId === newItem.mainId);
        const category = find?.document.find(
          (item) => item.categoryId === newItem.categoryId
        );
        const cell = category?.cell.find((item) => item.id === newItem.id);
        if (cell) {
          cell.color = newItem.style;
        }
      });
    },
    StyleBgColorToCategory: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: number;
        style: string;
        categoryId: number;
        mainId: number;
      }>
    ) => {
      return produce(state, (draft) => {
        const newItem = payload;

        const find = draft.items.find((item) => item.mainId === newItem.mainId);
        const category = find?.document.find(
          (item) => item.categoryId === newItem.categoryId
        );
        const cell = category?.cell.find((item) => item.id === newItem.id);
        if (cell) {
          cell.bgcolor = newItem.style;
        }
      });
    },
    StyleFontToCategory: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: number;
        style: string;
        categoryId: number;
        mainId: number;
      }>
    ) => {
      return produce(state, (draft) => {
        const newItem = payload;

        const find = draft.items.find((item) => item.mainId === newItem.mainId);
        const category = find?.document.find(
          (item) => item.categoryId === newItem.categoryId
        );
        const cell = category?.cell.find((item) => item.id === newItem.id);
        if (cell) {
          cell.font = newItem.style;
        }
      });
    },
    removeItemToCateogory: (
      state,
      {
        payload,
      }: PayloadAction<{
        categoryId: number;
        mainId: number;
      }>
    ) => {
      return produce(state, (draft) => {
        const newItem = payload;

        const find = draft.items.find((item) => item.mainId === newItem.mainId);
        if (find) {
          find.document = find.document.filter(
            (item) => item.categoryId !== newItem.categoryId
          );
        }
      });
    },
  },
});

export const categoryActions = categorySlice.actions;
export default categorySlice;
