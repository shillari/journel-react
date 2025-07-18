import { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Image, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {setPhoto, setUsername} from "../../redux/reducers/user";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useFetchWithAuth } from "../../service/fetchWithAuth";

export const ProfileView = ({db, storage, user, userId, emailSaved}) => {
  const fetchWithAuth = useFetchWithAuth();
  const [usernameInput, setUsernameInput] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState(new Date().toISOString().split('T')[0]);
  const [profileImg, setProfileImg] = useState('assets/user-default.png');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      // TODO error
    }

    const getUser = async () => {
      try {
        const response = await fetchWithAuth(`/user?email=${encodeURIComponent(emailSaved)}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          }
        });

        setUsernameInput(response.username);
        setEmail(response.email);
        setBirthday(response.birthday ? response.birthday : new Date().toISOString().split('T')[0]);
        setProfileImg(response.photoUrl);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    let urlSaved = profileImg;

    if (selectedFile) {
      const fileName = email.split('@')[0];
      const extension = selectedFile.name.split('.').pop(); 
      
      const storageRef = ref(storage, `profile/${fileName}_${userId}_profile_photo.${extension}`);

      await uploadBytes(storageRef, selectedFile);

      const url = await getDownloadURL(storageRef);
      await setDoc(doc(db, "users", String(userId)), {
        email: email,
        profilePhoto: url,
      }, { merge: true });
      console.log('URL: '+ url)
      setProfileImg(url);
      urlSaved = url;
    }
    
    const data = {
      username: usernameInput,
      email: email,
      birthday: birthday,
      photoUrl: urlSaved,
    }

    try {
      const response = await fetchWithAuth(`/user`, {
        method:"PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        }
      });

      setUsernameInput(response.username);
      setEmail(response.email);
      setBirthday(response.birthday);
      setProfileImg(response.photoUrl);
      dispatch(setUsername(response));
      dispatch(setPhoto(response));
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setSelectedFile(file);
        setProfileImg(URL.createObjectURL(file));
      } catch (err) {
        console.log('Image error: ' + err);
      }
    }
  }

  return (
    <div className="flex flex-col justify-center items-center max-w-full h-full mt-10">
      {loading ? 
        <div className="flex justify-center align-middle space-x-1">
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" size="sm" />
          </div>
        :
        <Form className="w-full max-w-2xl" onSubmit={updateUser}>
        <Form.Group className="mb-3 flex flex-col justify-center items-center">
          <div className="flex">
            <Image className="bg-gray-100 w-40 h-40 rounded-full border-1 shadow-2xl shadow-stone-500 object-cover" src={profileImg ? profileImg : "assets/user-default.png"} alt="profile preview" />
            <Form.Control
                type="file"
                id="profilePhotoInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleChange}
              />

            <label htmlFor="profilePhotoInput">
              <Button className="btn-default p-0 px-1" as="span">
                <span className="material-icons md-18">edit</span>
              </Button>
            </label>
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel 
            controlId="floatingInputName"
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
            controlId="floatingInputEmail"
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
    }
    </div>
  );
}