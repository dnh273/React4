import React from "react";
import { Route } from "react-router-dom";
import { Button, Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;


export const UserLoginTemplate = (propsRoute) => {
  let { Component, ...restRoute } = propsRoute;

  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return (
          <>
            <Layout>
              <Sider
                width={window.innerWidth / 2}
                style={{
                  height: window.innerHeight,
                  backgroundImage: "url(https://picsum.photos/2000)",
                  backgroundSize: "100%",
                }}
              >
                sider
              </Sider>
              <Content>
                <Component></Component>
              </Content>
            </Layout>
          </>
        );
      }}
    />
  );
};
