import React from "react";

import EditLayout from "components/EditLayout";

import "./styles/_login.scss";
import "styles/components/_editPage.scss";
import { FormItemsType } from "types/formItems";
import { Button, Flex, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "state/store";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";

type Props = {};

const loginFormItems: FormItemsType[] = [
  {
    name: "login",
    required: true,
    message: "Введіть логін",
    placeholder: "Логін",
    inputType: "text",
  },
  {
    name: "password",
    required: true,
    message: "Введіть пароль",
    placeholder: "Пароль",
    className: "edit-form-textarea",
    inputType: "text",
  },
];

const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (form !== undefined) {
      const newItem = await form.validateFields();

      // const data: NewsItemType = {
      //   // date: dayjs(new Date()).format(constants.dateFormat).toString(),
      //   ...newItem,
      // };
      // dispatch(addNew(data));
      navigate(-1);
    }
  };

  return (
    <EditLayout layoutClassname="login-layout">
      <Title className="edit-title">Вхід</Title>
      <Form form={form} className="edit-form" onFinish={onSubmit}>
        {loginFormItems.map((item, i) => (
          <Form.Item
            name={item.name}
            rules={[{ required: item.required, message: item.message }]}
            key={i}
          >
            <Input placeholder={item.placeholder} className="edit-form-field" />
          </Form.Item>
        ))}
        <Flex justify="flex-end" gap="large">
          <Button
            type="primary"
            className="edit-form-button button-accent"
            htmlType="submit"
          >
            Ввійти
          </Button>
        </Flex>
      </Form>
    </EditLayout>
  );
};

export default Login;
