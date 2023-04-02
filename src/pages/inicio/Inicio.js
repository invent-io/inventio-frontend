import {
  ContentHeader,
  MapList,
  NewImageField,
  NovaImagemForm,
} from 'components';
import { useState } from 'react';
import { useStyles } from './Inicio.styles';

export default function Inicio() {
  const styles = useStyles();
  const [isNewImageFormVisible, setIsNewImageFormVisible] = useState(false);
  const [selectedSensors, setSelectedSensors] = useState([]);
  const [sensorsPositions, setSensorsPositions] = useState({});
  const [initialSensorsPositions, setInitialSensorsPositions] = useState({});

  const onCadastrarNovoClick = () => {
    setIsNewImageFormVisible(!isNewImageFormVisible);
  };

  return (
    <div className={styles.pageWrapper}>
      <ContentHeader
        title="Página Inicial"
        buttonLabel={isNewImageFormVisible ? 'Voltar' : 'Cadastrar Novo Mapa'}
        onButtonClick={onCadastrarNovoClick}
        hasInput={false}
      />
      <div className={styles.content}>
        {isNewImageFormVisible ? (
          <div className={styles.newImageWrapper}>
            <NewImageField
              selectedSensors={selectedSensors}
              sensorsPositions={sensorsPositions}
              setSensorsPositions={setSensorsPositions}
              initialSensorsPositions={initialSensorsPositions}
              setInitialSensorsPositions={setInitialSensorsPositions}
            />
            <NovaImagemForm
              selectedSensors={selectedSensors}
              setSelectedSensors={setSelectedSensors}
              sensorsPositions={sensorsPositions}
              setIsNewImageFormVisible={setIsNewImageFormVisible}
            />
          </div>
        ) : (
          <MapList />
        )}
      </div>
    </div>
  );
}
