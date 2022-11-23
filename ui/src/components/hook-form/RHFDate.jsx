import React from "react";
import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

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
          {...other}
          sx={{ width: 220 }}
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
