import { Outlet, useNavigate, useParams } from "react-router-dom";

// ant design
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import { Layout, Menu } from "antd";
import React, { useState } from "react";
const { Header, Sider, Content } = Layout;

const MianLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const key = useParams();

  return (
    <Layout>
      <div className=" hidden sm:block">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "sticky",
            left: 0,
            top: 0,
            bottom: 0,
            fontsize: "1px",
          }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            style={{
              zoom: "85%",
            }}
            defaultSelectedKeys={key}
            onClick={({ key }) => {
              navigate(key);
            }}
            items={[
              {
                key: "/",
                icon: <UserOutlined />,
                label: "Dasboard",
              },
              {
                key: "catalog",
                icon: <VideoCameraOutlined />,
                label: "Catalog",
                children: [
                  {
                    key: "categories",
                    icon: <VideoCameraOutlined />,
                    label: "Categories",
                  },
                  {
                    key: "brands",
                    icon: <VideoCameraOutlined />,
                    label: "Brands",
                  },

                  {
                    key: "productlist",
                    icon: <VideoCameraOutlined />,
                    label: "Products",
                  },
                ],
              },
              {
                key: "orders",
                icon: <UploadOutlined />,
                label: "Orders",
              },
            ]}
          />
        </Sider>
      </div>
      <Layout className="site-layout">
        <Header className=" shadow-sm  drop-shadow p-0 bg-white  z-10  sticky top-0 w-full">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content className=" bg-gray-100 p-[24px] zoom">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MianLayout;
