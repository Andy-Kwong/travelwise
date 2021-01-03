import React from 'react';
import { styled } from '@material-ui/core/styles';

const Container = styled('div')({
  display: 'flex',
  flexDirection: "column",
  alignItems: 'flex-start',
  padding: '3em',
  height: '100vh',
  width: '100%',
  boxSizing: 'border-box',
  lineHeight: '0',
  overflow: 'scroll',
  backgroundColor: '#f0f2f4',
})

function ProfileTab(props) {
  return (
    <Container>
      <h1>Good Afternoon, Mr. Poopy B.</h1>
    </Container>
  );
}

export default ProfileTab;
