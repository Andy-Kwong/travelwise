import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import {
  IconButton,
  TextField,
  Menu,
  MenuItem,
  Button,
} from '@material-ui/core';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  boxSizing: 'border-box',
})

const Title = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginBottom: '1em',
  width: '100%',
})

const TitleText = styled('a')({
  fontWeight: 'bold',
  fontSize: '1.2em',
  width: '300px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  color: 'black',
  textDecoration: 'none',
})

const Description = styled('span')({
  height: props => !props.isEditing && '3.5em',
  width: '100%',
  overflow: 'hidden',
  lineHeight: '1.2em',
  position: 'relative',
  marginBottom: '0.5em',
  '&:after': {
    content: props => !props.isEditing && '""',
    textAlign: 'right',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '25%',
    height: '1.2em',
    background: 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 50%)',
  }
})

const Location = styled('span')({
  marginBottom: '0.5em',
})

const Time = styled('span')({

})

const EditButton = styled(IconButton)({
  marginLeft: 'auto',
  cursor: 'pointer',
})

const DropdownMenu = styled('div')({
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: '0.5em',
  border: '1px solid white',
  '&:hover': {
    border: '1px solid black',
  },
  transition: 'border .2s',
  cursor: 'pointer',
  boxSizing: 'border-box',
  paddingLeft: '0.5em',
  marginLeft: '0.5em',
})

function Info(props) {
  const {
    _id,
    title,
    content,
    link,
    location,
    address,
    duration,
    notes,
  } = props.event;

  const [editFields, setEditFields] = useState(false);
  const [titleField, setTitle] = useState(title);
  const [contentField, setContent] = useState(content);
  const [linkField, setLink] = useState(link);
  const [locationField, setLocation] = useState(location);
  const [durationField, setDuration] = useState(duration);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const durationOptions = [
    0.5, 1, 2, 3, 4, 5, 6,
    7, 8, 9, 10, 11, 12
  ];

  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeDurationMenu = (e) => {
    console.log('Menu Item:', e.target.value);
    e.target.value === 0 ? setDuration(0.5) : e.target.value && setDuration(Number(e.target.value));
    setAnchorEl(null);
  };

  const closeOptionsMenu = (e) => {
    if (e.target.id === 'edit') {
      setEditFields(true);
    } else if (e.target.id === 'delete') {
      const toDelete = true;
      props.handleEdit(_id, toDelete);
    }

    setAnchorEl(null);
  }

  const handleSubmit = () => {
    const editedEvent = {
      _id,
      title: titleField,
      content: contentField,
      link: linkField,
      location: locationField,
      address,
      duration: durationField,
      notes,
    };

    props.handleEdit(editedEvent);
    setEditFields(false);
  };

  return (
    <Container>
      {
        editFields
          ? <>
            <Title>
              <TitleText>
                <TextField
                  defaultValue={titleField}
                  onChange={(e) => setTitle(e.target.value)}
                  label="Title"
                  fullWidth
                />
              </TitleText>
            </Title>
            <Title>
              <TextField
                defaultValue={linkField}
                onChange={(e) => setLink(e.target.value)}
                label="Link"
                fullWidth
              />
            </Title>
            <Description isDragging={props.isDragging} isEditing={true}>
              <TextField
                defaultValue={contentField}
                onChange={(e) => setContent(e.target.value)}
                label="Description"
                fullWidth
                multiline
                rowsMax={6}
              />
            </Description>
            <Location>
              <TextField
                defaultValue={locationField}
                onChange={(e) => setLocation(e.target.value)}
                label="Location"
                fullWidth
              />
            </Location>
            <Time>
              Duration:
              <DropdownMenu onClick={openMenu}>
                {durationField} hours
                <ArrowDropDownIcon style={{fontSize: 16}} />
              </DropdownMenu>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={closeDurationMenu}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                    width: '20ch',
                  },
                }}
              >
                {durationOptions.map((option) =>
                  <MenuItem
                    key={option}
                    selected={option === durationField}
                    value={option}
                    onClick={closeDurationMenu}
                  >
                    {option} hours
                  </MenuItem>
                )}
              </Menu>
            </Time>
            <Button
              color="primary"
              variant="outlined"
              style={{marginTop: '0.5em'}}
              onClick={handleSubmit}
            >
              Done Editing
            </Button>
          </>
          : <>
            {
              link
                ?
                <Title>
                  <TitleText href={linkField} target="_blank">
                    {titleField}
                    <OpenInNewIcon style={{fontSize: 12, marginLeft: '0.25em'}}/>
                  </TitleText>
                  <EditButton
                    component="span"
                    size="small"
                    disableRipple={true}
                    onClick={openMenu}
                  >
                    <MoreVertIcon style={{fontSize: 16, marginLeft: '.1em'}}/>
                  </EditButton>
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={closeOptionsMenu}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem id="edit" onClick={closeOptionsMenu}>
                      <EditIcon fontSize="small" style={{marginRight: 'auto'}} />
                      Edit Event
                    </MenuItem>
                    <MenuItem id="delete" onClick={closeOptionsMenu}>
                      <DeleteForeverIcon fontSize="small" style={{marginRight: '1em'}} />
                      Delete Event
                    </MenuItem>
                  </Menu>
                </Title>
                :
                <Title>
                  <TitleText>{titleField}</TitleText>
                  <EditButton
                    component="span"
                    size="small"
                    disableRipple={true}
                    onClick={openMenu}
                  >
                    <MoreVertIcon style={{fontSize: 16, marginLeft: '.1em'}}/>
                  </EditButton>
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={closeOptionsMenu}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem id="edit" onClick={closeOptionsMenu}>
                      <EditIcon fontSize="small" style={{marginRight: 'auto'}} />
                      Edit Event
                    </MenuItem>
                    <MenuItem id="delete" onClick={closeOptionsMenu}>
                      <DeleteForeverIcon fontSize="small" style={{marginRight: '1em'}} />
                      Delete Event
                    </MenuItem>
                  </Menu>
                </Title>
            }
            <Description isDragging={props.isDragging}>{contentField}</Description>
            <Location>Location: {locationField}</Location>
            {
              duration < 1
                ? <Time>Duration: {60 * durationField} minutes</Time>
                : <Time>Duration: {durationField} {durationField === 1 ? 'hour' : 'hours'}</Time>
            }
          </>
      }
    </Container>
  );
};

export default Info;
