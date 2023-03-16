import { useDispatch, useSelector } from "react-redux";
import { changevalue, clearList, isSearch, searchList, searchMode } from "../store/userSlice";
import BookmarkCategory from "./BookmarkCategory";

function MainContent() {
  let dispatch = useDispatch();
  let state = useSelector((state) => state);
  return (
    <div className="main-content">
      <button className="side-bar-button">열림</button>
      <div className="container">
        <h2>MarkCart</h2>
        <div>
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
            찾기
          </button>
        </div>
        <div className="bookmark-area">
          <div className="row">
            <BookmarkCategory></BookmarkCategory>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
