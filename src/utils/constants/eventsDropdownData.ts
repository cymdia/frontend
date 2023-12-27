import { SelectProps } from "antd/lib/select";

const typeItems: SelectProps["options"] = [
  { value: "1", label: "Семінар" },
  { value: "2", label: "Тренінг" },
  { value: "3", label: "Табір" },
];
const orientationItems: SelectProps["options"] = [
  { value: "1", label: "Виховники" },
  { value: "2", label: "Культутрники" },
  { value: "3", label: "Ратники" },
  { value: "4", label: "Міжнародники" },
  { value: "5", label: "Суспільники" },
];
const ageRestrictionsItems: SelectProps["options"] = [
  { value: "1", label: "Суменята" },
  { value: "2", label: "Молодше юнацтво" },
  { value: "3", label: "Старше юнацтво" },
  { value: "4", label: "Дружинники" },
];

export { typeItems, orientationItems, ageRestrictionsItems };
