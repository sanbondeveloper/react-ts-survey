import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: -7%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    border: none;
    outline: none;
    border-radius: 100%;
    background-color: #ccc;
    padding: 7px 10px;
    font-size: 20px;
    cursor: pointer;
  }

  button + button {
    margin-top: 5px;
  }
`;
