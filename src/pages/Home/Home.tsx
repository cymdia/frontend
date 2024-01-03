import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { Header } from "antd/es/layout/layout";
import { Avatar, Flex, Popover, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { AppDispatch } from "state/store";
import { logout } from "state/auth/authSlice";

import { Logo } from "../../components/Logo";
import NavBar from "../../components/NavBar";

import "./styles/_home.scss";

type Props = {};

const Home = (props: Props) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    setOpen(false);
    dispatch(logout());
    navigate("/login");
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <div>
      <Header className="header">
        <Flex align="center" justify="space-between">
          <Logo />
          <NavBar />

          <Popover
            content={
              <Typography.Link className="edit-btn" onClick={handleLogout}>
                Вийти
              </Typography.Link>
            }
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
          >
            <Avatar size="small" icon={<UserOutlined />} className="avatar" />
          </Popover>
        </Flex>
      </Header>
      <Outlet />
    </div>
  );
};

export default Home;
