import React from "react";
import { DatePicker, Input, Select, SelectProps } from "antd";
import { disabledDate } from "utils/helpers";
import { DatePickerProps } from "antd/es/date-picker";

type Props = {
  placeholder?: string;
  rangePlaceholder?: [string, string];
  inputType: "text" | "textarea" | "date" | "rangePicker" | "dropdownlist";
  className?: string;
  picker?: DatePickerProps["picker"];
  handleChange?: () => void;
  dropDownListItems?: SelectProps["options"];
};

const CustomInput = ({
  placeholder,
  rangePlaceholder,
  inputType,
  className,
  picker,
  handleChange,
  dropDownListItems,
}: Props) => {
  switch (inputType) {
    case "text":
      return <Input placeholder={placeholder} className="edit-form-field" />;
    case "textarea":
      return (
        <Input.TextArea
          placeholder={placeholder}
          className={`edit-form-field ${className}`}
          rows={3}
        />
      );
    case "dropdownlist":
      return (
        <Select
          className={`edit-form-select ${className}`}
          onChange={handleChange}
          options={dropDownListItems}
          placeholder={placeholder}
        />
      );
    case "date":
      return (
        <DatePicker
          picker={picker}
          disabledDate={disabledDate}
          placeholder={placeholder}
        />
      );
    case "rangePicker":
      return (
        <DatePicker.RangePicker
          picker={picker}
          disabledDate={disabledDate}
          placeholder={rangePlaceholder}
        />
      );
    default:
      throw new Error("");
  }
};

export default CustomInput;
