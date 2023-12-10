import { Button, Flex, Form, Input, Layout } from "antd";
import Title from "antd/es/typography/Title";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import { AppDispatch } from "state/store";
import { addNew } from "state/news/newsOperations";

import { NewsItemType } from "types/newsItem";
import { constants } from "utils/constants";

import "styles/components/_editPage.scss";

type Props = {};

type EditEventFormItemType = {
  name: string;
  required: boolean;
  message: string;
  placeholder: string;
  inputType: "text" | "textarea";
  className?: string;
};

const editEventFormItems: EditEventFormItemType[] = [
  {
    name: "name",
    required: true,
    message: "Введіть назву",
    placeholder: "Назва події",
    inputType: "text",
  },
  {
    name: "description",
    required: true,
    message: "Введіть опис",
    placeholder: "Що у вас на думці?",
    className: "edit-new-form-textarea",
    inputType: "textarea",
  },
];

const EditEvent = (props: Props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onCancel = () => {
    form.resetFields();
  };

  const onSubmit = async () => {
    if (form !== undefined) {
      const newItem = await form.validateFields();

      const data: NewsItemType = {
        date: dayjs(new Date()).format(constants.dateFormat).toString(),
        ...newItem,
      };
      dispatch(addNew(data));
      navigate(-1);
    }
  };

  return (
    <Layout className="layout">
      <Flex
        vertical={true}
        align="center"
        justify="center"
        gap="large"
        className="edit-wrapper"
      >
        <Title className="edit-title">Додати Подію</Title>
        <Form form={form} className="edit-form" onFinish={onSubmit}>
          {editEventFormItems.map((item) => (
            <Form.Item
              name={item.name}
              rules={[{ required: item.required, message: item.message }]}
            >
              {item.inputType === "text" ? (
                <Input
                  placeholder={item.placeholder}
                  className="edit-form-field"
                />
              ) : (
                <Input.TextArea
                  placeholder={item.placeholder}
                  className={`edit-form-field ${item.className}`}
                  rows={3}
                />
              )}
            </Form.Item>
          ))}
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
        </Form>
      </Flex>
    </Layout>
  );
};

export default EditEvent;
