import { useState } from "react";
import { Button, FloatingLabel, Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import {setUsername, setToken, setEmail} from "../../redux/reducers/user";

export const LoginView = () => {
    const [email, setEmailInput] = useState("");
    const [password, setPassword] = useState("");
    const apiUrl = 'http://localhost:8081/api/v1'//import.meta.env.JOURNEL_BACKEND_API_URL;
    const dispatch = useDispatch();

    const login = (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password
        }

        fetch(`${apiUrl}/auth/authenticate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                // TODO alert
                console.log(response);
                return response.json();
            })
            .then(userLogged => {
                console.log(userLogged)
                if (userLogged) {
                    dispatch(setUsername(userLogged));
                    dispatch(setToken(userLogged));
                    dispatch(setEmail(userLogged))
                }
            })
            .catch(err => {
                console.log("ERROR: " + err);
            });
    };
    
    return (
        <div className="login-view w-screen p-5 flex items-center justify-center">
            <Form className="login-form p-4 rounded-xl shadow-md w-full max-w-sm"
                onSubmit={login}>
                <Form.Group className="flex flex-col items-center w-full justify-center mt-4">
                    <Image className="w-full/50 mb-5" src="logo.svg" />
                    <Form.Label className="text-lg font-semibold">Login</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3">
                    <FloatingLabel 
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3 ml-3 mr-3">
                        <Form.Control className="border bg-white border-gray-300 rounded pl-1 pr-1" 
                        type="email" 
                        required
                        value={email}
                        onChange={e => setEmailInput(e.target.value)}
                        placeholder="email@example.com" />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3  ml-3 mr-3" >
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} 
                        placeholder="Password" />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="flex justify-center mt-4">
                    <Button className="btn-default" type="submit">Login</Button>
                </Form.Group>
            </Form>
        </div>
    );
}