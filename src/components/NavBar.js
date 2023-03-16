import { Nav } from "react-bootstrap";

function NavBar() {
  return (
    <div className="navbar-section">
      <Nav activeKey="/">
        <Nav.Item>
          <Nav.Link eventKey="/">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default NavBar;
