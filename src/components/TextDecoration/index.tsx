import React from 'react';
import TextField from '@mui/material/TextField';

import { Container } from './styles';

interface Props {
  width: number;
  placeholder: string;
}

const TextDecoration = React.memo(function TextDecoration({ width, placeholder }: Props) {
  return (
    <Container $width={width}>
      <TextField
        disabled
        fullWidth
        variant="standard"
        placeholder={placeholder}
        sx={{
          '.MuiInputBase-root': {
            fontSize: '14px',
          },
        }}
      />
    </Container>
  );
});

export default TextDecoration;
