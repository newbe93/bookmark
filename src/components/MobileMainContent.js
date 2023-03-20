import { useDispatch, useSelector } from "react-redux";
import { changevalue, clearList, isSearch, searchList, searchMode, setTab } from "../store/userSlice";
import BookmarkCategory from "./BookmarkCategory";
import styles from "../MobileMainContent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCirclePlus, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import MobileSideBar from "./MobileSideBar";
function MobileMainContent() {
  let dispatch = useDispatch();
  let state = useSelector((state) => state);
  useEffect(() => {
    dispatch(setTab("down"));
  }, []);
  return (
    <>
      <div className={styles.mainContent}>
        <button
          className={`${styles.sideBarButton} ${state.tab === "up" ? styles.close : ""}`}
          onClick={() => {
            if (state.tab === "down") {
              dispatch(setTab("up"));
            } else {
              dispatch(setTab("down"));
            }
          }}
        >
          <FontAwesomeIcon icon={faCirclePlus} />
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
      <MobileSideBar></MobileSideBar>
    </>
  );
}

export default MobileMainContent;
