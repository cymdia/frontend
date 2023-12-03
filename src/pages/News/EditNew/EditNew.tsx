import { Button, Flex, Form, Input, Layout } from "antd";
import Title from "antd/es/typography/Title";
import { useDispatch } from "react-redux";
import { addNew } from "state/news/newsSlice";

import { NewsItemType } from "types/newsItem";

import { constants } from "utils/constants";

import "styles/components/_editNew.scss";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

type Props = {};

type EditNewFormItemType = {
  name: string;
  required: boolean;
  message: string;
  placeholder: string;
  inputType: "text" | "textarea";
  className?: string;
};

const editNewFormItems: EditNewFormItemType[] = [
  {
    name: "name",
    required: true,
    message: "Введіть назву",
    placeholder: "Назва новини",
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

const EditNew = (props: Props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCancel = () => {
    form.resetFields();
  };

  const onSubmit = async () => {
    if (form !== undefined) {
      const newItem = await form.validateFields();

      const data: NewsItemType = {
        date: dayjs(new Date()).format(constants.dateFormat).toString(),
        id: generateUniqueId(),
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
        className="edit-new-wrapper"
      >
        <Title className="edit-new-title">Додати Новину</Title>
        <Form form={form} className="edit-new-form" onFinish={onSubmit}>
          {editNewFormItems.map((item) => (
            <Form.Item
              name={item.name}
              rules={[{ required: item.required, message: item.message }]}
            >
              {item.inputType === "text" ? (
                <Input
                  placeholder={item.placeholder}
                  className="edit-new-form-field"
                />
              ) : (
                <Input.TextArea
                  placeholder={item.placeholder}
                  className={`edit-new-form-field ${item.className}`}
                  rows={3}
                />
              )}
            </Form.Item>
          ))}
          <Flex justify="flex-end" gap="large">
            <Button
              danger
              className="edit-new-form-button"
              onClick={onCancel}
              htmlType="button"
            >
              Відмінити
            </Button>
            <Button
              type="primary"
              className="edit-new-form-button button-accent"
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

export default EditNew;

function generateUniqueId() {
  return "id-" + Math.random().toString(36).substr(2, 16);
}
