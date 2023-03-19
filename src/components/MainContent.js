import { useDispatch, useSelector } from "react-redux";
import { changevalue, clearList, isSearch, searchList, searchMode, setTab } from "../store/userSlice";
import BookmarkCategory from "./BookmarkCategory";
import styles from "../MainContent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
function MainContent() {
  let dispatch = useDispatch();
  let state = useSelector((state) => state);

  return (
    <div className={styles.mainContent}>
      <button
        className={`${styles.sideBarButton} ${state.tab === "close" ? styles.close : ""}`}
        onClick={() => {
          if (state.tab === "close") {
            dispatch(setTab("open"));
          } else {
            dispatch(setTab("close"));
          }
        }}
      >
        <FontAwesomeIcon icon={faCaretRight} />
      </button>
      <div className={styles.container}>
        <h2>MarkCart</h2>
        <div className={styles.searchBarBox}>
          <input
            placeholder="북마크 찾기"
            onChange={(e) => {
              dispatch(changevalue(e.target.value));
              dispatch(searchMode(false));
            }}
          ></input>
          <button
            onClick={() => {
              dispatch(clearList([]));
              let searchCategory = state.bookMark.filter((a, i) => {
                let result = a.list.findIndex((a) => {
                  return a.title.includes(state.searchValue);
                });

                return result !== -1;
              });

              searchCategory.map((a) => {
                let searchTitle = a.list.filter((a, i) => {
                  return a.title.includes(state.searchValue);
                });
                dispatch(searchList({ category: a.category, list: searchTitle }));
              });

              dispatch(searchMode(true));
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <div className={styles.bookmarkArea}>
          <div className="row">
            <BookmarkCategory></BookmarkCategory>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
