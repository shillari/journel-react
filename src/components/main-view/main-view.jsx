import { Outlet } from "react-router"
import { SideMenu } from "../sidemenu-view/sidemenu-view"
import { useSelector } from "react-redux";
import { NavbarView } from "../navbar/navbar-view";

export const MainView = ({user, photo}) => {
  const isCollapse = useSelector((state) => state.sidebar.isCollapse);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <NavbarView user={user} />
      <div className="flex flex-1 overflow-hidden">
        <div className={(isCollapse) ? 'hidden' : 'sidemenu-view'}>
          {!isCollapse && <SideMenu user={user} photo={photo} />}
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}