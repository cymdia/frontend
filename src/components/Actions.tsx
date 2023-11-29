import { Button, Flex } from "antd";

import "../styles/components/_actions.scss";
import { useNavigate } from "react-router-dom";

type Props = {};

const Actions = (props: Props) => {
  const navigate = useNavigate();
  const onCreateNew = () => {
    navigate("edit");
  };
  return (
    <>
      <Flex justify="flex-end">
        <Button
          type="primary"
          className="create-new-btn"
          size="large"
          onClick={onCreateNew}
        >
          + Додати новину
        </Button>
      </Flex>
    </>
  );
};

export default Actions;
