import { Link } from "react-router";

export const SideMenu = ({user}) => {
  return (
    <>
      <div className="sidemenu shadow-md transition-all">
        <div className="flex flex-col justify-center items-center mt-7">
          <div className="w-32 h-32 rounded-full bg-white border-2 border-black"></div>
          <span>{user}</span>
        </div>
        <div className="flex flex-col justify-center items-center mt-7 ">
          <Link to="/" className="text-xl !text-gray-700 hover:scale-125"><span className="material-icons md-18">home</span> Home</Link>
          <Link to="/profile" className="text-xl !text-gray-700 hover:scale-125"><span className="material-icons md-18">person</span> Profile</Link>
          <Link className="text-xl !text-gray-700 hover:scale-125"><span className="material-icons md-18">settings</span> Settings</Link>
          <Link className="text-xl !text-gray-700 hover:scale-125"><span className="material-icons md-18">logout</span> Logout</Link>
        </div>
        <hr></hr>
      </div>
    </>
  );
}