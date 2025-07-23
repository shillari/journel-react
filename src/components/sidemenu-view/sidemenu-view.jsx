import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { setEmail, setId, setPhoto, setUsername } from "../../redux/reducers/user";
import { Button } from "react-bootstrap";
import { useFetchWithAuth } from "../../service/fetchWithAuth";
import { useState } from "react";
import { signOut } from "firebase/auth";

export const SideMenu = ({user, photo, auth}) => {
  const fetchWithAuth = useFetchWithAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  const logout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetchWithAuth(`/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
      });

      if (response) {
        const data = {
          id: null,
          username: null,
          email: null,
          photoUrl: null
        }

        dispatch(setUsername(data));
        dispatch(setPhoto(data));
        dispatch(setEmail(data));
        dispatch(setId(data));
        
        await signOut(auth)
        .then(() => {
          console.log("Logged out from Firebase");
        })
        .catch((error) => {
          console.error("Error logging out from Firebase", error);
        });

        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const oncn = (value) => {
    console.log(value);
    setDate(value)
  }

  return (
    <>
      <div className="sidemenu shadow-md transition-all rounded-b-lg">
        <div className="flex flex-col justify-center items-center ">
          <div className="w-32 h-32 rounded-full mt-3 bg-gray-200 border-1 ">
            <img className="rounded-full w-full h-full object-cover" src={photo ? photo : "user-default.png"} />
          </div>
          <span className="font-bold wrap-username px-3 text-shadow-lg">{user}</span>
        </div>
        <div className="flex flex-col justify-center items-center mt-7 ">
          <Button
            as={Link} to="/"
          className="!text-black hover:scale-125  items-center gap-1 bg-transparent border-0 cursor-pointer">
            <span className="inline-flex items-center gap-1 hover:!text-gray-500 text-sm">
              <span className="material-icons-outlined md-18">home</span> Home
            </span>
          </Button>
          <Button
            as={Link} to="/settings"
          className="!text-black hover:scale-125  items-center gap-1 bg-transparent border-0 cursor-pointer">
            <span className="inline-flex items-center gap-1 hover:!text-gray-500 text-sm">
              <span className="material-icons-outlined md-18">settings</span> Settings
            </span>
          </Button>
          <Button
            onClick={logout}
          className="!text-black hover:scale-125  items-center gap-1 bg-transparent border-0 cursor-pointer" >
            <span className="inline-flex items-center gap-1 hover:!text-gray-500 text-sm">
              <span className="material-icons-outlined md-18">logout</span> Logout
            </span>
          </Button>
        </div>
        {/* 
        <hr></hr>
        <div className="max-w-full m-1 hidden md:block">
          <Calendar onChange={(value) => oncn(value)} 
            value={date}  
            
            formatShortWeekday={(locale, date) =>
              date.toLocaleDateString(locale, { weekday: 'narrow' })
            }
          />
        </div>
        */}
      </div>
    </>
  );
}