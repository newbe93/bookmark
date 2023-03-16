import "./App.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./components/NavBar";
import MainSection from "./components/MainSection";
import { useDispatch, useSelector } from "react-redux";
import { copyLocalStorage } from "./store/userSlice";

function App() {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("bookMark"))?.length === undefined) {
      localStorage.setItem("bookMark", JSON.stringify([]));
    } else if (JSON.parse(localStorage.getItem("bookMark"))?.length !== 0) {
      dispatch(copyLocalStorage(JSON.parse(localStorage.getItem("bookMark"))));
      return;
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("bookMark", JSON.stringify(state.bookMark));
  }, [state.bookMark]);
  return (
    <div className="App">
      <NavBar></NavBar>
      <MainSection></MainSection>
    </div>
  );
}

export default App;
