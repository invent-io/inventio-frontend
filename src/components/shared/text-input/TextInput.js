import { Controller } from 'react-hook-form';
import { StyledTextField, useStyles } from './TextInput.styles';

export default function TextInput({
  name,
  control,
  label,
  placeholder,
  register,
  isRequired = true,
  helperText = '',
  style = {},
}) {
  const styles = useStyles();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: isRequired }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className={styles.wrapper}>
          <StyledTextField
            size="small"
            variant="outlined"
            fullWidth
            label={label}
            value={value}
            style={style}
            onChange={onChange}
            placeholder={placeholder}
            error={!!error}
            onInput={register && register.onChange}
            helperText={error ? `Campo obrigatório. ${helperText}` : helperText}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      )}
    />
  );
}
