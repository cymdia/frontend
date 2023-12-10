import { Outlet } from "react-router";
type Props = {};

const WrapperEvents = (props: Props) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default WrapperEvents;
