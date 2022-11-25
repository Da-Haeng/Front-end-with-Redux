import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import produce from "immer";

export type Cell = {
  lineId: number;
  text: string;
  type: string;
  color: string;
  bgcolor: string;
  font: string;
};

export type Document = [
  {
    categoryId: number;
    categoryName: string;
    noteId: number;
  }
];

export type CellItem = {
  cell: Cell[];
};

export type Item = {
  noteId: number;
  document: Document[];
};

export type Category = {
  categoryId: number;
  categoryName: string;
  lineId: number;
  text: string;
  type: string;
  color: string;
  bgcolor: string;
  font: string;
};

export type CategoryTitle = {
  categoryId: number;
  categoryName: string;
};

export type CellEdit = {
  categoryId: number;
  lineId: number;
  text: string;
  type: string;
  color: string;
  bgcolor: string;
  font: string;
};

export type CellAdd = {
  index: number;
  lineId: number;
  categoryId: number;
};

export type CellDelete = {
  lineId: number;
  categoryId: number;
};

export type BulletAdd = {
  lineId: number;
  categoryId: number;
  text: string;
};

const initialState = {
  document: [],
  cell: [],
};

export type CategoryState = Document[];

const CategoryDataInitialState: CategoryState = [
  // {
  //   noteId: 1,
  //   document: [
  //     {
  //       categoryId: 1,
  //       categoryTitle: "DAY1",
  //       cell: [
  //         {
  //           id: 1,
  //           text: "아침",
  //           type: "h1",
  //           color: "black",
  //           bgcolor: "basicbg",
  //           font: "bold",
  //         },
  //         {
  //           id: 2,
  //           text: "모닝 조깅 후 조식 먹기╰(*°▽°*)",
  //           type: "h3",
  //           color: "black",
  //           bgcolor: "purple_bg",
  //           font: "basic",
  //         },
  //         {
  //           id: 3,
  //           text: "먹은 다음에 바로 커피 마시러 호텔 앞 카페로~╯",
  //           type: "h3",
  //           color: "black",
  //           bgcolor: "yellow_bg",
  //           font: "basic",
  //         },
  //         {
  //           id: 4,
  //           text: "해녀라면 꿀떡",
  //           type: "h3",
  //           color: "black",
  //           bgcolor: "basicbg",
  //           font: "basic",
  //         },
  //       ],
  //     },
  //     {
  //       categoryId: 2,
  //       categoryTitle: "DAY2",
  //       cell: [
  //         {
  //           id: 1,
  //           text: "하이!",
  //           type: "h2",
  //           color: "black",
  //           bgcolor: "basicbg",
  //           font: "bold",
  //         },
  //         {
  //           id: 2,
  //           text: "방가",
  //           type: "h1",
  //           color: "black",
  //           bgcolor: "green_bg",
  //           font: "bold",
  //         },
  //       ],
  //     },
  //     {
  //       categoryId: 3,
  //       categoryTitle: "DAY3",
  //       cell: [
  //         {
  //           id: 1,
  //           text: "안녕하세요3!",
  //           type: "h2",
  //           color: "black",
  //           bgcolor: "yellow_bg",
  //           font: "bold",
  //         },
  //         {
  //           id: 2,
  //           text: "방가3",
  //           type: "h3",
  //           color: "black",
  //           bgcolor: "yellow_bg",
  //           font: "basic",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   noteId: 2,
  //   document: [
  //     {
  //       categoryId: 1,
  //       categoryTitle: "DAY1 두번째",
  //       cell: [
  //         {
  //           id: 1,
  //           text: "협재로 가서 숙소 체크인22!",
  //           type: "h2",
  //           color: "black",
  //           bgcolor: "yellow_bg",
  //           font: "basic",
  //         },
  //         {
  //           id: 2,
  //           text: "일단 공항 근처에서 점심먹기22 - 돼지국밥!",
  //           type: "h2",
  //           color: "black",
  //           bgcolor: "yellow_bg",
  //           font: "basic",
  //         },
  //       ],
  //     },
  //     {
  //       categoryId: 2,
  //       categoryTitle: "DAY2 두번째",
  //       cell: [
  //         {
  //           id: 1,
  //           text: "후하2!",
  //           type: "h2",
  //           color: "black",
  //           bgcolor: "yellow_bg",
  //           font: "italic",
  //         },
  //         {
  //           id: 2,
  //           text: "음하하2!",
  //           type: "h2",
  //           color: "black",
  //           bgcolor: "yellow_bg",
  //           font: "italic",
  //         },
  //       ],
  //     },
  //     {
  //       categoryId: 3,
  //       categoryTitle: "DAY3 두번째",
  //       cell: [
  //         {
  //           id: 1,
  //           text: "후하3!",
  //           type: "h2",
  //           color: "black",
  //           bgcolor: "yellow_bg",
  //           font: "bold",
  //         },
  //         {
  //           id: 2,
  //           text: "음하하3!",
  //           type: "h2",
  //           color: "black",
  //           bgcolor: "yellow_bg",
  //           font: "bold",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   noteId: 3,
  //   document: [
  //     // { id: 1, cell: [] },
  //     // { id: 2, cell: [] },
  //   ],
  // },
];

// category 데이터 조회
export const getCategoryListAsync = createAsyncThunk(
  "category/getCategoryListAsync",
  async (noteId: number) => {
    return await fetch("http://localhost:8080/category/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        noteId: noteId,
      }),
    }).then((res) => res.json());
  }
);

// cell 데이터 조회
export const getCellListAsync = createAsyncThunk(
  "category/getCellListAsync",
  async (categoryId: number) => {
    return await fetch("http://localhost:8080/category/getwithcell", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryId: categoryId,
      }),
    }).then((res) => res.json());
  }
);

// category 추가
export const addItemToCategoryAsync = createAsyncThunk(
  "category/addItemToCategoryAsync",
  async (category: Category) => {
    return await fetch("http://localhost:8080/category/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryId: category.categoryId,
        categoryName: category.categoryName,
        lineId: category.lineId,
        text: category.text,
        type: category.type,
        color: category.color,
        bgcolor: category.bgcolor,
        font: category.font,
      }),
    }).then((res) => res.json());
  }
);

// category 삭제
export const removeItemToCategoryAsync = createAsyncThunk(
  "category/removeItemToCategoryAsync",
  async (categoryId: number) => {
    return await fetch("http://localhost:8080/category/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryId,
      }),
    }).then((res) => res.json());
  }
);

// category 타이틀 수정
export const editTitletoCategoryAsync = createAsyncThunk(
  "category/editTitletoCategoryAsync",
  async (category: CategoryTitle) => {
    return await fetch("http://localhost:8080/category/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryId: category.categoryId,
        categoryName: category.categoryName,
      }),
    }).then((res) => res.json());
  }
);

// cell 추가
export const addItemToCellAsync = createAsyncThunk(
  "category/addItemToCellAsync",
  async (cell: CellAdd) => {
    return await fetch("http://localhost:8080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        index: cell.index,
        lineId: cell.lineId,
        categoryId: cell.categoryId,
      }),
    }).then((res) => res.json());
  }
);

// cell 수정
export const editCellToCategoryAsync = createAsyncThunk(
  "category/editCellToCategoryAsync",
  async (cell: CellEdit) => {
    return await fetch("http://localhost:8080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryId: cell.categoryId,
        lineId: cell.lineId,
        text: cell.text,
        type: cell.type,
        color: cell.color,
        bgcolor: cell.bgcolor,
        font: cell.font,
      }),
    }).then((res) => res.json());
  }
);

// cell 삭제
export const deleteCellToCategoryAsync = createAsyncThunk(
  "category/deleteCellToCategoryAsync",
  async (cell: CellDelete) => {
    return await fetch("http://localhost:8080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryId: cell.categoryId,
        lineId: cell.lineId,
      }),
    }).then((res) => res.json());
  }
);

// cell 글머리 추가
export const BulletPointAsync = createAsyncThunk(
  "category/BulletPointAsync",
  async (cell: BulletAdd) => {
    return await fetch("http://localhost:8080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryId: cell.categoryId,
        lineId: cell.lineId,
        text: cell.text,
      }),
    }).then((res) => res.json());
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    // addItemToCategory: (
    //   state,
    //   {
    //     payload,
    //   }: PayloadAction<{
    //     categoryId: number;
    //     categoryTitle: string;
    //     mainId: number;
    //   }>
    // ) => {
    //   const newItem = payload;
    //   return produce(state, (draft) => {
    //     const find = draft.items.find((item) => item.noteId === newItem.mainId);
    //     if (find) {
    //       find.document.push({
    //         categoryId: newItem.categoryId,
    //         categoryTitle: newItem.categoryTitle,
    //         cell: [
    //           {
    //             id: 1,
    //             text: "입력해주세요",
    //             type: "h3",
    //             color: "black",
    //             bgcolor: "basicbg",
    //             font: "basic",
    //           },
    //         ],
    //       });
    //     }
    //   });
    // },
    // addCellToCategory: (
    //   state,
    //   {
    //     payload,
    //   }: PayloadAction<{
    //     index: any;
    //     id: number;
    //     categoryId: number;
    //     mainId: number;
    //   }>
    // ) => {
    //   return produce(state, (draft) => {
    //     const newItem = payload;
    //     const find = draft.items.find((item) => item.noteId === newItem.mainId);
    //     const category = find?.document.find(
    //       (item) => item.categoryId === newItem.categoryId
    //     );
    //     if (category) {
    //       category.cell.splice(newItem.index + 1, 0, {
    //         id: newItem.id,
    //         text: "입력해주세요",
    //         type: "h3",
    //         color: "black",
    //         bgcolor: "basicbg",
    //         font: "basic",
    //       });
    //     }
    //   });
    // },
    // editCellToCategory: (
    //   state,
    //   {
    //     payload,
    //   }: PayloadAction<{
    //     id: number;
    //     text: string;
    //     categoryId: number;
    //     mainId: number;
    //     type: string;
    //     color: string;
    //     bgcolor: string;
    //     font: string;
    //   }>
    // ) => {
    //   return produce(state, (draft) => {
    //     const newItem = payload;
    //     const find = draft.items.find((item) => item.noteId === newItem.mainId);
    //     const category = find?.document.find(
    //       (item) => item.categoryId === newItem.categoryId
    //     );
    //     const cell = category?.cell.find((item) => item.id === newItem.id);
    //     if (cell) {
    //       cell.text = newItem.text;
    //       cell.type = newItem.type;
    //       cell.color = newItem.color;
    //       cell.bgcolor = newItem.bgcolor;
    //       cell.font = newItem.font;
    //     }
    //   });
    // },
    // bulletPointToCell: (
    //   state,
    //   {
    //     payload,
    //   }: PayloadAction<{
    //     id: number;
    //     categoryId: number;
    //     mainId: number;
    //   }>
    // ) => {
    //   return produce(state, (draft) => {
    //     const newItem = payload;
    //     const find = draft.items.find((item) => item.noteId === newItem.mainId);
    //     const category = find?.document.find(
    //       (item) => item.categoryId === newItem.categoryId
    //     );
    //     const cell = category?.cell.find((item) => item.id === newItem.id);
    //     if (cell) {
    //       cell.text = "• ".concat(cell.text);
    //     }
    //   });
    // },
    // deleteCellToCategory: (
    //   state,
    //   {
    //     payload,
    //   }: PayloadAction<{
    //     id: number;
    //     categoryId: number;
    //     mainId: number;
    //   }>
    // ) => {
    //   return produce(state, (draft) => {
    //     const newItem = payload;
    //     const find = draft.items.find((item) => item.noteId === newItem.mainId);
    //     const category = find?.document.find(
    //       (item) => item.categoryId === newItem.categoryId
    //     );
    //     if (category) {
    //       category.cell = category.cell.filter(
    //         (item) => item.id !== newItem.id
    //       );
    //     }
    //   });
    // },
    // removeItemToCategory: (
    //   state,
    //   {
    //     payload,
    //   }: PayloadAction<{
    //     categoryId: number;
    //     mainId: number;
    //   }>
    // ) => {
    //   return produce(state, (draft) => {
    //     const newItem = payload;
    //     const find = draft.items.find((item) => item.noteId === newItem.mainId);
    //     if (find) {
    //       find.document = find.document.filter(
    //         (item) => item.categoryId !== newItem.categoryId
    //       );
    //     }
    //   });
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryListAsync.fulfilled, (state, action) => {
        state.document = action.payload;
        console.log(action.payload);
      })
      .addCase(getCellListAsync.fulfilled, (state, action) => {
        state.cell = action.payload;
        console.log(action.payload);
      });
  },
});
export const categoryActions = categorySlice.actions;
export default categorySlice;
