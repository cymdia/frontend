import React, { useEffect, useState } from "react";

import { Form, Layout, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Title from "antd/es/typography/Title";

import { sortDate } from "../../utils/helpers";
import { NewsItemType } from "../../types/newsItem";
import { AppDispatch, RootState } from "../../state/store";
import { setUpdate } from "../../state/news/newsSlice";
import { deleteNew, editNew, fetchNews } from "state/news/newsOperations";

import Actions from "components/Actions";
import { columnOperation } from "components/columnOperation";
import { EditableCell } from "components/EditableCell";

import "./styles/_news.scss";

type Props = {};

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
    columnOperation<NewsItemType>({
      editingKey,
      isEditing,
      save,
      cancel,
      edit,
      deleteItem,
    }),
  ];

  const mergedColumns = columns.map((col) => {
    if ("editable" in col) {
      if (!col.editable) {
        return col;
      }
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
