import MainContent from "./MainContent";
import SideBar from "./SideBar";
import styles from "../MainSection.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory, copyList, editCategory, removeCategory, setModal } from "../store/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function MainSection() {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  return (
    <div className={styles.mainSection}>
      {state.modal ? (
        <div className={styles.modalBg}>
          <div className={styles.modal}>
            <button
              onClick={() => {
                dispatch(setModal(false));
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <p>카테고리 제목 수정 및 카테고리 삭제</p>
            <div>
              <input
                value={state.category}
                onChange={(e) => {
                  dispatch(changeCategory(e.target.value));
                }}
              ></input>
              <button
                onClick={(e) => {
                  dispatch(editCategory({ category: state.prevList[0].category, value: state.category }));
                  dispatch(copyList([{ category: state.category, title: "" }]));
                  dispatch(setModal(false));
                }}
              >
                카테고리 수정
              </button>
              <button
                onClick={() => {
                  dispatch(removeCategory({ category: state.category }));
                  dispatch(setModal(false));
                }}
              >
                카테고리 삭제
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <SideBar></SideBar>
      <MainContent></MainContent>
    </div>
  );
}

export default MainSection;
