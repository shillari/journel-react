import { useEffect, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {setUsername} from "../../redux/reducers/user";

export const ProfileView = () => {
  const apiUrl = 'http://localhost:8081/api/v1';
  const user = useSelector((state) => state.user.username);
  const emailSaved = useSelector((state) => state.user.email);
  const token = useSelector((state) => state.user.token);
  const [usernameInput, setUsernameInput] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState(new Date().toISOString().split('T')[0]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      // TODO error
    }

    fetch(`${apiUrl}/user?email=${encodeURIComponent(emailSaved)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          console.log(response);
          return response.json();
        })
        .then(response => {
          setUsernameInput(response.username);
          setEmail(response.email);
          setBirthday(response.birthday ? response.birthday : new Date().toISOString().split('T')[0]);
        });
  }, []);

  const updateUser = (e) => {
    e.preventDefault();

    const data = {
      username: usernameInput,
      email: email,
      birthday: birthday,
    }

    fetch(`${apiUrl}/user`, {
        method:"POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        } 
        return response.json();
      })
      .then(response => {
        setUsernameInput(response.username);
        setEmail(response.email);
        setBirthday(response.birthday);
        dispatch(setUsername(response));
      });

  }

  return (
    <div className="flex flex-col justify-center items-center max-w-full h-full">
      <div className="w-32 h-32 rounded-full bg-white border-2 border-black mb-5"></div>
      <Form className="w-full w-50" onSubmit={updateUser}>
        <Form.Group className="mb-3">
          <FloatingLabel 
            controlId="floatingInput"
            label="Name"
            className="mb-3 ml-3 mr-3">
            <Form.Control className="border bg-white border-gray-300 rounded pl-1 pr-1" 
            type="text" 
            value={usernameInput}
            onChange={e => setUsernameInput(e.target.value)}
            required />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel 
            controlId="floatingInput"
            label="Email address"
            className="mb-3 ml-3 mr-3">
            <Form.Control className="border bg-white border-gray-300 rounded pl-1 pr-1" 
            type="email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3 mx-5" controlId="exampleForm.ControlInput1">
          <Form.Label>Birthday</Form.Label>
          <Form.Control type="date" 
          value={birthday}
          onChange={e => setBirthday(e.target.value)}/>
        </Form.Group>
        <Form.Group className="flex justify-center mt-4">
            <Button className="btn-default" type="submit">Save</Button>
        </Form.Group>
      </Form>
    </div>
  );
}