import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 275,
    margin: 20,
    borderColor: '#8c2f39',
    backgroundColor: '#FEF7F8',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function PendingCard({data}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="#8c2f39" gutterBottom style={{color:'#8c2f39'}}>
          <AccessTimeOutlinedIcon fontSize='small' style={{ color: '#8c2f39' }}/> Pending
        </Typography>
        <Typography variant="h5" component="h2">
          Job{bull}Title
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {data.headline}
        </Typography>
        <Typography variant="body2" component="p">
          {'"Person_name 1"'}
          <br />
          {'"Person_name 2"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" style={{color:'#8c2f39'}}>GOTO JOB</Button>
      </CardActions>
    </Card>
  );
}
