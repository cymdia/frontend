import { Button, Flex, Form, Input, Layout } from "antd";
import Title from "antd/es/typography/Title";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "state/store";

import { addNew } from "state/news/newsOperations";
import { NewsItemType } from "types/newsItem";
import { FormItemsType } from "types/formItems";
import { constants } from "utils/constants";

import "styles/components/_editPage.scss";

type Props = {};

const editNewFormItems: FormItemsType[] = [
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
    className: "edit-form-textarea",
    inputType: "textarea",
  },
];

const EditNew = (props: Props) => {
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
        <Title className="edit-title">Додати Новину</Title>
        <Form form={form} className="edit-form" onFinish={onSubmit}>
          {editNewFormItems.map((item, i) => (
            <Form.Item
              name={item.name}
              rules={[{ required: item.required, message: item.message }]}
              key={i}
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

export default EditNew;
