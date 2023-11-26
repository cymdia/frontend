import { useState } from "react";
import { Menu, MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import "../styles/components/_navBar.scss";

type Props = {};

const items: MenuProps["items"] = [
  {
    label: "News",
    key: "news",
    className: "header-menu-item",
  },
  {
    label: "Events",
    key: "events",
    className: "header-menu-item",
  },
];

const NavBar = (props: Props) => {
  const location = useLocation();
  const locationPath = location.pathname.slice(1);
  const [current, setCurrent] = useState(locationPath);
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e, location);
    setCurrent(e.key);
    navigate(e.key);
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      className="header-menu"
      disabledOverflow={true}
    />
  );
};

export default NavBar;
