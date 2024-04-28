import styled from 'styled-components';
import TextField from '@mui/material/TextField';

export const Container = styled.div`
  min-width: 580px;
`;

export const InputValue = styled(TextField)<{ $isfocus: boolean }>`
  .MuiInput-root:before {
    border-bottom: none;
  }

  .MuiInputBase-root:hover:before {
    border-bottom: ${(props) => (props.$isfocus ? '1px solid rgba(0, 0, 0, 0.42)' : 'none')} !important;
  }
`;
