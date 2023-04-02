// @ts-nocheck
import { makeStyles } from '@material-ui/core';
import { pageWrapper } from 'utils';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material';

export const useStyles = makeStyles((theme) => ({
  pageWrapper,
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    height: 'fit-content',
    width: 'auto',
    gap: '20px',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  title: {
    width: '100%',
    fontSize: '24px',
    textTransform: 'uppercase',
    fontWeight: 500,
    margin: '0',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto 0 0',
      textAlign: 'left',
      width: 'fit-content',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  sensorsTitle: {
    fontWeight: 500,
    fontSize: '20px',
    margin: '10px 0',
  },
  historyTitle: {
    fontWeight: 500,
    fontSize: '20px',
  },
  leftContent: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    height: '800px',
    gap: '12px',
  },
  rightContent: {
    flex: 1,
  },
  description: {
    fontSize: '20px',
    fontWeight: 500,
  },
  descriptionContent: {
    fontSize: '18px',
  },
}));

export const StyledPrimaryButton = styled(LoadingButton)(() => ({
  backgroundColor: 'var(--primary-blue)',
  width: 'fit-content',
  margin: '6px',
  height: 'fit-content',
}));