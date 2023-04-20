import React from "react";
import { Link } from "react-router-dom";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Modal, Dropdown } from "antd";
const { confirm } = Modal;

const MoreOptions = ({ id, editPath, deleteItem, isSuccess }) => {
  const showDeleteConfirm = (id) => {
    confirm({
      title: `Are you sure delete ?`,
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",

      onOk() {
        deleteItem(id);
      },
    });
  };

  const items = (id) => [
    {
      key: "1",
      label: <Link to={`${editPath}/${id}`}> Edit </Link>,
    },
    {
      key: "2",
      label: <button onClick={() => showDeleteConfirm(id)}>Delete</button>,
    },
  ];

  return (
    <Dropdown
      menu={{ items: items(id) }}
      placement="bottomRight"
      arrow={{
        pointAtCenter: true,
      }}
    >
      <BiDotsVerticalRounded
        size={25}
        className=" hover:bg-gray-200 p-1 rounded-md"
      />
    </Dropdown>
  );
};

export default MoreOptions;
