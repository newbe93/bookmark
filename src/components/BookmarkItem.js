import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory, changeTextArea, changeTitle, copyList, modeChange, setModal } from "../store/userSlice";
import styles from "../BookmarkItem.module.css";

function BookmarkItem({ bookmarkList }) {
  let dispatch = useDispatch();
  return (
    <>
      {bookmarkList.map((a, i) => {
        let category = a.category;
        return (
          <div className="col-lg-3" key={i}>
            <div className={styles.bookmarkItem}>
              <div className={styles.titlebox}>
                <p>{a.category}</p>
                <button
                  onClick={(e) => {
                    dispatch(setModal(true));
                    dispatch(changeCategory(a.category));
                    dispatch(copyList([{ category: a.category, title: "" }]));
                  }}
                >
                  <FontAwesomeIcon icon={faEllipsis} />
                </button>
              </div>
              <div
                className={styles.categoryList}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={(e) => {
                  let data = JSON.parse(e.dataTransfer.getData("data"));
                  console.log(data);
                }}
              >
                <ul>
                  {a.list.map((a, i) => {
                    return (
                      <li
                        key={i}
                        className={styles.list}
                        draggable="true"
                        onDragStart={(e) => {
                          e.dataTransfer.setData("data", JSON.stringify({ category: category, title: a.title }));
                          console.log("tlwkr");
                        }}
                      >
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
                          <FontAwesomeIcon icon={faEllipsis} />
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

export default BookmarkItem;
