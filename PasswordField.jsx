import React, { useState } from "react";
import {IconButton} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import TextField from "@mui/material/TextField";

export default function PasswordField(props) {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <TextField
          {...props}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
              endAdornment:
                  <IconButton
                      aria-label="toggle password visibility"
                      onMouseDown={() => setShowPassword(true)}
                      onMouseUp={() => setShowPassword(false)}
                      edge="end"
                  >
                      {showPassword ? <VisibilityOff/> : <Visibility/>}
                  </IconButton>
          }}
      />
  );
}