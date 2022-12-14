import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const MenuProps = {
  variant: "menu",
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
};

const RHFSelect = ({ name, id, label, data }) => {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{label}</InputLabel>

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <Select
              {...field}
              fullWidth
              labelId={id}
              label={label}
              value={field.value}
              // Todo
              onClose={() => {
                setOpen(false);
              }}
              onOpen={() => setOpen(true)}
              open={open}
              displayEmpty={true}
              MenuProps={MenuProps}
            >
              {(name === "subjectId" || name === "semesterId") &&
                data?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              {name === "studentId" &&
                data?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.firstName} {item.lastName}
                  </MenuItem>
                ))}
              {name === "courseId" &&
                data?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.subject.name}
                  </MenuItem>
                ))}
              {(name === "instructorId" &&
                data?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.firstName} {item.lastName}
                  </MenuItem>
              )))}
            </Select>
          );
        }}
      />
    </FormControl>
  );
};

export default RHFSelect;
