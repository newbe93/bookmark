import { useDispatch, useSelector } from "react-redux";
import { changeCategory, changeTextArea, changeTitle, copyList, modeChange } from "../store/userSlice";

function BookmarkCategory() {
  let state = useSelector((state) => state);
  let bookmark = state.bookMark;
  let dispatch = useDispatch();
  return (
    <>
      {state.isSearch
        ? state.searchBookMark.map((a, i) => {
            let category = a.category;
            return (
              <div className="col-lg-3" key={i}>
                <div className="bookmark-item">
                  <p>{a.category}</p>
                  <div className="category-list">
                    <ul>
                      {a.list.map((a, i) => {
                        return (
                          <li key={i}>
                            <a href={a.url}>
                              <div>{a.title}</div>
                            </a>
                            <button
                              onClick={(e) => {
                                dispatch(modeChange("edit"));
                                dispatch(changeCategory(category));
                                dispatch(changeTitle(a.title));
                                dispatch(changeTextArea(a.url));
                                console.log(category, a.title);
                                dispatch(copyList([{ category: category, title: a.title }]));
                              }}
                            >
                              ...
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })
        : bookmark.map((a, i) => {
            let category = a.category;
            return (
              <div className="col-lg-3" key={i}>
                <div className="bookmark-item">
                  <p>{a.category}</p>
                  <div className="category-list">
                    <ul>
                      {a.list.map((a, i) => {
                        return (
                          <li key={i}>
                            <a href={a.url}>
                              <div>{a.title}</div>
                            </a>
                            <button
                              onClick={(e) => {
                                dispatch(modeChange("edit"));
                                dispatch(changeCategory(category));
                                dispatch(changeTitle(a.title));
                                dispatch(changeTextArea(a.url));
                                console.log(category, a.title);
                                dispatch(copyList([{ category: category, title: a.title }]));
                              }}
                            >
                              ...
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
    </>
  );
}

export default BookmarkCategory;
