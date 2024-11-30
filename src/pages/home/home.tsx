import { Button, Dropdown, Table } from "antd";
import { useGetContracts } from "../../service/query/useGetContracts";
import { useState } from "react";
import { CreatContract } from "../../components/create-contract";
import { MoreOutlined, EditOutlined } from "@ant-design/icons";

interface ColumnType {
  title: string;
  dataIndex: string;
  key: string;
  width: string;
}

export const Home = () => {
  const { data } = useGetContracts();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Modalni ochish
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Modalni yopish
  const closeModal = () => {
    setIsModalVisible(false);
  };



  const dataSource = data?.data.contracts.map((item, index: number) => ({
    key: index + 1,
    id: item.id,
    nomi: item.attachment ? item.attachment.origName : "",
    name: item.title,
  }));
  // interface DataType {
  //   key: string;
  //   nomi: string;
  //   name: string;
  // }

  const columns: ColumnType[] | any = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      width: "50px",
    },
    {
      title: "Nomi",
      dataIndex: "nomi",
      key: "nomi",
      width: "500px"
    },
    {
      title: "Kurs",
      dataIndex: "name",
      key: "name",
      width: ""
    },
    {
      key: "action",
      render: (_: any) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "edit",
                icon: <EditOutlined />,
                label: "Tahrirlash",
              },
            ],
          }}
          trigger={["click"]}
        >
          <Button style={{ border: "none" }} icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ padding: "24px", backgroundColor: "#fbfbfb", display: "flex", justifyContent:"end" }}>
        <Button  type="primary" onClick={showModal}>
          Qo'shish
        </Button>
      </div>
      <Table columns={columns} dataSource={dataSource} />
      <CreatContract visible={isModalVisible} onClose={closeModal} />
    </div>

  );
};
