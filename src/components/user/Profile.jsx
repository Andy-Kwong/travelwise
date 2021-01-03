import React, { useContext } from 'react';
import Sidebar from "./Sidebar";
import { styled } from '@material-ui/core/styles';
import TripTab from "./TripTab";
import TripContext from "../../context/TripContext";
import ProfileTab from "./ProfileTab";
import SettingsTab from "./SettingsTab";

const Container = styled('div')({
  display: 'flex',
  width: '100%',
})

function Profile(props) {
  const { menuSelection } = useContext(TripContext);
  return (
    <Container>
      <Sidebar />
      {menuSelection === 'Profile' && <ProfileTab />}
      {menuSelection === 'Trips' && <TripTab />}
      {menuSelection === 'Settings' && <SettingsTab />}
    </Container>
  );
}

export default Profile;
