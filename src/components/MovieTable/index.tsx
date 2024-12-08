import { setFilter } from "@/redux/slices/filterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

interface IMovieTableProps {
  data: DefaultItem[] | EpisodeItem[];
  totalCount: string;
  loading: boolean;
}

const MovieTable: React.FC<IMovieTableProps> = ({
  data,
  totalCount,
  loading
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const filter = useAppSelector((state) => state.filter);
  const columns: ColumnsType<DefaultItem | EpisodeItem> = [
    { title: "Title", dataIndex: "Title", key: "Title" },
    {
      title: "Year",
      dataIndex: "Year",
      key: "Year",
      render: (_, record: DefaultItem | EpisodeItem) => (
        <span>
          {(record as EpisodeItem).Released
            ? (record as EpisodeItem).Released
            : (record as DefaultItem).Year}
        </span>
      ),
      width: 200
    },
    { title: "Imdb ID", dataIndex: "imdbID", key: "imdbID", width: 200 }
  ];

  const handleRowClick = (record: DefaultItem | EpisodeItem) => {
    navigate(`/detail/${record.imdbID}`);
  };

  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="imdbID"
        bordered
        loading={loading}
        scroll={{ x: "max-content" }}
        pagination={{
          position: ["bottomCenter"],
          onChange: (e: number) => {
            dispatch(
              setFilter({
                page: e
              })
            );
          },
          pageSize: 10,
          total: Number(totalCount),
          showSizeChanger: false,
          current: filter.page || 1
        }}
        onRow={(record) => ({
          onClick: () => {
            handleRowClick(record);
          }
        })}
      />
    </>
  );
};
export default memo(MovieTable);
