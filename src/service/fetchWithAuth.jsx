import { useNavigate } from "react-router";
import { setEmail, setId, setPhoto, setUsername } from "../redux/reducers/user";
import { useDispatch } from "react-redux";

export function useFetchWithAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  return async (url, options = {},) => {
    const preUrl = import.meta.env.VITE_JOURNEL_BACKEND_API_URL;
    const response = await fetch(`${preUrl}${url}`, {
      ...options,
      credentials: 'include',
    });

    const contentType = response.headers.get("content-type");
    const body = contentType && contentType.includes("application/json")
      ? await response.json()
      : {};

    if (response.status === 401) {
      if (body?.message === 'Token expired') {
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
        navigate('/');
        // TODO alert
        return;
      }
    }

    if (!response.ok) {
      throw {
        status: response.status,
        message: body?.message || 'Unknown error',
        body: body,
      }
    }

    return body;
  }
}
