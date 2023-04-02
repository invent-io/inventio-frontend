import { makeStyles } from '@material-ui/core';
import { styled } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const useStyles = makeStyles(() => ({
  tableWrapper: {
    alignItems: 'center',
    height: '100%',
  },
}));

export const StyledDataGrid = styled(DataGrid)(() => ({
  '& .MuiButton-root': {
    color: 'var(--primary-blue)',
  },
  '& .MuiButton-textPrimary': {
    color: 'var(--primary-blue) !important',
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 500,
  },
}));
