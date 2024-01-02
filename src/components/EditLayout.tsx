import React from "react";
import { Flex, Layout } from "antd";

type Props = {
  children: React.ReactNode;
  layoutClassname?: string;
};

const EditLayout = ({ children, layoutClassname }: Props) => {
  return (
    <Layout className={`edit-form-field ${layoutClassname}`}>
      <Flex
        vertical={true}
        align="center"
        justify="center"
        gap="large"
        className="edit-wrapper"
      >
        {children}
      </Flex>
    </Layout>
  );
};

export default EditLayout;
