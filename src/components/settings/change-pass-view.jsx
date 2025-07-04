import { useState } from "react";
import { Button, FloatingLabel, Form, InputGroup } from "react-bootstrap"
import { useFetchWithAuth } from "../../service/fetchWithAuth";
import { useDispatch } from "react-redux";
import { AlertAutoDismiss } from "../../common/AlertAutoDismiss";
import { setEmail, setId, setPhoto, setUsername } from "../../redux/reducers/user";

export const ChangePass = ({ email}) => {
  const fetchWithAuth = useFetchWithAuth();
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showCurrPass, setShowCurrPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();

    const body = {
      email: email,
      curr_pass: currentPassword,
      new_pass: newPassword,
    }

    try {
      const response = await fetchWithAuth(`/auth/password`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response) {
        dispatch(setUsername(response));
        dispatch(setPhoto(response));
        dispatch(setEmail(response));
        dispatch(setId(response));
        setMessage('Password updated.');
        setVariant('success');
        setShowAlert(true);
      }
    } catch (err) {
      console.log(err);
      if (err.status === 401) {
        setMessage('Current password is wrong.');
        setVariant('danger');
        setShowAlert(true);
      }
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {showAlert &&
        <AlertAutoDismiss message={message} variant={variant} onClose={() => setShowAlert(false)} />
      }
      <Form className="min-w-100" onSubmit={handleUpdate}>
        <Form.Group className="mb-3 ml-3 mr-3 flex w-full items-center" >
          <InputGroup>
            <FloatingLabel  label="Current Password" className="flex-grow-1">
                <Form.Control type={showCurrPass ? 'text' : 'password'}
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}  />
            </FloatingLabel>
            <Button className="bg-white !border-gray-200 !border-l-0" variant="outline-secondary" onClick={() => setShowCurrPass(prev => !prev)}>
              <span className="material-icons-outlined text-gray-500 md-18">{showCurrPass ? 'visibility' : 'visibility_off'}</span>
            </Button>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3 ml-3 mr-3 flex w-full items-center" >
          <InputGroup>
            <FloatingLabel label="New Password">
                <Form.Control type={showNewPass ? 'text' : 'password'}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}  />
            </FloatingLabel>
            <Button className="bg-white !border-gray-200 !hover:text-black !border-l-0" variant="outline-secondary" onClick={() => setShowNewPass(prev => !prev)}>
              <span className="material-icons-outlined text-gray-500 md-18">{showNewPass ? 'visibility' : 'visibility_off'}</span>
            </Button>
          </InputGroup>
        </Form.Group>
        <Form.Group className="flex justify-center mt-4">
            <Button className="btn-default" type="submit">Save</Button>
        </Form.Group>
      </Form>
    </div>
  )
}