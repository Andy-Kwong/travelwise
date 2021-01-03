import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import TripContext from "../../context/TripContext";
import TripCard from "./TripCard";
import { getTripById } from "../../context/api";

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
  const { userTrips, setTripData } = useContext(TripContext);
  const history = useHistory();
  console.log('userTrips:', userTrips);
  const handleClick = async (tripId) => {
    // Call api to get trip by ID
    const data = await getTripById(tripId);
    console.log(data);
    // update trip data
    setTripData(data);
    // route to /trip
    history.push('/trip');
  }

  return (
    <Container>
      <h2>Upcoming Trips</h2>
      {
        userTrips.map(trip => (
          <TripCard
            id={trip._id}
            title={trip.title}
            owner={trip.owner}
            notes={trip.notes}
            dates={trip.dates}
            photoUrl={trip.photoUrl}
            key={trip._id}
            handleClick={handleClick}
          />
        ))
      }
    </Container>
  );
}

export default TripTab;
