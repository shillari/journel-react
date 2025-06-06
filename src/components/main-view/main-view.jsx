import { Outlet } from "react-router"
import { SideMenu } from "../sidemenu-view/sidemenu-view"
import { useSelector } from "react-redux";

export const MainView = () => {
  const isCollapse = useSelector((state) => state.sidebar.isCollapse);

  return (
    <div className="flex flex-grow">
      {!isCollapse && <SideMenu isCollapse={isCollapse} /> }
      <div className="flex-grow overflow-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}