import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  pageContainer: {
    height: 'calc(100vh - 64.5px)',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--light-gray)',
  },
  container: {
    height: '640px',
  },
  gridContainer: {
    height: '100%',
  },
}));
