import "./App.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./components/NavBar";
import MainSection from "./components/MainSection";
import { useDispatch, useSelector } from "react-redux";
import { copyLocalStorage } from "./store/userSlice";
import { useMediaQuery } from "react-responsive";
import MobileMainSection from "./components/MobileMainSection";

function App() {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  const isPC = useMediaQuery({
    query: "(min-width:768px)",
  });
  const ismobile = useMediaQuery({
    query: "(max-width:768px)",
  });
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("bookMark"))?.length === undefined) {
      localStorage.setItem("bookMark", JSON.stringify([]));
    } else if (JSON.parse(localStorage.getItem("bookMark"))?.length !== 0) {
      dispatch(copyLocalStorage(JSON.parse(localStorage.getItem("bookMark"))));
    } else {
      localStorage.setItem("bookMark", JSON.stringify([]));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("bookMark", JSON.stringify(state.bookMark));
  }, [state.bookMark]);

  return (
    <div className="App">
      <NavBar></NavBar>
      {isPC && <MainSection></MainSection>}
      {ismobile && <MobileMainSection></MobileMainSection>}
    </div>
  );
}

export default App;
