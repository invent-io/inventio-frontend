import { List, ListItemText } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import { useHistory } from 'react-router-dom';

const SensorList = ({ removeSensor, selectedSensors }) => {
  const history = useHistory();
  const onEditClick = (id) => history.push(`/sensores?id=${id}`);
  const onRemoveClick = (id) => removeSensor(id);

  return (
    <List style={{ overflow: 'auto' }}>
      {selectedSensors.map(({ id, name, description }) => (
        <div key={id}>
          <ListItem
            divider
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onRemoveClick(id)}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => onEditClick(id)}
                >
                  <EditIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={name} secondary={description} />
          </ListItem>
        </div>
      ))}
      {!selectedSensors.length && (
        <p style={{ padding: '0 20px', color: 'var(--darker-gray)' }}>
          Não há sensores cadastrados neste mapa
        </p>
      )}
    </List>
  );
};

export default SensorList;
