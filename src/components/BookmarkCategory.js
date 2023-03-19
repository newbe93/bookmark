import { useDispatch, useSelector } from "react-redux";
import { changeCategory, copyList, editCategory, removeCategory, setModal } from "../store/userSlice";
import styles from "../BookmarkCategory.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import BookmarkItem from "./BookmarkItem";
function BookmarkCategory() {
  let state = useSelector((state) => state);
  let bookmark = state.bookMark;
  let dispatch = useDispatch();
  return <>{state.isSearch ? <BookmarkItem bookmarkList={state.searchBookMark} /> : <BookmarkItem bookmarkList={bookmark} />}</>;
}

export default BookmarkCategory;
