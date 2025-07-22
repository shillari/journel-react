import { useState } from "react"
import { Button, FloatingLabel, Form, Image, InputGroup } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useFetchWithAuth } from "../../service/fetchWithAuth";
import { setEmail, setId, setPhoto, setUsername } from "../../redux/reducers/user";
import { AlertAutoDismiss } from "../../common/AlertAutoDismiss";

export const SignupView = () => {
  const [validated, setValidated] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchWithAuth = useFetchWithAuth();

  const signup = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setShowAlert(false);
    setMessage('');

    let missingFields = '';

    if (!name) {
      missingFields += ' name';
    }

    if (!email) {
      missingFields += ' email';
    }

    if (!password) {
      missingFields += ' password';
    }

    if (missingFields) {
      setMessage(missingFields + 'must not be empty');
      setShowAlert(true);
      return;
    }

    const data = {
      username: name,
      email: email,
      password: password,
    }

    try {
      const response = await fetchWithAuth(`/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      console.log(response)
      if (response) {
        dispatch(setUsername(response));
        dispatch(setPhoto(response));
        dispatch(setEmail(response));
        dispatch(setId(response));
        navigate('/');
      }
    } catch (error) {
      if (error.status === 409) {
        setMessage("Email already registered");
        setShowAlert(true);
      }
    }
  }

  return (
    <div className="login-view w-screen min-h-screen pt-16 overflow-y-auto p-5 flex flex-col items-center justify-start">
      {showAlert && <AlertAutoDismiss message={message} onClose={() => {setShowAlert(false); setMessage('');}} />}
      <Form noValidate validated={validated} className="login-form p-4 rounded-xl shadow-md w-full max-w-sm"
          onSubmit={signup}>
        <Form.Group className="flex flex-col items-center w-full justify-center mt-4">
          <Image className="w-full/50 mb-5" src="logo.svg" />
          <Form.Label className="text-lg font-semibold">Create account</Form.Label>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel 
              controlId="floatingNameInput"
              label="Name"
              className="mb-3 ml-3 mr-3">
              <Form.Control className="border bg-white border-gray-300 rounded pl-1 pr-1" 
              type="text" 
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="John Doe" />
          </FloatingLabel>
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
            <Form.Text className="p-1 mx-2 rounded" id="passwordHelpBlock" muted>
              Your password must:
              <br/>
              - be at least 8 characters long, 
              <br/>
              - contain letters and numbers,
              <br/>
              - and must not contain spaces, special characters, or emoji.
            </Form.Text>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control type={showPass ? 'text' : 'password'}
                value={password}
                aria-describedby="passwordHelpBlock"
                required
                minLength={8}
                onChange={e => setPassword(e.target.value)} 
                placeholder="Password" />
            </FloatingLabel>
            <Button className="bg-white !border-gray-200 !border-l-0" variant="outline-secondary" onClick={() => setShowPass(prev => !prev)}>
              <span className="material-icons-outlined text-gray-500 md-18">{showPass ? 'visibility' : 'visibility_off'}</span>
            </Button>
          </InputGroup>
        </Form.Group>
        <Form.Group className="flex justify-center mt-4">
          <Button className="btn-default" type="submit">Create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}