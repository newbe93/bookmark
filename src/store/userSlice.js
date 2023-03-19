import { createSlice } from "@reduxjs/toolkit";

export let bookMark = createSlice({
  name: "bookMark",
  initialState: [
    // { category: "redux", list: [{ title: "redux 정의", url: "asd" }] },
    // { category: "html", list: [{ title: "html 정의", url: "fgh" }] },
  ],
  reducers: {
    addBookMark(state, action) {
      let index = state.findIndex((a) => a.category === action.payload.category);
      if (index !== -1) return;
      state.push(action.payload);
    },
    addList(state, action) {
      let index = state.findIndex((a) => a.category === action.payload.category);
      let titleIndex = state[index].list.findIndex((item) => item.title === action.payload.list.title);
      if (titleIndex !== -1) return;
      state[index].list.push(action.payload.list);
    },
    removeList(state, action) {
      let categoryIndex = state.findIndex((item) => item.category === action.payload.category);
      let titleIndex = state[categoryIndex].list.findIndex((item) => item.title === action.payload.title);
      state[categoryIndex].list.splice(titleIndex, 1);
      // if (state[categoryIndex].list.length === 0) {
      //   state.splice(categoryIndex, 1);
      // }
    },
    changeList(state, action) {
      let categoryIndex = state.findIndex((item) => item.category === action.payload.category);
      let titleIndex = state[categoryIndex].list.findIndex((item) => item.title === action.payload.title);
      state[categoryIndex].list[titleIndex].title = action.payload.newTitle;
      state[categoryIndex].list[titleIndex].url = action.payload.newUrl;
    },
    copyLocalStorage(state, action) {
      return action.payload;
    },
    editCategory(state, action) {
      let categoryIndex = state.findIndex((item) => item.category === action.payload.category);
      state[categoryIndex].category = action.payload.value;
    },
    removeCategory(state, action) {
      let categoryIndex = state.findIndex((item) => item.category === action.payload.category);
      state.splice(categoryIndex, 1);
    },
    dragAndDrop(state, action) {
      const { prevCategory, prevTitle, prevUrl, currentCategory, currentTitle, currentList } = action.payload;

      let categoryIndex = state.findIndex((item) => item.category === currentCategory);
      let titleIndex = state[categoryIndex].list.findIndex((item) => item.title === currentTitle);
      state[categoryIndex].list.splice(titleIndex, 0, { title: prevTitle, url: prevUrl });
    },
  },
});

export let { dragAndDrop, removeCategory, addBookMark, addList, removeList, changeList, copyLocalStorage, editCategory } = bookMark.actions;

export let mode = createSlice({
  name: "mode",
  initialState: "create",
  reducers: {
    modeChange(state, action) {
      return action.payload;
    },
  },
});

export let { modeChange } = mode.actions;

export let category = createSlice({
  name: "category",
  initialState: "",
  reducers: {
    changeCategory(state, action) {
      return action.payload;
    },
  },
});

export let { changeCategory } = category.actions;

export let title = createSlice({
  name: "title",
  initialState: "",
  reducers: {
    changeTitle(state, action) {
      return action.payload;
    },
  },
});

export let { changeTitle } = title.actions;

export let textArea = createSlice({
  name: "textArea",
  initialState: "",
  reducers: {
    changeTextArea(state, action) {
      return action.payload;
    },
  },
});

export let { changeTextArea } = textArea.actions;

export let prevList = createSlice({
  name: "prevList",
  initialState: [{ category: "", title: "" }],
  reducers: {
    copyList(state, action) {
      console.log(action.payload);
      return action.payload;
    },
  },
});

export let { copyList } = prevList.actions;

export let searchValue = createSlice({
  name: "searchValue",
  initialState: "",
  reducers: {
    changevalue(state, action) {
      return action.payload;
    },
  },
});

export let { changevalue } = searchValue.actions;

export let searchBookMark = createSlice({
  name: "searchBookMark",
  initialState: [],
  reducers: {
    searchList(state, action) {
      state.push({ category: action.payload.category, list: action.payload.list });
      // return action.payload;
    },
    clearList(state, action) {
      return action.payload;
    },
  },
});

export let { searchList, clearList } = searchBookMark.actions;

export let isSearch = createSlice({
  name: "isSearch",
  initialState: false,
  reducers: {
    searchMode(state, action) {
      return action.payload;
    },
  },
});

export let { searchMode } = isSearch.actions;

export let modal = createSlice({
  name: "modal",
  initialState: false,
  reducers: {
    setModal(state, action) {
      return action.payload;
    },
  },
});

export let { setModal } = modal.actions;

export let tab = createSlice({
  name: "tab",
  initialState: "open",
  reducers: {
    setTab(state, action) {
      return action.payload;
    },
  },
});

export let { setTab } = tab.actions;
