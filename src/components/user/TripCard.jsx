import React from 'react';
import { styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const TripPhoto = styled('img')({
  width: '150px',
  height: '100px',
  borderRadius: '.5em',
  objectFit: 'cover',
})

const Card = styled(Paper)({
  display: 'flex',
  alignItems: 'center',
  padding: '1em',
  width: '100%',
  borderRadius: '.5em',
  boxSizing: 'border-box'
})

function TripCard(props) {
  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item>
          <TripPhoto src="https://images.unsplash.com/photo-1609433635932-6571b56f4fd4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"/>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant='h5'>
                Chicago 2021
              </Typography>
              <Typography gutterBottom variate="body1">
                This is my plan for a one week trip to Chicago in over Christmas 2021.
              </Typography>
              <Typography variant="body1" color='textSecondary'>
                12/23/2021 - 12/30/2021
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
);
}

export default TripCard;
