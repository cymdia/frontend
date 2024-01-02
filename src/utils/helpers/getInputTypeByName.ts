import { InputType } from "types/editInput";

export const getInputTypeByName = (name: string): InputType => {
  switch (name) {
    case "startDate":
    case "endDate":
      return "date";
    case "ageRestrictions":
    case "orientation":
    case "type":
      return "dropdownlist";
    default:
      return "text";
  }
};
