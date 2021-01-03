import React, {createContext, useState } from 'react';
import PropTypes from 'prop-types';

const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const [menuSelection, setMenuSelection] = useState('Profile');

  return (
    <ProfileContext.Provider
      value={{
        menuSelection,
        setMenuSelection
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileContext;

ProfileContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
