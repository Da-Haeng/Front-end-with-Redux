import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Todo = {
    id: number,
    text: string,
    isDone: boolean
}

let nextId = 1;

export type TodosState = Todo[];

const TodosInitialState: TodosState = [
    {
        id: 1,
        text: '리덕스 뿌시기',
        isDone: false
    },
];

const todoListSlice = createSlice({
    name: 'todoList',
    initialState: TodosInitialState,
    reducers : {
        create : (state, { payload }: PayloadAction<{text: string}>) => {
            nextId++;
            state.push({id: nextId, text: payload.text, isDone: false});
        },
        edit : (state, { payload } : PayloadAction<{id: number; text: string;}>) => {
            const todoToEdit = state.find(todo => todo.id === payload.id);
            if (todoToEdit) todoToEdit.text = payload.text;
        },
        toggle : (state, { payload }: PayloadAction<{id: Number;}>) => {
            const todoToEdit = state.find(todo => todo.id === payload.id);
            if(todoToEdit) todoToEdit.isDone = !todoToEdit.isDone;
        },
        remove : (state, { payload }:PayloadAction<{ id : number; }> ) =>{
            state = state.filter(todo => todo.id !== payload.id);
        },
    },
});

export const todoListActions = todoListSlice.actions;
export default todoListSlice;