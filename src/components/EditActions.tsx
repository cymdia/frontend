import { Button, Flex } from "antd";
import React from "react";

type Props = {
  onCancel: () => void;
};

const EditActions = ({ onCancel }: Props) => {
  return (
    <Flex justify="flex-end" gap="large">
      <Button
        danger
        className="edit-form-button"
        onClick={onCancel}
        htmlType="button"
      >
        Відмінити
      </Button>
      <Button
        type="primary"
        className="edit-form-button button-accent"
        htmlType="submit"
      >
        Опублікувати
      </Button>
    </Flex>
  );
};

export default EditActions;
