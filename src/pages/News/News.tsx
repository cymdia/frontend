import React, { useEffect, useState } from "react";

import { Form, Input, Layout, Popconfirm, Table, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";

import Title from "antd/es/typography/Title";
import Actions from "../../components/Actions";

import { sortDate } from "../../utils/helpers";

import { NewsItemType } from "../../types/newsItem";
import { AppDispatch, RootState } from "../../state/store";
import { setUpdate } from "../../state/news/newsSlice";
import { deleteNew, editNew, fetchNews } from "state/news/newsOperations";

import "./styles/_news.scss";

type Props = {};

//  type: i % 2 === 0 ? "Семінар" : " Тренінг",
//     orientation: i % 2 === 0 ? "Виховники" : "Міжнародники",
//     ageRestrictions: i % 2 === 0 ? "Суменята" : "Дружинники",

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "date" | "text";
  record: NewsItemType;
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
  const [editingKey, setEditingKey] = useState("");
  const data = useSelector((state: RootState) => state.news);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (data.needUpdate) {
      dispatch(fetchNews());
    } else {
      dispatch(setUpdate(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isEditing = (record: NewsItemType) => record.id === editingKey;

  const edit = (record: Partial<NewsItemType>) => {
    form.setFieldsValue({
      name: "",
      description: "",
      date: "",
      ...record,
    });
    setEditingKey(record.id as string);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (id: string) => {
    try {
      const row = (await form.validateFields()) as NewsItemType;
      const item = data.items.find((item) => item.id === id);
      dispatch(editNew({ ...item, ...row, id }));
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const deleteItem = (record: NewsItemType) => {
    dispatch(deleteNew(record.id));
  };

  const columns = [
    {
      title: "Новина",
      dataIndex: "name",
      width: "25%",
      editable: true,
    },
    {
      title: "Опис",
      dataIndex: "description",
      width: "35%",
      editable: true,
    },
    {
      title: "Дата",
      dataIndex: "date",
      width: "20%",
      editable: false,
      sorter: (a: NewsItemType, b: NewsItemType) => sortDate(a.date, b.date),
    },
    {
      title: "Дії",
      dataIndex: "operation",
      render: (_: any, record: NewsItemType) => {
        const editable = isEditing(record);
        return (
          <>
            {editable ? (
              <span>
                <Typography.Link
                  onClick={() => save(record.id)}
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
              onClick={() => deleteItem(record)}
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
      onCell: (record: NewsItemType) => ({
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
      <Actions buttonName="+ Додати новину" />

      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data.items}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
          sticky={true}
          loading={data.isLoading}
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
