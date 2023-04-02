import { makeStyles } from '@material-ui/core';
// import { LoadingButton } from '@mui/lab';
// import { styled } from '@mui/material';

export const useStyles = makeStyles(() => ({
  wrapper: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    height: '90%',
    border: '1px solid black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewImageWrapper: {
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '500px',
    height: '400px',
    position: 'relative',
  },
  previewImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    visibility: 'hidden',
  },
  imageContainer: {
    width: '90%',
    height: '80%',
    display: 'flex',
    gap: 16,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  options: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    bottom: 0,
    position: 'absolute',
    gap: 16,
  },
  labelOptions: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  option: {
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    gap: 8,
  },
  marker: {
    height: '16px',
    width: '16px',
    borderRadius: '50%',
    color: 'var(--white)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'var(--primary-blue)',
    cursor: 'grab',
    opacity: '0.8',
    '&:hover': {
      opacity: '1',
    },
    '&:active': {
      cursor: 'grabbing',
    },
  },
  optionLabel: {
    height: '30px',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    padding: '0 8px',
    color: 'var(--white)',
    opacity: '0.8',
    '&:hover': {
      opacity: '1',
    },
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  }
}));
