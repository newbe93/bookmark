import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav } from "react-bootstrap";
import styles from "../NavBar.module.css";
function NavBar() {
  return (
    <div className={styles.navbarSection}>
      <Nav activeKey="/">
        <Nav.Item>
          <Nav.Link eventKey="/">
            <button className={styles.logo}>
              <FontAwesomeIcon icon={faBookBookmark} size="2x" />
            </button>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default NavBar;
