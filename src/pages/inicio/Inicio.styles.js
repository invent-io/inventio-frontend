import { makeStyles } from '@material-ui/core';
import { pageWrapper } from 'utils';

export const useStyles = makeStyles(() => ({
  pageWrapper,
  content: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'row',
    width: '100%',
    height: '95%',
    border: '1px solid var(--light-gray)',
    borderRadius: '4px',
  },
  newImageWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: '0 8px',
    gap: 20,
  },
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
