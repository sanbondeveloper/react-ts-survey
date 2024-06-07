import styled from 'styled-components';
import TextField from '@mui/material/TextField';

export const InputQuestionTitle = styled(TextField)`
  .MuiInputBase-root {
    align-items: center !important;
    padding-top: 15px;
    padding-bottom: 15px;
    font-family: BMYEONSUNG, sans-serif;
  }

  .MuiInput-root::after {
    border-bottom: none;
  }

  .MuiInput-root::before {
    border-bottom: none;
  }

  .MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before {
    border-bottom: none;
  }

  .MuiInput-input {
    font-size: 15px;
  }

  .MuiFilledInput-root:after {
    border-bottom: 2px solid rgb(103, 58, 183);
  }
`;
