import styled from 'styled-components';

export const Form = styled.form`
  padding-bottom: 60px;

  .error {
    color: red;
    font-size: 13px;
    margin-top: 20px;
  }
`;

export const Footer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .btn-submit {
    border: none;
    outline: none;
    background-color: #0b0b6f;
    color: #fff;
    font-weight: 700;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
  }

  .btn-clear {
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    color: blue;
  }
`;
