import { Header } from "antd/es/layout/layout";
import { Avatar, Flex } from "antd";

import { UserOutlined } from "@ant-design/icons";

import { Logo } from "../components/Logo";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router";

import "./styles/_home.scss";

type Props = {};

export const Home = (props: Props) => {
  return (
    <div>
      <Header className="header">
        <Flex align="center" justify="space-between">
          <Logo />
          <NavBar />
          <div className="avatart">
            <Avatar size="small" icon={<UserOutlined />} />
          </div>
        </Flex>
      </Header>
      <Outlet />
    </div>
  );
};
