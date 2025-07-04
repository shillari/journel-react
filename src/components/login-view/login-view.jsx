import { useState } from "react";
import { Button, FloatingLabel, Image, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import {setUsername, setEmail, setId, setPhoto} from "../../redux/reducers/user";
import { useFetchWithAuth } from "../../service/fetchWithAuth";
import { AlertAutoDismiss } from "../../common/AlertAutoDismiss";

export const LoginView = () => {
    const fetchWithAuth = useFetchWithAuth();
    const [email, setEmailInput] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const [showPass, setShowPass] = useState(false);

    const login = async (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password
        }

        try {
            const response = await fetchWithAuth(`/auth/authenticate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response) {
                dispatch(setUsername(response));
                dispatch(setPhoto(response));
                dispatch(setEmail(response));
                dispatch(setId(response));
            }
        } catch (err) {
            console.log(err);
            setMessage("Email or password invalid");
            setShowAlert(true);
        }

    };
    
    return (
        <div className="login-view w-screen p-5 flex items-center justify-center">
            {showAlert && 
                <AlertAutoDismiss message={message} variant="danger" onClose={() => {setShowAlert(false); setMessage('');}}/>
            } 
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
                <Form.Group className="mb-3 ml-3 mr-3" >
                    <InputGroup>
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control type={showPass ? 'text' : 'password'}
                            value={password}
                            onChange={e => setPassword(e.target.value)} 
                            placeholder="Password" />
                        </FloatingLabel>
                        <Button className="bg-white !border-gray-200 !border-l-0" variant="outline-secondary" onClick={() => setShowPass(prev => !prev)}>
                            <span className="material-icons-outlined text-gray-500 md-18">{showPass ? 'visibility' : 'visibility_off'}</span>
                        </Button>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="flex justify-center mt-4">
                    <Button className="btn-default" type="submit">Login</Button>
                </Form.Group>
            </Form>
        </div>
    );
}