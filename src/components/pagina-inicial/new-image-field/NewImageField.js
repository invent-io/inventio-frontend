// @ts-nocheck
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
import { Fragment, useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import ReactTooltip from 'react-tooltip';
import { StyledPrimaryButton } from '../nova-imagem-form/NovaImagemForm.styles';
import { useStyles } from './NewImageField.styles';

const NewImageField = ({
  image = null,
  temporarySelectedSensors = [],
  setImageChanged = () => {},
  selectedSensors = [],
  sensorsPositions,
  setSensorsPositions,
  initialSensorsPositions,
  setInitialSensorsPositions,
}) => {
  const styles = useStyles();
  const fileInput = useRef(null);
  const [previewImageURL, setPreviewImageURL] = useState(undefined);
  const [previewImageName, setPreviewImageName] = useState(null);
  const colors = [
    '#1b498e',
    '#13633a',
    '#63133a',
    '#633a13',
    '#3e1d8e',
    '#e50471',
    '#292d8e',
  ];

  const fileChangedHandler = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setPreviewImageURL(undefined);
      return;
    }

    setPreviewImageURL(URL.createObjectURL(event.target.files[0]));
    setPreviewImageName(event.target.files[0].name);
  };

  const onUploadFileClick = () => {
    setImageChanged(true);
    fileInput.current.click();
  };

  const defaultPosition = () => {
    return { x: 0, y: 0 };
  };

  const resetSensorsPositions = () => {
    const temp = {};
    [...selectedSensors, ...temporarySelectedSensors].forEach((sensor) => {
      temp[sensor?.name?.replace(/\s+/g, '')] = defaultPosition();
    });
    setSensorsPositions(temp);
  };

  const handleStop = (e, data) => {
    const temp = {};
    temp[data.node.dataset?.option] = {
      x: data.x,
      y: data.y === 0 ? 0 : data.y,
    };
    setSensorsPositions({ ...sensorsPositions, ...temp });
  };

  useEffect(() => {
    resetSensorsPositions();
  }, [previewImageName]);

  useEffect(() => {
    if (image) {
      setPreviewImageURL(image);
    }
  }, [image]);

  useEffect(() => {
    if (
      !Object.keys(initialSensorsPositions).length &&
      Object.keys(sensorsPositions).length
    ) {
      setInitialSensorsPositions({ ...sensorsPositions });
    }
  }, [sensorsPositions]);

  useEffect(() => {
    if (selectedSensors && selectedSensors.length > 0) {
      const temp = {};
      [...selectedSensors, ...temporarySelectedSensors].forEach((sensor) => {
        const currentSensorAlias = sensor?.name?.replace(/\s+/g, '');
        if (sensorsPositions[currentSensorAlias]) {
          temp[currentSensorAlias] = sensorsPositions[currentSensorAlias];
        } else {
          temp[currentSensorAlias] = defaultPosition();
        }
      });
      setSensorsPositions(temp);
    }
  }, [selectedSensors]);

  return (
    <div className={styles.wrapper}>
      {previewImageURL ? (
        <>
          {!image && (
            <Chip
              label={previewImageName}
              onClick={() => {
                setPreviewImageURL(null);
              }}
              icon={<DeleteIcon />}
            />
          )}
          <input
            style={{ display: 'none' }}
            type="file"
            id="file"
            name="file"
            onChange={fileChangedHandler}
            ref={fileInput}
          />
          <div className={styles.imageContainer}>
            <div
              className={styles.previewImageWrapper}
              style={{ backgroundImage: `url(${previewImageURL})` }}
            >
              <img
                src={previewImageURL}
                className={styles.previewImage}
                alt="preview"
              />
              <div className={styles.options}>
                {[...selectedSensors, ...temporarySelectedSensors].map(
                  (sensor, index) => {
                    return (
                      <div
                        className={styles.option}
                        key={sensor?.id}
                        style={{ left: index * 30 }}
                      >
                        <Draggable
                          handle=".handle"
                          defaultPosition={{
                            x: sensorsPositions
                              ? sensorsPositions[
                                  sensor?.name?.replace(/\s+/g, '')
                                ]?.x
                              : 0,
                            y: sensorsPositions
                              ? sensorsPositions[
                                  sensor?.name?.replace(/\s+/g, '')
                                ]?.y
                              : 0,
                          }}
                          position={null}
                          grid={[3, 3]}
                          scale={1}
                          onStart={() => {
                            ReactTooltip.hide();
                          }}
                          onStop={(e, data) => handleStop(e, data)}
                        >
                          <div
                            className="handle"
                            data-option={`${sensor?.name?.replace(/\s+/g, '')}`}
                            id={`${sensor?.name?.replace(/\s+/g, '')}-point`}
                            data-tip
                            data-for={`label-${sensor?.name}`}
                          >
                            <span
                              style={{ backgroundColor: `${colors[index]}` }}
                              className={`${styles.marker}`}
                            />
                          </div>
                        </Draggable>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            <div className={styles.labelOptions}>
              {[...selectedSensors, ...temporarySelectedSensors].map(
                (sensor, index) => {
                  return (
                    <Fragment key={`label-${sensor?.name}`}>
                      <span
                        onMouseOver={() => {
                          ReactTooltip.show(
                            document.querySelector(
                              `#${sensor?.name?.replace(/\s+/g, '')}-point`
                            )
                          );
                        }}
                        onFocus={() => {
                          ReactTooltip.show(
                            document.querySelector(
                              `#${sensor?.name?.replace(/\s+/g, '')}-point`
                            )
                          );
                        }}
                        onMouseLeave={() => {
                          ReactTooltip.hide();
                        }}
                        style={{ backgroundColor: `${colors[index]}` }}
                        className={styles.optionLabel}
                      >
                        {sensor?.name}
                      </span>
                      <ReactTooltip
                        id={`label-${sensor?.name}`}
                        type="error"
                        textColor="#fff"
                        backgroundColor={colors[index]}
                        effect="solid"
                      >
                        <span>{sensor?.name}</span>
                      </ReactTooltip>
                    </Fragment>
                  );
                }
              )}
            </div>
          </div>
          <div className={styles.buttons}>
            <StyledPrimaryButton
              onClick={onUploadFileClick}
              variant="contained"
            >
              Escolher outra imagem
            </StyledPrimaryButton>
            {/* {image && (
              <StyledPrimaryButton
                onClick={() => handleSaveClick(imageChanged)}
                loading={isSaveLoading}
                disabled={
                  _.isEqual(initialSensorsPositions, sensorsPositions) &&
                  !imageChanged
                }
                variant="contained"
              >
                Salvar imagem e posições atuais
              </StyledPrimaryButton>
            )} */}
          </div>
        </>
      ) : (
        <>
          Insira nova imagem aqui
          <input
            style={{ display: 'none' }}
            type="file"
            onChange={fileChangedHandler}
            ref={fileInput}
          />
          <StyledPrimaryButton onClick={onUploadFileClick} variant="contained">
            Escolher Imagem
          </StyledPrimaryButton>
        </>
      )}
    </div>
  );
};

export default NewImageField;
