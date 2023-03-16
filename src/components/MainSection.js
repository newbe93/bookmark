import MainContent from "./MainContent";
import SideBar from "./SideBar";

function MainSection() {
  return (
    <div className="main-section">
      <SideBar></SideBar>
      <MainContent></MainContent>
    </div>
  );
}

export default MainSection;
