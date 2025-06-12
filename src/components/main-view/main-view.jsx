import { Outlet } from "react-router"
import { SideMenu } from "../sidemenu-view/sidemenu-view"
import { useSelector } from "react-redux";

export const MainView = ({user}) => {
  const isCollapse = useSelector((state) => state.sidebar.isCollapse);

  return (
    <div className="flex flex-grow">
      {!isCollapse && <SideMenu user={user} /> }
      <div className="flex-grow overflow-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}