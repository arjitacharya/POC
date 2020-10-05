import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import "./home.css";
const [prf, hist] = [0, 1];

const purchasedMock = require("../../mocks/purchasedCourses.json").data;

export default function Home() {
  const [currentTab, setCurrentTab] = useState(prf);
  const [showDetails, setShowDetails] = useState(false);
  const [currentDetailsTab, setCurrentDetailsTab] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [reorderData, setReorderData] = useState(undefined);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const helpModal = () => {
    return (
      <Modal
        show={showHelp}
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

  const reorderModel = () => {
    return (
      <Modal
        show={reorderData}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Reorder</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Please confirm details before re-ordering</p>
          <p>Title: {reorderData && reorderData.title}</p>
          <p>Price: {reorderData && reorderData.offerPrice}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setReorderData(undefined)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setReorderData(undefined);
              window.alert("Order Successfull");
            }}
          >
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div>
      {showHelp && helpModal()}
      {reorderData && reorderModel()}
      <div className="sidebar-container">
        <h3 className="sideBar-title">Account Settings</h3>
        <div className="options">
          <div
            className={`sidebar-item ${currentTab === prf ? "active" : ""}`}
            onClick={() => setCurrentTab(prf)}
          >
            {" "}
            Profile Details
          </div>
          <div
            className={`sidebar-item ${currentTab === hist ? "active" : ""}`}
            onClick={() => setCurrentTab(hist)}
          >
            Order History
          </div>
        </div>
      </div>
      <div className="sidebar-details-container">
        <Container>
          {currentTab === prf && (
            <Form>
              <Row>
                <Col>
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setFName(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter Name"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="Lastname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setLName(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter Lastname"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      type="email"
                      placeholder="Enter Email"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="phone">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setMobile(e.target.value);
                      }}
                      type="tel"
                      placeholder="Enter mobile number"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="float-left">
                <Col>
                  <Button
                    className="save-btn"
                    onClick={() => {
                      document.cookie = `username=${fName}`;
                    }}
                  >
                    Save
                  </Button>
                </Col>
                <Col>
                  <p
                    onClick={() => window.prompt("Enter new password")}
                    className="update-pass"
                  >
                    Update password
                  </p>
                </Col>
              </Row>
            </Form>
          )}
          {currentTab === hist && (
            <div className="order-list-container">
              {purchasedMock.map((el) => {
                const {
                  orderId,
                  title,
                  orderedAt,
                  status,
                  createdBy,
                  price,
                  offerPrice,
                  image,
                  rating,
                  language,
                } = el || {};
                return (
                  <div className="order-list-item-container" key={orderId}>
                    <Row className="order-list-element">
                      <Col lg="2">
                        <img
                          src={image || require("../../assets/favicon.ico")}
                          alt="NA"
                        />
                      </Col>
                      <Col lg="8">
                        <Row>{title}</Row>
                        <Row>
                          <span>Order id: {orderId}</span> ·
                          <span> Ordered on: {orderedAt}</span>
                        </Row>
                      </Col>
                      <Col lg="2">
                        <Row className="oldprice">{price}</Row>
                        <Row className="newprice">{offerPrice}</Row>
                      </Col>
                    </Row>
                    <Row className="order-details-wrap">
                      <Col className="order-details" lg={10} sm={10}>
                        <Row>
                          <span
                            className="padding-sm"
                            onClick={() => {
                              setCurrentDetailsTab(orderId);
                              setShowDetails(!showDetails);
                            }}
                          >
                            View order Details
                          </span>
                          <span
                            onClick={() => setShowHelp(true)}
                            className="padding-sm"
                          >
                            Help
                          </span>
                          <span
                            onClick={() => setReorderData(el)}
                            className="padding-sm"
                          >
                            Reorder
                          </span>
                        </Row>
                        {showDetails && currentDetailsTab === orderId && (
                          <Table striped bordered hover size="sm">
                            <tbody>
                              <tr>
                                <td>Rating</td>
                                <td>Language</td>
                                <td>Creator</td>
                                <td>Last updated</td>
                              </tr>
                              <tr>
                                <td>{rating}</td>
                                <td>{language}</td>
                                <td>{createdBy}</td>
                                <td>today</td>
                              </tr>
                            </tbody>
                          </Table>
                        )}
                      </Col>
                      <Col className={`course-status float-right ${status}`}>
                        {status}
                      </Col>
                    </Row>
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}
