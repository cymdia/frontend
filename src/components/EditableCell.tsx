import { DatePicker, Form, Input, Select } from "antd";
import { InputType } from "types/editInput";
import { dateFormat } from "utils/constants/constants";
import {
  ageRestrictionsItems,
  orientationItems,
  typeItems,
} from "utils/constants/eventsDropdownData";
import { disabledDate } from "utils/helpers";

interface EditableCellProps<T> extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: InputType;
  record: T;
  index: number;
  children: React.ReactNode;
}

export const EditableCell = <T,>({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}: EditableCellProps<T>) => {
  const inputNode = getInputNode(inputType, dataIndex);

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Введіть ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const getInputNode = (inputType: InputType, name: string) => {
  switch (inputType) {
    case "date":
      return (
        <DatePicker
          picker="date"
          format={dateFormat}
          showTime={{
            hideDisabledOptions: true,
          }}
          disabledDate={disabledDate}
        />
      );
    case "dropdownlist":
      return <Select options={getOptionsByName(name)} placeholder={name} />;

    default:
      return <Input />;
  }
};

const getOptionsByName = (name: string) => {
  switch (name) {
    case "ageRestrictions":
      return ageRestrictionsItems;
    case "orientation":
      return orientationItems;
    default:
      return typeItems;
  }
};
