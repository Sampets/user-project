import React from "react";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

function Homepage() {
  return (
    <>
      <Row className="m-5 text-center">
        <h2>Welcome! Please choose from the menu below.</h2>
      </Row>
      <Row>
        <Nav className="nav-pills flex-column text-center">
          <Nav.Item>
            <Link to={"/users"} className="nav-link">
              Display users
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to={"/new-user"} className="nav-link">
              Register new user
            </Link>
          </Nav.Item>
        </Nav>
      </Row>
    </>
  );
}

export default Homepage;
