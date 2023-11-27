import React, { useState } from "react";

import { Form, Input, Layout, Popconfirm, Table, Typography } from "antd";

import "./styles/_news.scss";
import Title from "antd/es/typography/Title";
import Actions from "../components/Actions";

type Props = {};
interface Item {
  key: string;
  name: string;

  date: string;
}

const optionsDate: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};
const originData: Item[] = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Новина ${i}`,

    date: new Date().toLocaleDateString("uk-UA", optionsDate),
  });
}

//  type: i % 2 === 0 ? "Семінар" : " Тренінг",
//     orientation: i % 2 === 0 ? "Виховники" : "Міжнародники",
//     ageRestrictions: i % 2 === 0 ? "Суменята" : "Дружинники",
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
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
              message: `Please Input ${title}!`,
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

export const News = (props: Props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({
      name: "",

      date: "",

      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Новина",
      dataIndex: "name",
      width: "45%",
      editable: true,
    },
    {
      title: "Дата",
      dataIndex: "date",
      width: "20%",
      editable: true,
    },
    {
      title: "Дії",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Зберегти
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <p>Відмінити</p>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Редагувати
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Layout className="news-layout">
      <Title>Новини</Title>
      <Actions />
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
          sticky={true}
        />
      </Form>
    </Layout>
  );
};
