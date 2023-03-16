import { useDispatch, useSelector } from "react-redux";
import { changevalue, isSearch, searchList, searchMode } from "../store/userSlice";
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
            }}
          ></input>
          <button
            onClick={() => {
              state.bookMark.map((a, i) => {
                // bookMark 중에서 list중에서 title이 inputvalue를 갖고있는 list들
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
