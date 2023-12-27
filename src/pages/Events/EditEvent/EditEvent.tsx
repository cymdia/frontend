import {
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Select,
  SelectProps,
} from "antd";
import Title from "antd/es/typography/Title";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch } from "state/store";

import EditActions from "components/EditActions";
import EditLayout from "components/EditLayout";

import { AddEventType } from "types/addEvent";
import { disabledDate } from "utils/helpers";
import { addEvent } from "state/events/eventsOperations";
import {
  ageRestrictionsItems,
  orientationItems,
  typeItems,
} from "utils/constants/eventsDropdownData";
import { dateFormat } from "utils/constants/constants";

import "styles/components/_editPage.scss";

type Props = {};

type EditEventFormItemType = {
  name: string;
  required: boolean;
  message: string;
  placeholder?: string;
  rangePlaceholder?: [string, string];
  inputType: "text" | "textarea" | "date" | "rangePicker" | "dropdownlist";
  className?: string;
  picker?: DatePickerProps["picker"];
  dropDownListItems?: SelectProps["options"];
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
    name: "type",
    required: true,
    message: "Виберіть тип",
    placeholder: "Тип",
    inputType: "dropdownlist",
    dropDownListItems: typeItems,
  },
  {
    name: "orientation",
    required: true,
    message: "Виберіть орієнтацію",
    placeholder: "Орієнтація",
    inputType: "dropdownlist",
    dropDownListItems: orientationItems,
  },
  {
    name: "ageRestrictions",
    required: true,
    message: "Виберіть вікові обмеження",
    placeholder: "Вікові обмеження",
    inputType: "dropdownlist",
    dropDownListItems: ageRestrictionsItems,
  },
  {
    name: "venue",
    required: true,
    message: "Введіть місце проведення",
    placeholder: "Місце проведення",
    inputType: "text",
  },
  {
    name: "financialFeatures",
    required: true,
    message: "Введіть фінансові особливості",
    placeholder: "Фінансові особливості",
    inputType: "text",
  },
  {
    name: "dateMonth",
    required: true,
    message: "Виберіть дату(місяць)",
    placeholder: "Дата (місяць)",
    inputType: "date",
    picker: "month",
  },
  {
    name: "date",
    required: false,
    message: "Виберіть початок та кінець події",
    rangePlaceholder: ["Дата початку", "Дата кінця"],
    inputType: "rangePicker",
    picker: "date",
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
    console.log(form);
    if (form !== undefined) {
      const newItem = (await form.validateFields()) as AddEventType;
      console.log(newItem);

      const data: AddEventType = {
        ...newItem,
      };
      dispatch(addEvent(data));
      navigate(-1);
    }
  };

  return (
    <EditLayout>
      <Title className="edit-title">Додати Подію</Title>
      <Form form={form} className="edit-form" onFinish={onSubmit}>
        {editEventFormItems.map((item, i) =>
          i < 6 ? (
            <Form.Item
              name={item.name}
              rules={[{ required: item.required, message: item.message }]}
              className="edit-form-item"
              key={i}
            >
              {item.inputType === "text" ? (
                <Input
                  placeholder={item.placeholder}
                  className="edit-form-field"
                />
              ) : item.inputType === "textarea" ? (
                <Input.TextArea
                  placeholder={item.placeholder}
                  className={`edit-form-field ${item.className}`}
                  rows={3}
                />
              ) : item.inputType === "dropdownlist" ? (
                <Select
                  className={`edit-form-select ${item.className}`}
                  options={item.dropDownListItems}
                  placeholder={item.placeholder}
                />
              ) : (
                // : item.inputType === "date" ? (
                //   <DatePicker
                //     picker={item.picker}
                //     disabledDate={disabledDate}
                //     placeholder={item.placeholder}
                //   />
                // ) : item.inputType === "rangePicker" ? (
                //   <DatePicker.RangePicker
                //     picker={item.picker}
                //     disabledDate={disabledDate}
                //     placeholder={item.rangePlaceholder}
                //     showTime={{
                //       hideDisabledOptions: true,
                //     }}
                //     format={dateFormat}
                //   />
                // )
                <Input
                  placeholder={item.placeholder}
                  className="edit-form-field"
                />
              )}
            </Form.Item>
          ) : (
            i === 6 && (
              <Form.Item className="edit-form-item-group">
                <Form.Item
                  name={item.name}
                  rules={[{ required: item.required, message: item.message }]}
                  className="edit-form-item"
                  key={i}
                >
                  <DatePicker
                    picker={item.picker}
                    disabledDate={disabledDate}
                    placeholder={item.placeholder}
                    className="edit-form-field"
                  />
                </Form.Item>
                <Form.Item
                  name={editEventFormItems[7].name}
                  rules={[
                    {
                      required: editEventFormItems[7].required,
                      message: editEventFormItems[7].message,
                    },
                  ]}
                  className="edit-form-item"
                  key={i + 1}
                >
                  <DatePicker.RangePicker
                    picker={editEventFormItems[7].picker}
                    disabledDate={disabledDate}
                    placeholder={editEventFormItems[7].rangePlaceholder}
                    format={dateFormat}
                    className="edit-form-field"
                    showTime={{
                      hideDisabledOptions: true,
                    }}
                  />
                </Form.Item>
              </Form.Item>
            )
          ),
        )}
        <EditActions onCancel={onCancel} />
      </Form>
    </EditLayout>
  );
};

export default EditEvent;
