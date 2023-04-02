// @ts-nocheck
import axios from 'axios';
import { MultipleTextInputs, NewImageField, SensorList } from 'components';
import { StyledButton } from 'components/shared/content-header/ContentHeader.styles';
import { StyledTextField } from 'components/shared/multiple-text-inputs/MultipleTextInputs.styles';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_BASE_URL } from 'services/constants';
import { StyledPrimaryButton, useStyles } from './Map.styles';

const MultipleTextInputsField = {
  name: 'sensors',
  label: 'Selecione os novos Sensores',
  placeholder: 'Nome dos sensores',
};

const abortController = new AbortController();
const Mapa = () => {
  const methods = useForm({ defaultValues: { sensors: [] } });
  const { reset, control } = methods;
  const watchSensors = useWatch({ control, name: 'sensors' });

  const { id } = useParams();
  const styles = useStyles();
  const history = useHistory();
  const [image, setImage] = useState('');
  const [imageChanged, setImageChanged] = useState(false);

  const [isSaveLoading, setIsSaveLoading] = useState(false);

  const [initialSensorsPositions, setInitialSensorsPositions] = useState({});
  const [sensorsPositions, setSensorsPositions] = useState({});

  const [selectedSensors, setSelectedSensors] = useState([]);
  const [temporarySelectedSensors, setTemporarySelectedSensors] = useState([]);
  const [sensorOptions, setSensorOptions] = useState([]);

  const [mapInfo, setMapInfo] = useState({
    name: '',
    description: '',
    sensors: [],
  });

  const getSelectedSensors = (mapInfo) => {
    const tempList = mapInfo.sensors?.map(async (sensor) =>
      axios
        .get(`${API_BASE_URL}/sensor/${sensor.sensor_id}`)
        .then((sensorInfo) => {
          return {
            id: sensorInfo.data._id,
            name: sensorInfo.data.name,
            description: sensorInfo.data.description,
          };
        })
        .catch((error) => {
          toast.error(
            `Error ao consultar sensores cadastrados - ${error.message}`,
            {
              position: toast.POSITION.BOTTOM_LEFT,
              autoClose: 4000,
            }
          );
        })
    );
    Promise.all(tempList).then((results) => setSelectedSensors(results));
  };

  const nonSelectedSensors = (allSensors, mapSensors) => {
    // setAllSensors(allSensors);
    return allSensors.map((sensor) => {
      if (mapSensors?.find((s) => s.sensor_id === sensor._id)) {
        return;
      }
      const nonSelectedSensor = {
        name: sensor.name,
        id: sensor._id,
        description: sensor.description,
      };
      return nonSelectedSensor;
    });
  };

  const createSensorOptions = (mapSensors) => {
    axios
      .post(`${API_BASE_URL}/search/sensor`, {
        query: '.*',
        signal: abortController.signal,
      })
      .then((response) => {
        const sensorOptions = nonSelectedSensors(response.data, mapSensors);
        setSensorOptions(sensorOptions.filter(Boolean));
      })
      .catch((error) => {
        if (error.message !== 'The user aborted a request.') {
          toast.error(
            `Erro ao consultar sensores disponíveis. ${error.message}`,
            {
              position: toast.POSITION.BOTTOM_LEFT,
              autoClose: 4000,
            }
          );
        }
      });
  };

  const getImage = (imageId) => {
    axios
      .get(`${API_BASE_URL}/image/${imageId}`, {
        responseType: 'arraybuffer',
      })
      .then((image) => {
        const base64Image = Buffer.from(image.data, 'binary').toString(
          'base64'
        );
        setImage(`data:image/jpeg;base64,${base64Image}`);
      })
      .catch((error) => {
        toast.error(`Erro ao carregar imagem do mapa- ${error.message}`, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
      });
  };

  const getPageData = () => {
    axios
      .get(`${API_BASE_URL}/map/${id}`)
      .then((results) => {
        setMapInfo(results.data);
        getSelectedSensors(results.data);
        createSensorOptions(results.data.sensors);

        const imageId = results.data.image_id.data.id;
        getImage(imageId);
      })
      .then(() => {})
      .catch((error) => {
        toast.error(`Erro ao carregar mapa - ${error.message}`, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
      });
  };

  const saveMap = () => {
    const sensors = [...selectedSensors, ...temporarySelectedSensors].map(
      (sensor) => {
        return {
          sensor_id: sensor.id,
          sensor_name: sensor.name,
          x: sensorsPositions[sensor.name?.replace(/\s+/g, '')]?.x,
          y: sensorsPositions[sensor.name?.replace(/\s+/g, '')]?.y,
        };
      }
    );

    const mapData = { ...mapInfo, sensors };

    axios
      .put(`${API_BASE_URL}/map/${id}`, mapData)
      .then(() => {
        toast.success('Lista de sensores salva com sucesso', {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
        reset({ sensors: [] });
        getPageData();
        setLoadingTimer();
      })
      .catch((error) => {
        toast.error(`Erro ao salvar lista de sensores - ${error.message}`, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
        setLoadingTimer();
      });
  };

  const saveImageAndMap = (imageChanged) => {
    setIsSaveLoading(true);
    if (imageChanged) {
      const files = new FormData();
      const imagefile = document.querySelector('#file');
      files.append('file', imagefile.files[0]);

      axios
        .post(`${API_BASE_URL}/image`, files, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((image_id) => {
          saveMap(image_id);
        })
        .catch((error) => {
          toast.error(`Erro ao atualizar imagem - ${error.message}`, {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 4000,
          });
          setLoadingTimer();
        });
    } else {
      saveMap();
    }
  };

  const onSaveClick = () => {
    setInitialSensorsPositions(sensorsPositions);
    saveImageAndMap(imageChanged);
  };

  const removeFromSensorList = (id) => {
    let sensors = selectedSensors.map((sensor) => {
      if (sensor.id === id) {
        return undefined;
      }
      return sensor;
    });
    sensors = sensors.filter(Boolean);

    setSelectedSensors(sensors);
    setSensorOptions((prevState) => [
      ...prevState,
      selectedSensors.find((s) => s._id === id),
    ]);
  };

  const setLoadingTimer = () => {
    setTimeout(() => {
      setIsSaveLoading(false);
    }, 1000);
  };

  const onReturnClick = () => {
    history.push(`/`);
  };

  const previewSensors = () => {
    return watchSensors.map((s) => {
      return sensorOptions.find((tempS) => tempS.name === s);
    });
  };

  useEffect(() => {
    getPageData();
    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const tempSensors = previewSensors();
    setTemporarySelectedSensors(tempSensors);
  }, [watchSensors]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        <StyledTextField
          size="medium"
          variant="standard"
          value={mapInfo.name.toLocaleUpperCase()}
          onChange={(e) =>
            setMapInfo((prevState) => ({ ...prevState, name: e.target.value }))
          }
          fullWidth
        />
        <StyledPrimaryButton
          variant="contained"
          onClick={onSaveClick}
          style={{ width: '250px' }}
          loading={isSaveLoading}
        >
          Salvar Alterações
        </StyledPrimaryButton>
        <StyledButton variant="contained" onClick={onReturnClick}>
          Voltar
        </StyledButton>
      </div>
      <div className={styles.content}>
        <div className={styles.leftContent}>
          <NewImageField
            image={image}
            temporarySelectedSensors={temporarySelectedSensors}
            setImageChanged={setImageChanged}
            selectedSensors={selectedSensors}
            sensorsPositions={sensorsPositions}
            setSensorsPositions={setSensorsPositions}
            initialSensorsPositions={initialSensorsPositions}
            setInitialSensorsPositions={setInitialSensorsPositions}
          />
          <div>
            <span className={styles.description}>Descrição: </span>
            <StyledTextField
              size="medium"
              variant="standard"
              value={mapInfo.description}
              onChange={(e) =>
                setMapInfo((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }))
              }
              fullWidth
            />
          </div>
        </div>
        <div className={styles.rightContent}>
          <h3 className={styles.sensorsTitle}>Sensores cadastrados</h3>
          <SensorList
            removeSensor={removeFromSensorList}
            selectedSensors={selectedSensors}
          />
          <h3 className={styles.sensorsTitle}>Adicionar novo sensor</h3>
          <MultipleTextInputs
            key={MultipleTextInputsField.name}
            name={MultipleTextInputsField.name}
            control={control}
            isForm
            freeSolo={false}
            textFieldVariant="standard"
            label={MultipleTextInputsField.label}
            placeholder={MultipleTextInputsField.placeholder}
            options={sensorOptions.map((s) => s?.name)}
            style={{ margin: '20px 0', width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};
export default Mapa;
