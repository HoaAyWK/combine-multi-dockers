import React from "react";
import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { fDateN } from "../../utils/formatTime";

const RHFDate = ({ name, ...other }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type="date"
          error={!!error}
          helperText={error?.message}
          value={field.value ? fDateN(field.value) : field.value}
          {...other}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
    />
  );
};

RHFDate.propTypes = {
  name: PropTypes.string,
};

export default RHFDate;
