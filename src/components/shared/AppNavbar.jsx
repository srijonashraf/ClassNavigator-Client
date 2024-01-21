import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Container, Navbar, Offcanvas } from "react-bootstrap";
import { clearSessions } from "../../helper/sessionHelper";
import { NavLink } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import Dropdown from "react-bootstrap/Dropdown";
import { CiLogout } from "react-icons/ci";
// import { GetProfileDetails } from "../apiRequest/apiRequest";
import Avatar from "react-avatar";

const AppNavbar = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [profileDetails, setProfileDetails] = useState([]);
  const [img, setImg] = useState("");

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const closeOffcanvas = () => {
    setShowOffcanvas(false);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await GetProfileDetails();
  //       setFirstName(res.data.data[0].firstName);
  //       setProfileDetails(res.data.data[0]);
  //       setImg(res.data.data[0].img);
  //     } catch (error) {
  //       console.log("Frontend: Error fetching data.");
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className={`app-container ${showOffcanvas ? "offcanvas-open" : ""}`}>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-primary bg-gradient text-light"
        data-bs-theme="dark"
      >
        <Container className="my-2 my-lg-0  d-flex justify-content-between">
          <div className="NavBrand d-flex align-items-center">
            <BsMenuButtonWideFill
              className="text-light mx-2 cursorPointer fs-5"
              onClick={toggleOffcanvas}
            />
            <NavLink to={"/"} className="navbar-brand">
              Class Navigator
            </NavLink>
          </div>

          <Dropdown className="user-dropdown">
            <Dropdown.Toggle
              as={RxAvatar}
              id="dropdown-basic"
              className="navBarUserIcon border-0 fs-2"
            >
            </Dropdown.Toggle>

            <Dropdown.Menu className="user-dropdown-content">
              <div className="mt-4 text-center">
                <NavLink className="nav-link" to="/profile">
                  {/* <Avatar
                    src={img}
                    size="40"
                    className="mb-2 cursorPointer"
                    round={true}
                  /> */}
                </NavLink>

                <h6 className="cursorPointer">
                  <NavLink className="nav-link" to="/profile">
                    {firstName?.firstName || "User"}
                  </NavLink>
                </h6>
                <Dropdown.Divider />
              </div>

              <Dropdown.Item className="d-flex align-items-center gap-1">
                <NavLink className="nav-link" to="/profile">
                  <IoSettingsOutline /> Setting
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item
                className="d-flex align-items-center gap-1"
                onClick={clearSessions}
              >
                <CiLogout /> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>

      <Offcanvas show={showOffcanvas} onHide={closeOffcanvas} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Class Navigator</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="list-group list-group-flush list-unstyled">
            <li>
              <NavLink
                to="/"
                className="list-group-item border-0 rounded-1"
                onClick={closeOffcanvas}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/task"
                className="list-group-item border-0 rounded-1"
                onClick={closeOffcanvas}
              >
                Routine
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/allTask"
                className="list-group-item border-0 rounded-1"
                onClick={closeOffcanvas}
              >
                Assessment
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pending"
                className="list-group-item border-0 rounded-1"
                onClick={closeOffcanvas}
              >
                In Course
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/inProgress"
                className="list-group-item border-0 rounded-1"
                onClick={closeOffcanvas}
              >
                Link Library
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/profile"
                className="list-group-item border-0 rounded-1"
                onClick={closeOffcanvas}
              >
                Settings
              </NavLink>
            </li>
            <Button
              onClick={clearSessions}
              className="d-flex rounded-1"
              variant="danger"
            >
              Logout
            </Button>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default AppNavbar;
