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
  boxSizing: 'border-box',
  cursor: 'pointer',
  marginBottom: '0.5em',
  marginTop: '1em',
})

function TripCard(props) {
  return (
    <Card onClick={() => props.handleClick(props.id)}>
      <Grid container spacing={2}>
        <Grid item>
          <TripPhoto src={props.photoUrl} />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant='h5'>
                {props.title}
              </Typography>
              <Typography gutterBottom variate="body1">
                {props.notes}
              </Typography>
              <Typography variant="body1" color='textSecondary'>
                {props.dates}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
);
}

export default TripCard;
