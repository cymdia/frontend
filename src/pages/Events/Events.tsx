import React, { useEffect, useState } from "react";

import { Form, Layout, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Title from "antd/es/typography/Title";

import { getInputTypeByName, parsedDateToEdit, sortDate } from "utils/helpers";
import { EventsItemType } from "types/eventsItem";

import { AppDispatch, RootState } from "state/store";
import { setUpdate } from "state/news/newsSlice";
import {
  deleteEvent,
  editEvent,
  fetchEvents,
} from "state/events/eventsOperations";

import Actions from "components/Actions";
import { columnOperation } from "components/columnOperation";
import { EditableCell } from "components/EditableCell";

import "./styles/_events.scss";

type Props = {};

const Events = (props: Props) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const data = useSelector((state: RootState) => state.events);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (data.needUpdate) {
      dispatch(fetchEvents());
    } else {
      dispatch(setUpdate(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isEditing = (record: EventsItemType) => record.id === editingKey;

  const edit = (record: Partial<EventsItemType>) => {
    const newF = {
      name: "",
      type: "",
      orientation: "",
      ageRestrictions: "",
      venue: "",
      financialFeatures: "",
      ...record,
      startDate: record.startDate ? parsedDateToEdit(record.startDate) : null,
      endDate: record.endDate ? parsedDateToEdit(record.endDate) : null,
    };
    form.setFieldsValue(newF);
    setEditingKey(record.id as string);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (id: string) => {
    try {
      const row = (await form.validateFields()) as EventsItemType;
      const item = data.items.find((item) => item.id === id);
      dispatch(editEvent({ ...item, ...row, id }));
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const deleteItem = (record: EventsItemType) => {
    dispatch(deleteEvent(record.id));
  };

  const columns = [
    {
      title: "Подія",
      dataIndex: "name",
      width: "15%",
      editable: true,
    },
    {
      title: "Тип",
      dataIndex: "type",
      width: "10%",
      editable: true,
    },
    {
      title: "Орієнтація",
      dataIndex: "orientation",
      width: "10%",
      editable: true,
    },
    {
      title: "Вікові обмеження",
      dataIndex: "ageRestrictions",
      width: "10%",
      editable: true,
    },
    {
      title: "Місце проведення",
      dataIndex: "venue",
      width: "10%",
      editable: true,
    },
    {
      title: "Фінансові особливості",
      dataIndex: "financialFeatures",
      width: "10%",
      editable: true,
    },
    {
      title: "Дата початку",
      dataIndex: "startDate",
      width: "10%",
      editable: true,
      sorter: (a: EventsItemType, b: EventsItemType) =>
        sortDate(a.startDate ?? "", b.startDate ?? ""),
    },
    {
      title: "Дата кінця",
      dataIndex: "endDate",
      width: "10%",
      editable: true,
      sorter: (a: EventsItemType, b: EventsItemType) =>
        sortDate(a.endDate ?? "", b.endDate ?? ""),
    },
    columnOperation<EventsItemType>({
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
      onCell: (record: EventsItemType) => ({
        record,
        inputType: getInputTypeByName(col.dataIndex),
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Layout className="news-layout layout">
      <Title>Події</Title>
      <Actions buttonName="+ Додати подію" />

      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell<EventsItemType>,
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

export default Events;
