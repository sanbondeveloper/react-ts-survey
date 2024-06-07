import styled, { css } from 'styled-components';

export const Container = styled.div`
  li + li {
    margin-top: 10px;
  }

  .etc {
    margin-top: 10px;
  }
`;

export const Option = styled.li<{ $isDragging: boolean; $draggingOverWith: string | null | undefined }>`
  position: relative;

  .ico-drag-option {
    display: none;
    position: absolute;
    left: -15px;
    top: 55%;
    transform: translateY(-50%);
    font-size: 20px;
    z-index: 10;
  }

  ${(props) =>
    !props.$draggingOverWith &&
    css`
      &:hover .ico-drag-option {
        display: block;
      }
    `}

  ${(props) =>
    props.$isDragging &&
    css`
      .ico-drag-option {
        display: block;
      }
    `}
`;

export const DragIconWrapper = styled.div<{ $isFocus: boolean }>`
  display: ${(props) => (props.$isFocus ? 'block' : 'none')};
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
