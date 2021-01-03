import React, { useContext } from 'react';
import { styled } from '@material-ui/core/styles';
import TripContext from "../../context/TripContext";
import TripCard from "./TripCard";

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

function TripTab(props) {
  const { tripData, menuSelection } = useContext(TripContext);
  console.log(tripData);

  return (
    <Container>
      <TripCard />
    </Container>
  );
}

export default TripTab;
