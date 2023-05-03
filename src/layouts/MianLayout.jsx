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

const { Header, Content, Footer, Sider } = Layout;

const MianLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const key = useParams();

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
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
      <Layout style={{ marginLeft: 200 }}>
        <Content style={{ margin: "24px 16px 0" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MianLayout;
