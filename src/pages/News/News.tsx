import React, { useState } from "react";

import { Form, Input, Layout, Popconfirm, Table, Typography } from "antd";
import Title from "antd/es/typography/Title";

import dayjs from "dayjs";

import Actions from "../../components/Actions";
import { constants } from "../../utils/constants";
import { sortDate } from "../../utils/helpers";

import "./styles/_news.scss";

type Props = {};
interface Item {
  key: string;
  name: string;

  date: string;
}

const originData: Item[] = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Новина ${i}`,
    date:
      i % 2 === 0
        ? dayjs(new Date()).format(constants.dateFormat).toString()
        : dayjs(new Date(new Date().setDate(21)))
            .format(constants.dateFormat)
            .toString(),
  });
}

//  type: i % 2 === 0 ? "Семінар" : " Тренінг",
//     orientation: i % 2 === 0 ? "Виховники" : "Міжнародники",
//     ageRestrictions: i % 2 === 0 ? "Суменята" : "Дружинники",

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "date" | "text";
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

const News = (props: Props) => {
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

  const deleteNew = (record: Partial<Item>) => {
    const newData = [...data];
    const index = data.findIndex((item) => record.key === item.key);
    newData.splice(index, 1);
    setData(newData);
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
      editable: false,
      sorter: (a: Item, b: Item) => sortDate(a.date, b.date),
    },
    {
      title: "Дії",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return (
          <>
            {editable ? (
              <span>
                <Typography.Link
                  onClick={() => save(record.key)}
                  style={{ marginRight: 8 }}
                >
                  Зберегти
                </Typography.Link>
                <Popconfirm
                  title="Ви впевнені, що хочете скасувати?"
                  onConfirm={cancel}
                >
                  <Typography.Link style={{ marginRight: 8 }}>
                    Скасувати
                  </Typography.Link>
                </Popconfirm>
              </span>
            ) : (
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
                className="edit-btn"
              >
                Редагувати
              </Typography.Link>
            )}
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => deleteNew(record)}
              className="delete-btn"
            >
              Видалити
            </Typography.Link>
          </>
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
        inputType: col.dataIndex === "date" ? "date" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Layout className="news-layout layout">
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

export default News;

// const range = (start: number, end: number) => {
//   const result = [];
//   for (let i = start; i < end; i++) {
//     result.push(i);
//   }
//   return result;
// };
// const disabledDate: RangePickerProps["disabledDate"] = (current) => {
//   return current && current < dayjs().endOf("day");
// };

// const disabledDateTime = () => ({
//   disabledHours: () => range(0, 24).splice(4, 20),
//   disabledMinutes: () => range(30, 60),
// });
