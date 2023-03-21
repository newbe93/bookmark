import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { addList, changeCategory, changeTextArea, changeTitle, copyList, dragAndDrop, modeChange, reBookMark, removeList, setModal, setTab } from "../store/userSlice";
import styles from "../css/BookmarkItem.module.css";
import { useEffect, useRef, useState } from "react";

function BookmarkItem({ bookmarkList }) {
  const dragItem = useRef();
  const dragItemNode = useRef();
  const dragOverItem = useRef();
  const dragOverBox = useRef();
  const [dragging, setDragging] = useState(false);
  const [list, setList] = useState([]);
  let state = useSelector((state) => state);
  useEffect(() => {
    setList(state.bookMark);
  }, [state.bookMark]);

  let dispatch = useDispatch();
  function handleDragStart(e, item) {
    dragItemNode.current = { target: e.target, item };
    dragItem.current = item;

    setTimeout(() => {
      setDragging(true);
    }, 0);
  }
  function handleDragEnter(e, targetItem) {
    if (dragItemNode.target === e.target) return;

    setList((oldList) => {
      let newList = oldList.map((grp) => {
        const newBookmarks = grp.list.map((bookmark) => {
          return { ...bookmark };
        });
        return { ...grp, list: newBookmarks };
      });
      const draggedItemContent = newList[dragItem.current.grpI].list.splice(dragItem.current.itemI, 1)[0];
      newList[targetItem.grpI].list.splice(targetItem.itemI, 0, draggedItemContent);
      dragItem.current = targetItem;
      console.log(newList);
      return newList;
    });
  }
  function handleDragEnd(e) {
    let newlist = list.map((grp) => {
      const newBookmarks = grp.list.map((bookmark) => {
        return { ...bookmark };
      });
      return { ...grp, list: newBookmarks };
    });
    dispatch(reBookMark(newlist));

    setDragging(false);

    dragItem.current = null;
    dragItemNode.current = null;
  }

  return (
    <>
      {bookmarkList.length === 0
        ? null
        : bookmarkList.map((grp, grpI) => {
            let category = grp.category;
            return (
              <div className="col-lg-3" key={grpI}>
                <div className={styles.bookmarkItem}>
                  <div className={styles.titlebox}>
                    <p>{grp.category}</p>
                    <button
                      onClick={(e) => {
                        dispatch(setModal(true));
                        dispatch(changeCategory(grp.category));
                        dispatch(copyList([{ category: grp.category, title: "" }]));
                      }}
                    >
                      <FontAwesomeIcon icon={faEllipsis} />
                    </button>
                  </div>
                  <div className={styles.categoryList}>
                    <ul
                      onDragEnter={(e) => {
                        if (dragging && grp.list.length === 0) {
                          handleDragEnter(e, { grp, grpI, itemI: 0 });
                        } else {
                          return null;
                        }
                      }}
                    >
                      {grp.list.length === 0 ? (
                        <span>북마크가 없습니다</span>
                      ) : (
                        grp.list.map((item, itemI) => {
                          return (
                            <li
                              key={itemI}
                              className={styles.list}
                              draggable="true"
                              onDragStart={(e) => {
                                handleDragStart(e, { grp, grpI, itemI });
                              }}
                              onDragEnter={(e) => {
                                if (dragging) {
                                  handleDragEnter(e, { grp, grpI, itemI });
                                } else {
                                  return null;
                                }
                              }}
                              onDragEnd={(e) => {
                                handleDragEnd(e);
                              }}
                            >
                              <a href={item.url}>
                                <div>{item.title}</div>
                              </a>
                              <button
                                onClick={(e) => {
                                  dispatch(modeChange("edit"));
                                  dispatch(setTab("up"));
                                  dispatch(changeCategory(category));
                                  dispatch(changeTitle(item.title));
                                  dispatch(changeTextArea(item.url));
                                  console.log(category, item.title);
                                  dispatch(copyList([{ category: category, title: item.title }]));
                                }}
                              >
                                <FontAwesomeIcon icon={faEllipsis} />
                              </button>
                            </li>
                          );
                        })
                      )}
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
