import { Popconfirm, Typography } from "antd";

interface EntityWithId {
  id: string;
}

export interface ColumnOperationT<T> {
  title: string;
  dataIndex: string;
  editable: boolean;
  render: (_: any, record: T) => JSX.Element;
}

interface ColumnOperationProps<T> {
  editingKey: string;
  isEditing: (record: T) => boolean;
  save: (id: string) => Promise<void>;
  cancel: () => void;
  edit: (record: Partial<T>) => void;
  deleteItem: (record: T) => void;
}

export const columnOperation = <T extends EntityWithId>({
  editingKey,
  isEditing,
  save,
  cancel,
  edit,
  deleteItem,
}: ColumnOperationProps<T>): ColumnOperationT<T> => {
  return {
    title: "Дії",
    dataIndex: "operation",
    editable: false,
    render: (_, record): JSX.Element => {
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
  };
};
