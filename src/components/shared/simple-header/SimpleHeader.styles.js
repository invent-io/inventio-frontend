import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    height: 'fit-content',
    width: 'auto',
    minHeight: '40px',
  },
  title: {
    width: '100%',
    fontSize: '24px',
    textTransform: 'uppercase',
    fontWeight: 500,
    margin: '0',
    textAlign: 'left',
  },
}));
