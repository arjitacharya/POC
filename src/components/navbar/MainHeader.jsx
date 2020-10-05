import React, { useState } from "react";
import { Navbar, Nav, Container, Modal, Button } from "react-bootstrap";
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
  const [showhelp, setShowHelp] = useState(false);

  const helpModal = () => {
    return (
      <Modal
        show={showhelp}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Thanks for contacting...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            You will recieve a call back from our customer service executive on
            your registered contact.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowHelp(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };
  return (
    <Router>
      <Container>
        <div className="main-nav-container">
          {helpModal()}
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

              <div onClick={() => setShowHelp(true)} className="callbackDiv">
                Request a callback
              </div>
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
