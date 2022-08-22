import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./main-slice";
import mainEditSlice from "./mainEdit-slice";
import categorySlice from "./category-slice";
import todoListSlice from "./todoList-slice";

const store = configureStore({
  reducer: {
    main: mainSlice.reducer,
    mainEdit: mainEditSlice.reducer,
    category: categorySlice.reducer,
    todoList: todoListSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
