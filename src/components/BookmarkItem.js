import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { addList, changeCategory, changeTextArea, changeTitle, copyList, dragAndDrop, modeChange, removeList, setModal } from "../store/userSlice";
import styles from "../BookmarkItem.module.css";
import { useEffect, useRef, useState } from "react";

function BookmarkItem({ bookmarkList }) {
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const dragOverBox = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [empty, setEmpty] = useState(true);
  let dispatch = useDispatch();
  let state = useSelector((state) => state);
  useEffect(() => {
    dragItem.current = null;
    dragOverItem.current = null;
    dragOverBox.current = null;
  }, [state.bookMark]);
  return (
    <>
      {bookmarkList.map((grp, grpI) => {
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
                    dragOverBox.current = { grpI, itemI: 0 };
                    console.log(dragOverBox.current);
                  }}
                  onDragEnd={(e) => {
                    const dragItemgrpI = dragItem.current.grpI;
                    const dragItemlistI = dragItem.current.itemI;
                    const targetItemgrpI = dragOverBox.current.grpI;
                    const targetItemlistI = dragOverBox.current.itemI;
                    console.log(dragItemgrpI, dragItemlistI, targetItemgrpI, targetItemlistI);
                    dispatch(dragAndDrop({ dragItemgrpI, dragItemlistI, targetItemgrpI, targetItemlistI }));
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
                            dragItem.current = { grpI, itemI };
                          }}
                          onDragEnter={(e) => {
                            dragOverItem.current = { grpI, itemI };
                            console.log(dragOverItem.current);
                          }}
                          onDragEnd={(e) => {
                            const dragItemgrpI = dragItem.current.grpI;
                            const dragItemlistI = dragItem.current.itemI;
                            if (dragOverItem.current === null) return;
                            const targetItemgrpI = dragOverItem.current.grpI;
                            const targetItemlistI = dragOverItem.current.itemI;
                            console.log({ dragItemgrpI, dragItemlistI, targetItemgrpI, targetItemlistI });
                            dispatch(dragAndDrop({ dragItemgrpI, dragItemlistI, targetItemgrpI, targetItemlistI }));
                          }}
                        >
                          <a href={item.url}>
                            <div>{item.title}</div>
                          </a>
                          <button
                            onClick={(e) => {
                              dispatch(modeChange("edit"));
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
