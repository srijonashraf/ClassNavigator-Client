import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Container, Navbar, Offcanvas } from "react-bootstrap";
import { clearSessions } from "../../helper/SessionHelper.js";
import { NavLink } from "react-router-dom";
import { BsMenuButtonWideFill } from "react-icons/bs";
import ProfileStore from "./../../stores/ProfileStore";
import { BellOutlined, FileTextFilled, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Menu } from "antd";
import ContentStore from "./../../stores/ContentStore";
import { IoCheckmarkDone } from "react-icons/io5";
import { MarkAsReadAllRequest } from "../../api/apiRequest.js";
const AppNavbar = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const { ProfileDetailsRequest, ProfileDetails } = ProfileStore();
  const {
    TotalNotificationCountRequest,
    TotalNotificationCount,
    FetchAllNotificaionRequest,
    FetchAllNotificaion,
  } = ContentStore();
  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const closeOffcanvas = () => {
    setShowOffcanvas(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await ProfileDetailsRequest();
        await TotalNotificationCountRequest();
        await FetchAllNotificaionRequest();
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleMarkAllRead = async () => {
    await MarkAsReadAllRequest();
    await TotalNotificationCountRequest();
    await FetchAllNotificaionRequest();
  };

  const notificationItems = [
    {
      key: "mark-all-read",
      label: (
        <div className="d-flex flex-column hover-null">     
        <div className="d-flex justify-content-between px-3 py-3">
          <p className="fw-bold">Notification</p>
          <p className="fw-bold" onClick={handleMarkAllRead}>
            <IoCheckmarkDone /> MARK ALL READ
          </p>
        </div>
        <hr className="mb-2 mt-0"/>
        </div>
      ),
    },
    ...(FetchAllNotificaion
      ? FetchAllNotificaion.sort(
          (b, a) => new Date(a.time) - new Date(b.time)
        ).map((notification) => ({
          label: (
            <>
              <div
                key={notification._id}
                className={`d-flex gap-3 py-2 px-2 ${
                  !notification.seen ? `bg-notification` : null
                }`}
              >
                <div>
                  <FileTextFilled className="fs-4 mt-5 text-warning" />
                </div>
                <div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: notification.body,
                    }}
                  ></div>

                  <p className="mt-1 sm-text">
                    {Math.floor(
                      (new Date() - new Date(notification.time)) /
                        1000 /
                        60 /
                        60 /
                        24
                    ) >= 1
                      ? `${Math.floor(
                          Math.floor(
                            (new Date() - new Date(notification.time)) /
                              1000 /
                              60 /
                              60 /
                              24
                          )
                        )} days ago`
                      : Math.floor(
                          (new Date() - new Date(notification.time)) /
                            1000 /
                            60 /
                            60
                        ) >= 1
                      ? `${Math.floor(
                          Math.floor(
                            (new Date() - new Date(notification.time)) /
                              1000 /
                              60 /
                              60
                          )
                        )} hours ago`
                      : `${Math.floor(
                          Math.floor(
                            (new Date() - new Date(notification.time)) /
                              1000 /
                              60
                          )
                        )} minutes ago`}
                  </p>
                </div>
              </div>
            </>
          ),
        }))
      : []),
  ];

  return (
    <div className={`app-container ${showOffcanvas ? "offcanvas-open" : ""}`}>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-primary text-light"
        data-bs-theme="dark"
      >
        <Container className="my-2 my-lg-0">
          <div className="NavBrand d-flex align-items-center">
            <BsMenuButtonWideFill
              className="text-light mx-2 cursorPointer fs-5"
              onClick={toggleOffcanvas}
            />
            <NavLink to={"/dashboard"} className="navbar-brand">
              Class Navigator
            </NavLink>
          </div>
          <div className="d-flex align-items-center gap-3">
            <Badge size="small" color="reds" count={TotalNotificationCount}>
              <Dropdown
                menu={{
                  className: "padding-null",
                  style: {
                    width: "300px",
                    maxHeight: "300px",
                    overflowY: "auto",
                    padding: 0,
                  },
                  items: notificationItems,
                }}
                trigger="click"
                placement="bottomRight"
              >
                <BellOutlined
                  shape="square"
                  size="small"
                  className="fs-5 text-light cursorPointer"
                />
              </Dropdown>
            </Badge>
            <Avatar icon={<UserOutlined />} />
          </div>
        </Container>
      </Navbar>

      <Offcanvas show={showOffcanvas} onHide={closeOffcanvas} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Class Navigator</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="list-group list-group-flush list-unstyled gap-2">
            <li>
              <NavLink
                to="/dashboard"
                className="list-group-item border-0 rounded-1"
                onClick={closeOffcanvas}
              >
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/inCourse/allTasks"
                className="list-group-item border-0 rounded-1"
                onClick={closeOffcanvas}
              >
                In Course
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
