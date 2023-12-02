import { Button, Flex } from "antd";

import "../styles/components/_actions.scss";
import { useNavigate } from "react-router-dom";

type Props = {
  buttonName: string;
};

const Actions = ({ buttonName }: Props) => {
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
          {buttonName}
        </Button>
      </Flex>
    </>
  );
};

export default Actions;
