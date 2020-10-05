import React from "react";
import { Navbar, Nav, Container, Image, Col } from "react-bootstrap";
import {
  Route,
  NavLink,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import About from "../About";
import Courses from "../Courses";
import Home from "../home/Home";
import Tracks from "../Tracks";
import "./navbar.css";
export default function MainHeader(props) {
  return (
    <Router>
      <Container>
        <div className="main-nav-container">
          <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Brand>Course</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link>
                  <NavLink
                    className="links"
                    activeClassName="active"
                    to="/home"
                  >
                    Home
                  </NavLink>
                </Nav.Link>
                <Nav.Link>
                  {" "}
                  <NavLink
                    className="links"
                    activeClassName="active"
                    to="/tracks"
                  >
                    Tracks
                  </NavLink>
                </Nav.Link>
                <Nav.Link>
                  {" "}
                  <NavLink
                    className="links"
                    activeClassName="active"
                    to="/courses"
                  >
                    Coures
                  </NavLink>
                </Nav.Link>
                <Nav.Link>
                  {" "}
                  <NavLink
                    className="links"
                    activeClassName="active"
                    to="/about"
                  >
                    About
                  </NavLink>
                </Nav.Link>
              </Nav>

              <div className="callbackDiv">Request a callback</div>
            </Navbar.Collapse>
            <div className="profile-avtar">
              <p className="avtar-text">AA</p>
            </div>
          </Navbar>
        </div>
        <div>
          <Switch>
            <Route path="/home" render={(props) => <Home {...props} />} />
            <Route path="/courses" render={(props) => <Courses {...props} />} />
            <Route path="/tracks" render={(props) => <Tracks {...props} />} />
            <Route path="/about" render={(props) => <About {...props} />} />
          </Switch>
        </div>
      </Container>
    </Router>
  );
}
