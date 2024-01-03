import React from "react";
import { Flex, Layout } from "antd";
import Title from "antd/es/typography/Title";

type Props = {
  children: React.ReactNode;
  layoutClassname?: string;
  titleName: string;
};

const EditLayout = ({ children, layoutClassname, titleName }: Props) => {
  return (
    <Layout className={`layout ${layoutClassname}`}>
      <Flex
        vertical={true}
        align="center"
        justify="center"
        gap="large"
        className="edit-wrapper"
      >
        <Title className="edit-title">{titleName}</Title>
        {children}
      </Flex>
    </Layout>
  );
};

export default EditLayout;
