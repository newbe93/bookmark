import { configureStore } from "@reduxjs/toolkit";
import { bookMark, category, isSearch, mode, prevList, searchBookMark, searchValue, textArea, title } from "./store/userSlice";

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
  },
});
