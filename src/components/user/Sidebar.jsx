import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';
import { Home, Flight, Settings, ArrowRight } from "@material-ui/icons";
import TripContext from "../../context/TripContext";

const Container = styled('div')({
  display: 'flex',
  position: 'sticky',
  top: 0,
  flexDirection: 'column',
  padding: '2em 1em',
  minWidth: '350px',
  height: '100vh',
  backgroundColor: 'rgb(20, 20, 30)',
})

const UserInfo = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '3em',
  padding: '1em',
})

const UserPhoto = styled('div')({
  width: '75px',
  height: '75px',
  border: '2px solid black',
  borderRadius: '50%',
  marginRight: '1.2em',
  backgroundImage: props => `url(${props.url})`,
  backgroundPosition: 'center',
  backgroundSize: 'contain',
  boxSizing: 'border-box',
})

const UserName = styled('span')({
  fontSize: '1.2em',
  fontWeight: 'bold',
  color: '#f0f2f4',
})

const MenuSection = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  color: '#f0f2f4',
})

const MenuItem = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  padding: '1.2em 1em',
  borderRadius: '0.5em',
  marginBottom: '0.5em',
  cursor: 'pointer',
  backgroundColor: props => (
    props.selected
      ? 'rgb(23 119 168)'
      : 'rgb(20, 20, 30)'
  ),
  color: props => (
    props.selected
      ? '#f0f2f4'
      : '#bdc8cf'
  ),
  position: 'relative',
})

const MenuText = styled('span')({
  marginLeft: '1em',
})

const RightArrow = styled(ArrowRight)({
  justifySelf: 'flex-end',
  position: 'absolute',
  margin: 'auto',
  top: '0',
  bottom: '0',
  right: '10px'
})

function Sidebar(props) {
  const { menuSelection, setMenuSelection } = useContext(TripContext);

  return (
    <Container>
      <UserInfo>
        <UserPhoto url='https://randomuser.me/api/portraits/men/43.jpg' />
        <UserName>Mr. Poopy B.</UserName>
      </UserInfo>
      <MenuSection>
        <MenuItem
          selected={menuSelection === 'Profile'}
          onClick={() => setMenuSelection('Profile')}
        >
          <Home fontSize="small" />
          <MenuText>Profile</MenuText>
          {menuSelection === 'Profile' && <RightArrow fontSize="medium" />}
        </MenuItem>
        <MenuItem
          selected={menuSelection === 'Trips'}
          onClick={() => setMenuSelection('Trips')}
        >
          <Flight fontSize="small" />
          <MenuText>Trips</MenuText>
          {menuSelection === 'Trips' && <RightArrow fontSize="medium" />}
        </MenuItem>
        <MenuItem
          selected={menuSelection === 'Settings'}
          onClick={() => setMenuSelection('Settings')}
        >
          <Settings fontSize="small" />
          <MenuText>Settings</MenuText>
          {menuSelection === 'Settings' && <RightArrow fontSize="medium" />}
        </MenuItem>
      </MenuSection>
    </Container>
  );
}

export default Sidebar;
