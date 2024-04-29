import styled from 'styled-components';

export const Container = styled.div`
  li + li {
    margin-top: 10px;
  }

  .etc {
    margin-top: 10px;
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  .icon {
    margin-right: 10px;
  }

  span {
    font-size: 14px;
    margin-left: 10px;
  }
`;
