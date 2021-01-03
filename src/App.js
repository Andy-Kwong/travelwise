import React from 'react';
import Login from './components/login/Login';
import Trip from "./components/trip/Trip";
import Profile from "./components/user/Profile";
import { TripContextProvider } from "./context/TripContext";

function App() {
  return (
    <div>
      {/*<TripContextProvider>*/}
      {/*  <Trip />*/}
      {/*</TripContextProvider>*/}
      <TripContextProvider>
        <Profile />
      </TripContextProvider>
    </div>
  );
}

export default App;
