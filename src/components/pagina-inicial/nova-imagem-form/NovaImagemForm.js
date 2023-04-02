import axios from 'axios';
import { MultipleTextInputs, TextInput } from 'components';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { API_BASE_URL } from 'services/constants';
import { toast } from 'react-toastify';
import {
  StyledClearAllButton,
  StyledClearAllIcon,
  StyledPrimaryButton,
  useStyles,
} from './NovaImagemForm.styles';
import {
  MultipleTextInputsFields,
  novaImagemEmptyValues,
  TextInputsFields,
} from './NovaImagemFormFields';

const abortController = new AbortController();
export default function NovaImagemForm({
  selectedSensors = [],
  setSelectedSensors,
  sensorsPositions,
  setIsNewImageFormVisible,
  preSelectedFields = {},
}) {
  const methods = useForm({
    defaultValues: preSelectedFields || novaImagemEmptyValues,
  });
  const { handleSubmit, reset, getValues, control } = methods;
  const watchSensors = useWatch({ control, name: 'sensors' });
  const styles = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [sensorOptions, setSensorOptions] = useState([]);

  async function onSubmit() {
    setIsLoading(true);

    const files = new FormData();
    const imagefile = document.querySelector('#file');
    files.append('file', imagefile.files[0]);

    axios
      .post(`${API_BASE_URL}/image`, files, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((imageId) => {
        const mapBody = createMapBody(imageId);
        axios
          .post(`${API_BASE_URL}/map`, mapBody)
          .then(() => {
            toast.success('Mapa cadastrado com sucesso', {
              position: toast.POSITION.BOTTOM_LEFT,
              autoClose: 4000,
            });
            setIsLoading(false);
            setIsNewImageFormVisible(false);
          })
          .catch((error) => {
            toast.error(`Erro ao salvar mapa - ${error.message}`, {
              position: toast.POSITION.BOTTOM_LEFT,
              autoClose: 4000,
            });
            setIsLoading(false);
            setIsNewImageFormVisible(false);
          });
        setIsLoading(false);
        setIsNewImageFormVisible(false);
      })
      .catch((error) => {
        toast.error(`Erro ao salvar imagem - ${error.message}`, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
        setIsLoading(false);
      });
  }

  const createMapBody = (image_id) => {
    const formData = getValues();
    const sensors = selectedSensors.map((sensor) => {
      const sensorKey = `${sensor.name.replace(/\s+/g, '')}`;
      const { x, y } = sensorsPositions[sensorKey];
      return {
        x,
        y,
        sensor_id: sensor.id,
        sensor_name: sensor.name,
      };
    });
    return {
      name: formData.name,
      description: formData.description,
      image_id,
      sensors,
    };
  };

  const onClearAll = () => {
    reset(novaImagemEmptyValues);
  };

  const getSensors = () => {
    axios
      .post(`${API_BASE_URL}/search/sensor`, {
        query: '.*',
        signal: abortController.signal,
      })
      .then((response) => {
        setSensorOptions(
          response.data.map((sensor) => ({
            name: sensor.name,
            id: sensor._id,
            description: sensor.description,
          }))
        );
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

  useEffect(() => {
    getSensors();
    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    if (watchSensors) {
      setSelectedSensors(
        watchSensors.map((sensor) =>
          sensorOptions.find((option) => option.name === sensor)
        )
      );
    }
  }, [watchSensors]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.headWrapper}>
        <p className={styles.title}>Cadastrar Novo Mapa</p>

        <StyledClearAllButton
          onClick={onClearAll}
          variant="outlined"
          startIcon={<StyledClearAllIcon />}
        >
          Limpar Campos
        </StyledClearAllButton>
      </div>
      {TextInputsFields.map((field) => (
        <TextInput
          key={field.name}
          name={field.name}
          control={control}
          label={field.label}
          placeholder={field.placeholder}
          helperText={field.helperText}
        />
      ))}
      {MultipleTextInputsFields.map((field) => (
        <MultipleTextInputs
          key={field.name}
          name={field.name}
          control={control}
          isForm
          freeSolo={false}
          label={field.label}
          placeholder={field.placeholder}
          helperText={field.helperText}
          options={
            field.name === 'sensors' ? sensorOptions.map((s) => s.name) : []
          }
          style={{ margin: '20px 0', width: '100%' }}
        />
      ))}
      <StyledPrimaryButton
        onClick={handleSubmit(onSubmit)}
        loading={isLoading}
        variant="contained"
      >
        Salvar alterações
      </StyledPrimaryButton>
    </div>
  );
}
