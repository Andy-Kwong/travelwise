import React from 'react';
import { styled } from '@material-ui/core/styles';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: '100vw',
  height: '75px',
  padding: '1em',
  paddingTop: '1.5em',
  boxSizing: 'border-box',
})

const BackButton = styled('a')({
  color: "black"
})

const Title = styled('h2')({
  marginLeft: 'auto',
  marginRight: 'auto',
})

function MenuBar(props) {
  return (
    <Container>
      <BackButton href="/">
        <ArrowBackRoundedIcon />
      </BackButton>
      <Title>{props.title} ({props.dates})</Title>
    </Container>
  );
}

export default MenuBar;
