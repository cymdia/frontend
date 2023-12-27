import React from "react";
import { Flex, Layout } from "antd";

type Props = {
  children: React.ReactNode;
};

const EditLayout = ({ children }: Props) => {
  return (
    <Layout className="layout">
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
