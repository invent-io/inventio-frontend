import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { ImageList, ImageListItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_BASE_URL } from 'services/constants';
import { useStyles } from './MapList.styles';

export default function MapList() {
  const styles = useStyles();
  const history = useHistory();
  const [maps, setMaps] = useState([]);

  const onInfoClick = (id) => {
    history.push(`/mapa/${id}`);
  };

  async function getImages() {
    axios
      .get(`${API_BASE_URL}/map`)
      .then((mapResults) => {
        const mapsData = mapResults.data.map((map) =>
          axios
            .get(`${API_BASE_URL}/image/${map.image_id.data.id}`, {
              responseType: 'arraybuffer',
            })
            .then((image) => {
              const base64Image = Buffer.from(image.data, 'binary').toString(
                'base64'
              );
              return {
                id: map._id,
                imageId: map.image_id.data.id,
                src: `data:image/jpeg;base64,${base64Image}`,
                title: map.name,
                author: '',
              };
            })
            .catch((error) => {
              toast.error(`Erro ao carregar imagem do mapa- ${error.message}`, {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose: 4000,
              });
              return {};
            })
        );
        return Promise.all(mapsData);
      })
      .then((mapsData) => {
        setMaps(mapsData);
      })
      .catch((error) => {
        toast.error(`Erro ao carregar mapas - ${error.message}`, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
      });
  }

  async function onDeleteClick(map) {
    await axios
      .delete(`${API_BASE_URL}/map/${map.id}`)
      .then(() => {
        toast.success('Mapa excluido com sucesso', {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
      })
      .catch((error) => {
        toast.error(`Erro ao excluir mapa - ${error.message}`, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
      });

    await axios.delete(`${API_BASE_URL}/image/${map.imageId}`);

    getImages();
  }

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <ImageList className={styles.imagelist} cols={3} rowHeight={300} gap={12}>
        {maps.map((map, id) => (
          <ImageListItem key={id}>
            <img
              src={map.src}
              alt={map.title}
              loading="lazy"
              style={{ overflow: 'hidden' }}
            />
            <ImageListItemBar
              sx={{ cursor: 'pointer' }}
              title={map.title}
              subtitle={map.author}
              position="top"
              onClick={() => onInfoClick(map.id)}
              actionIcon={
                <IconButton
                  sx={{
                    color: 'rgba(255, 255, 255, 0.54)',
                    pointerEvents: 'none',
                  }}
                  aria-label={`info about ${map.title}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
            <ImageListItemBar
              sx={{ cursor: 'pointer' }}
              title=""
              subtitle=""
              position="bottom"
              onClick={() => onDeleteClick(map)}
              actionIcon={
                <IconButton
                  sx={{
                    color: 'rgba(255, 255, 255, 0.54)',
                    pointerEvents: 'none',
                  }}
                  aria-label={`info about ${map.title}`}
                >
                  <DeleteIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
