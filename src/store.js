import { configureStore } from "@reduxjs/toolkit";
import { bookMark, category, isSearch, modal, mode, prevList, searchBookMark, searchValue, tab, textArea, title } from "./store/userSlice";

export default configureStore({
  reducer: {
    bookMark: bookMark.reducer,
    mode: mode.reducer,
    category: category.reducer,
    title: title.reducer,
    textArea: textArea.reducer,
    prevList: prevList.reducer,
    searchValue: searchValue.reducer,
    searchBookMark: searchBookMark.reducer,
    isSearch: isSearch.reducer,
    modal: modal.reducer,
    tab: tab.reducer,
  },
});
