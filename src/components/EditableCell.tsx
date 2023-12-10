import { Form, Input } from "antd";
import { NewsItemType } from "types/newsItem";

interface EditableCellProps<T> extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "date" | "text";
  record: T;
  index: number;
  children: React.ReactNode;
}

export const EditableCell: React.FC<EditableCellProps<NewsItemType>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <Input />;

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
