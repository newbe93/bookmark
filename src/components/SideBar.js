import { createAsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBookMark, addList, changeCategory, changeList, changeTextArea, changeTitle, clearList, copyList, modeChange, removeList, searchList, searchMode } from "../store/userSlice";
import { Searchrender } from "./MainContent";
import styles from "../SideBar.module.css";

function SideBar() {
  let dispatch = useDispatch();
  let state = useSelector((state) => state);

  useEffect(() => {
    if (state.isSearch) {
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
    }
  }, [state.bookMark]);
  let options = state.bookMark;
  function clearAll() {
    dispatch(changeCategory(""));
    dispatch(changeTitle(""));
    dispatch(changeTextArea(""));
  }
  function btnHandle() {
    if (state.mode === "create") {
      if (state.category === "" || state.title === "" || state.textArea === "") return;
      dispatch(addBookMark({ category: state.category, list: [{ title: state.title, url: state.textArea }] }));
      clearAll();
    } else {
      if (state.category === "" || state.title === "" || state.textArea === "") return;
      dispatch(addList({ category: state.category, list: { title: state.title, url: state.textArea } }));
      localStorage.setItem("bookMark", JSON.stringify(state.bookMark));
      dispatch(changeTitle(""));
      dispatch(changeTextArea(""));
    }
  }

  return (
    <div className={`${styles.sideBar} ${state.tab === "close" ? styles.close : ""}`}>
      <div className={styles.container}>
        <h5 className={styles.sideBarTitle}>북마크 추가하기</h5>
        <select
          onChange={(e) => {
            clearAll();
            if (e.target.value === "") {
              dispatch(modeChange("create"));
            } else {
              dispatch(modeChange("add"));
              dispatch(changeCategory(e.target.value));
            }
          }}
        >
          <option value="">카테고리를 추가하세요.</option>
          {options.map((a, i) => {
            if (state.mode === "create") {
              return (
                <option key={i} value={a.category}>
                  {a.category}
                </option>
              );
            }
            if (a.category === state.category) {
              return (
                <option key={i} value={a.category} selected="selected">
                  {a.category}
                </option>
              );
            } else {
              return (
                <option key={i} value={a.category}>
                  {a.category}
                </option>
              );
            }
          })}
        </select>
        {state.mode === "create" ? (
          <input
            placeholder="Category"
            onChange={(e) => {
              dispatch(changeCategory(e.target.value));
            }}
            value={state.category}
          ></input>
        ) : null}
        <input
          placeholder="Title"
          onChange={(e) => {
            dispatch(changeTitle(e.target.value));
          }}
          value={state.title}
        ></input>
        <textarea
          rows="5"
          placeholder="url"
          onChange={(e) => {
            dispatch(changeTextArea(e.target.value));
          }}
          value={state.textArea}
        ></textarea>
        {
          {
            create: (
              <button
                onClick={() => {
                  btnHandle();
                }}
              >
                추가
              </button>
            ),
            add: (
              <button
                onClick={() => {
                  btnHandle();
                }}
              >
                추가
              </button>
            ),
            edit: (
              <div className={styles.editBox}>
                <button
                  onClick={(e) => {
                    dispatch(removeList({ category: state.category, title: state.title }));
                    dispatch(modeChange("create"));
                    clearAll();
                  }}
                >
                  삭제
                </button>
                <button
                  onClick={() => {
                    console.log(state.title);
                    dispatch(changeList({ category: state.prevList[0].category, title: state.prevList[0].title, newTitle: state.title, newUrl: state.textArea }));
                    dispatch(copyList([{ category: state.category, title: state.title }]));
                    localStorage.setItem("bookMark", JSON.stringify(state.bookMark));
                    dispatch(modeChange("create"));
                    clearAll();
                  }}
                >
                  수정
                </button>
              </div>
            ),
          }[state.mode]
        }
      </div>
    </div>
  );
}

export default SideBar;
