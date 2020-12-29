import React from 'react';
import { styled } from '@material-ui/core/styles';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  boxSizing: 'border-box',
})

const Title = styled('a')({
  marginBottom: '1em',
  width: '100%',
  color: 'black',
  textDecoration: 'none',
})

const TitleText = styled('span')({
  fontWeight: 'bold',
  fontSize: '1.2em',
  width: '300px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
})

const Description = styled('span')({
  height: '3.6em',
  width: '100%',
  overflow: 'hidden',
  lineHeight: '1.2em',
  position: 'relative',
  marginBottom: '0.5em',
  '&:after': {
    content: '""',
    textAlign: 'right',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '25%',
    height: '1.2em',
    background: props => (
      props.isDragging
        ? 'linear-gradient(to right, rgba(144, 238, 144, 0), rgba(144, 238, 144, 1) 50%)'
        : 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 50%)'
    ),
  }
})

const Location = styled('span')({
  marginBottom: '0.5em',
})

const Time = styled('span')({

})

function Info(props) {
  return (
    <Container>
      {props.link
        ? <Title href={props.link} target="_blank">
            <TitleText>{props.title}</TitleText>
            <OpenInNewIcon style={{fontSize: 12, marginLeft: '0.25em'}} />
          </Title>
        : <Title>
            <TitleText>{props.title}</TitleText>
          </Title>}
      <Description isDragging={props.isDragging}>{props.description}</Description>
      <Location>Location: {props.location}</Location>
      <Time>Recommended time: {props.time} hours</Time>
    </Container>
  );
}

export default Info;
