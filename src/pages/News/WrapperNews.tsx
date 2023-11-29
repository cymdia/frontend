import { Outlet } from "react-router";
type Props = {};

const WrapperNews = (props: Props) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default WrapperNews;
