import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
  Table,
} from "react-bootstrap";
import "./home.css";
const [prf, hist] = [0, 1];

const purchasedMock = require("../../mocks/purchasedCourses.json").data;

export default function Home() {
  const [currentTab, setCurrentTab] = useState(prf);
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div>
      <div className="sidebar-container">
        <h3 className="sideBar-title">Account Settings</h3>
        <div className="options">
          <div className="sidebar-item" onClick={() => setCurrentTab(prf)}>
            {" "}
            Profile Details
          </div>
          <div className="sidebar-item" onClick={() => setCurrentTab(hist)}>
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
                    <Form.Control type="text" placeholder="Enter Name" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="Lastname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Lastname" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="phone">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter mobile number"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="float-left ">
                <Col>
                  <Button className="save-btn">Save</Button>
                </Col>
                <Col>
                  <p className="update-pass">Update password</p>
                </Col>
              </Row>
            </Form>
          )}
          {currentTab === hist && (
            <div className="order-list-container">
              {purchasedMock.map((el) => {
                const { orderId } = el || {};
                return (
                  <>
                    <Row className="order-list-element">
                      <Col lg="2">
                        <img src={require("../../assets/favicon.ico")}></img>
                      </Col>
                      <Col lg="8">
                        <Row>Kick start to react js programming.</Row>
                        <Row>
                          <span>Order id: 2323232</span> ·
                          <span> Ordered on : 1-2-3</span>
                        </Row>
                      </Col>
                      <Col lg="2">
                        <Row className="oldprice">Rs 2200</Row>
                        <Row className="newprice">Rs 2200</Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="order-details" lg={10} sm={10}>
                        <Row>
                          <span
                            className="padding-sm"
                            onClick={() => setShowDetails(!showDetails)}
                          >
                            View order Details
                          </span>
                          <span className="padding-sm">Help</span>
                          <span className="padding-sm">Reorder</span>
                        </Row>
                        {showDetails && (
                          <Table striped bordered hover size="sm">
                            <tbody>
                              <tr>
                                <td>Rating</td>
                                <td>Language</td>
                                <td>Creator</td>
                                <td>Last updated</td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                              </tr>
                            </tbody>
                          </Table>
                        )}
                      </Col>
                      <Col classname={`float-right ${"status"}`}>Pending</Col>
                    </Row>
                  </>
                );
              })}
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}
