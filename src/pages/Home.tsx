import { Header } from "antd/es/layout/layout";
import { Avatar, Flex } from "antd";

import { UserOutlined } from "@ant-design/icons";

import { Logo } from "../components/Logo";
import NavBar from "../components/NavBar";

type Props = {};

export const Home = (props: Props) => {
  return (
    <div>
      <Header>
        <Flex align="center" justify="space-between">
          <Logo />
          <NavBar />
          <Avatar size="small" icon={<UserOutlined />} />
        </Flex>
      </Header>
    </div>
  );
};
