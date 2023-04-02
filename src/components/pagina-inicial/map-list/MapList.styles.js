import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  imagelist: {
    paddingRight: '10px !important',
    margin: '0 !important',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'var(--primary-blue)',
      borderRadius: '16px',
    },
  },
}));
