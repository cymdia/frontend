import { Spin, SpinProps } from "antd";

import "../styles/components/_loader.scss";

type Props = {
  size?: SpinProps["size"];
  fullscreen?: SpinProps["fullscreen"];
};

const Loader = ({ size = "default", fullscreen = false }: Props) => {
  return <Spin fullscreen={fullscreen} className="loader" size={size} />;
};

export default Loader;
