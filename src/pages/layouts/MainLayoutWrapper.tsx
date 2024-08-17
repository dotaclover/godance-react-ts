import { Outlet } from "react-router-dom";
import MainLayout from "./MayoutLayout/MainLayout";

const MainLayoutWrapper = () => (
  <MainLayout>
    <Outlet /> {/* 渲染子路由 */}
  </MainLayout>
);

export default MainLayoutWrapper;
