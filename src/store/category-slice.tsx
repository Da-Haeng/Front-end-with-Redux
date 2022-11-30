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
};

export type CellEdit = {
  categoryId: number;
  lineId: number;
  text: string;
  type: string;
  color: string;
  bgcolor: string;
  font: string;
  index: number;
};

export type CellAdd = {
  index: number;
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
  update: false,
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
  async (noteId: any) => {
    return await fetch("http://localhost:8080/category/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        noteId,
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
  async (category: Category) => {
    console.log(category);
    return await fetch("http://localhost:8080/category/edit-title", {
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
    return await fetch("http://localhost:8080/line/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lineindex: cell.index,
        categoryId: cell.categoryId,
      }),
    }).then((res) => res.json());
  }
);

// cell 수정
export const editCellToCategoryAsync = createAsyncThunk(
  "category/editCellToCategoryAsync",
  async (cell: CellEdit) => {
    console.log(cell);
    return await fetch("http://localhost:8080/line/update", {
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
        lineindex: cell.index,
      }),
    }).then((res) => res.json());
  }
);

// cell 삭제
export const deleteCellToCategoryAsync = createAsyncThunk(
  "category/deleteCellToCategoryAsync",
  async (cell: CellDelete) => {
    return await fetch("http://localhost:8080/line/delete", {
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
    return await fetch("http://localhost:8080/line/changetext", {
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryListAsync.fulfilled, (state, action) => {
        state.document = action.payload;
      })
      .addCase(getCellListAsync.fulfilled, (state, action) => {
        state.cell = action.payload;
        console.log("셀셀");
      })
      .addCase(addItemToCategoryAsync.fulfilled, (state, action) => {
        state.update = !state.update;
      })
      .addCase(addItemToCellAsync.fulfilled, (state, action) => {
        state.update = !state.update;
      })
      .addCase(editTitletoCategoryAsync.fulfilled, (state, action) => {
        state.update = !state.update;
      })
      .addCase(editCellToCategoryAsync.fulfilled, (state, action) => {
        state.update = !state.update;
      })
      .addCase(removeItemToCategoryAsync.fulfilled, (state, action) => {
        state.update = !state.update;
      })
      .addCase(deleteCellToCategoryAsync.fulfilled, (state, action) => {
        state.update = !state.update;
      })
      .addCase(BulletPointAsync.fulfilled, (state, action) => {
        state.update = !state.update;
      });
  },
});

export const categoryActions = categorySlice.actions;
export default categorySlice;
