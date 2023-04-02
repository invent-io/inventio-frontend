import { Search } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import { Controller } from 'react-hook-form';
import {
  StyledAutoComplete,
  StyledTextField,
} from './MultipleTextInputs.styles';

export default function MultipleTextInputs({
  name,
  control,
  setFieldValue = null,
  helperText = '',
  label = '',
  placeholder = '',
  hasSearchIcon = false,
  isForm = false,
  isRequired = true,
  freeSolo = true,
  multiple = true,
  options = [],
  textFieldVariant = 'outlined',
  style = {},
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: isRequired }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <StyledAutoComplete
          multiple={multiple}
          freeSolo={freeSolo}
          options={options}
          value={value || []}
          limitTags={2}
          filterSelectedOptions
          style={style}
          getOptionLabel={(option) => option}
          onChange={(event, newValue) => {
            onChange(newValue);
            if (!isForm) {
              setFieldValue(newValue);
            }
          }}
          renderInput={(params) => {
            return (
              <StyledTextField
                {...params}
                size="small"
                variant={textFieldVariant}
                label={label}
                placeholder={placeholder}
                error={!!error}
                helperText={
                  error ? `Campo obrigatório. ${helperText}` : helperText
                }
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      {hasSearchIcon ? (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ) : null}
                      {params.InputProps.startAdornment}
                    </>
                  ),
                }}
              />
            );
          }}
        />
      )}
    />
  );
}
