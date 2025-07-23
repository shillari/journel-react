import { useState } from "react";
import { Button, FloatingLabel, Form, Tab, Tabs } from "react-bootstrap"
import { ProfileView } from "../profile-view/profile-view";
import { ChangePass } from "./change-pass-view";

export const SettingsView = ({db, storage, user, userId, emailSaved, auth}) => {
  const [key, setKey] = useState('profile');

  return (
    <>
      <Tabs
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="tabs mb-3"
      fill
    >
      <Tab eventKey="profile" title="Profile">
        <ProfileView db={db} storage={storage} user={user} userId={userId} emailSaved={emailSaved} auth={auth} />
      </Tab>
      <Tab eventKey="password" title="Change password">
        <ChangePass email={emailSaved} />
      </Tab>
    </Tabs>
    </>
  )
}