import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
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

const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
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

  const upcomingTrips = [];
  let pastTrips = [];
  for (let i = userTrips.length - 1; i >= 0; i--) {
    const currentDate = Date.parse(new Date());
    const tripDate = Date.parse(userTrips[i].dates.slice(0, 10));
    const currentTrip = {...userTrips[i]};
    if (currentDate <= tripDate) {
      upcomingTrips.push(currentTrip);
    } else {
      pastTrips.push(currentTrip);
    }
  }
  upcomingTrips.sort((a, b) => {
    const aDate = Date.parse(a.dates.slice(0, 10));
    const bDate = Date.parse(b.dates.slice(0, 10));
    return aDate - bDate;
  })
  pastTrips.sort((a, b) => {
    const aDate = Date.parse(a.dates.slice(0, 10));
    const bDate = Date.parse(b.dates.slice(0, 10));
    return bDate - aDate ;
  })

  return (
    <Container>
      <h2>Upcoming Trips</h2>
      {
        upcomingTrips.map(trip => (
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
      <p> </p>
      <h2>Past Trips</h2>
      {
        pastTrips.map(trip => (
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
