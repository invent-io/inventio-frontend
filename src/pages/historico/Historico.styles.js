import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  pageContainer: {
    height: 'calc(100vh - 112.5px)',
    display: 'flex',
    flexDirection: 'column',
    padding: '26px',
    gap: '18px',
  },
  dateWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: '12px',
  },
  dateError: {
    color: 'var(--red)',
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: '1.66',
    letterSpacing: '0.03333em',
    textAlign: 'center',
    margin: '4px 14px 0 14px',
  },
}));
