import styled, { css } from 'styled-components';
import TextField from '@mui/material/TextField';

export const Container = styled.div`
  min-width: 580px;
  width: 100%;
`;

export const InputValue = styled(TextField)<{ $isfocus: boolean }>`
  .MuiInput-root {
    font-family: BMYEONSUNG, sans-serif;
  }

  .MuiInput-root:before {
    border-bottom: none;
  }

  .MuiInputBase-root:hover:before {
    border-bottom: ${(props) => (props.$isfocus ? '1px solid rgba(0, 0, 0, 0.42)' : 'none')} !important;
  }

  ${(props) =>
    !props.$isfocus &&
    css`
      .Mui-disabled:before {
        border-bottom: none !important;
        border-bottom-style: none !important;
      }
    `}
`;
