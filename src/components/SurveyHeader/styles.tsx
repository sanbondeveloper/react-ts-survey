import styled from 'styled-components';
import TextField from '@mui/material/TextField';

export const InputTitle = styled(TextField)<{ $isfocus: boolean }>`
  input {
    font-size: 35px;
    font-family: BMYEONSUNG, sans-serif;
  }

  .MuiInput-root:before {
    border-bottom: ${(props) => (props.$isfocus ? '1px solid rgba(0, 0, 0, 0.42)' : 'none')};
  }

  .MuiInputBase-root:hover:before {
    border-bottom: ${(props) => (props.$isfocus ? '1px solid rgba(0, 0, 0, 0.42)' : 'none')} !important;
  }

  .MuiInput-underline:after {
    border-bottom-color: rgb(103, 58, 183);
  }
`;

export const InputDescription = styled(TextField)<{ $isfocus: boolean }>`
  .MuiInput-input {
    font-size: 15px;
    margin-top: 10px !important;
    font-family: BMYEONSUNG, sans-serif;
  }

  .MuiInput-root:before {
    border-bottom: ${(props) => (props.$isfocus ? '1px solid rgba(0, 0, 0, 0.42)' : 'none')};
  }

  .MuiInputBase-root:hover:before {
    border-bottom: ${(props) => (props.$isfocus ? '1px solid rgba(0, 0, 0, 0.42)' : 'none')} !important;
  }
  .MuiInput-underline:after {
    border-bottom-color: rgb(103, 58, 183);
  }
`;
