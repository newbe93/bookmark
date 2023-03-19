import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { addList, changeCategory, changeTextArea, changeTitle, copyList, dragAndDrop, modeChange, removeList, setModal } from "../store/userSlice";
import styles from "../BookmarkItem.module.css";
import { useRef, useState } from "react";

function BookmarkItem({ bookmarkList }) {
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const dragOverBox = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [empty, setEmpty] = useState(true);
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
              <div className={styles.categoryList}>
                <ul
                  // onDragOver={(e) => {
                  //   e.preventDefault();
                  // }}
                  onDragEnter={(e) => {
                    dragOverBox.current = { currentList: category };
                  }}
                >
                  {a.list.map((a, i) => {
                    return (
                      <li
                        key={i}
                        className={styles.list}
                        draggable="true"
                        onDragStart={(e) => {
                          dragItem.current = { prevCategory: category, prevTitle: a.title, prevUrl: a.url };
                          console.log(dragItem.current);
                        }}
                        onDragEnter={(e) => {
                          dragOverItem.current = { currentCategory: category, currentTitle: a.title };
                        }}
                        onDragEnd={(e) => {
                          const { prevCategory, prevTitle, prevUrl } = dragItem.current;
                          const { currentCategory, currentTitle } = dragOverItem.current;
                          const { currentList } = dragOverBox.current;
                          console.log(prevCategory, prevTitle, currentCategory, currentTitle, currentList);
                          console.log(empty);
                          if (prevCategory !== currentList) {
                            // 다른 카테고리에 넣었을때
                            if (prevTitle === currentTitle) {
                              // 빈곳에 놨을때
                              dispatch(removeList({ category: prevCategory, title: prevTitle }));
                              dispatch(addList({ category: currentList, list: { title: prevTitle, url: prevUrl } }));
                            } else {
                              // 북마크 위에 놨을때
                              dispatch(removeList({ category: prevCategory, title: prevTitle }));
                              dispatch(dragAndDrop({ prevCategory, prevTitle, prevUrl, currentCategory, currentTitle, currentList }));
                            }
                          } else {
                            // 같은 카테고리 넣었을때
                            // 다른 북마크 위에 놨을때
                            if (prevTitle !== currentTitle) {
                              dispatch(removeList({ category: prevCategory, title: prevTitle }));
                              dispatch(dragAndDrop({ prevCategory, prevTitle, prevUrl, currentCategory, currentTitle, currentList }));
                            } else {
                              // 같은 카토고리안에서 맨 뒤로(빈공간에) 넣었을때
                              dispatch(removeList({ category: prevCategory, title: prevTitle }));
                              dispatch(addList({ category: currentList, list: { title: prevTitle, url: prevUrl } }));
                            }
                          }
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
