import styled, { css } from 'styled-components';

export const Questions = styled.ul`
  padding-bottom: 20px;
`;

export const Question = styled.li<{ $isDragging: boolean; $draggingOverWith: string | null | undefined }>`
  position: relative;

  .ico-drag-question {
    display: none;
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 10;
    transform: translateX(-50%) rotate(90deg);
    font-size: 20px;
  }

  ${(props) =>
    !props.$draggingOverWith &&
    css`
      &:hover .ico-drag-question {
        display: block;
      }
    `}

  ${(props) =>
    props.$isDragging &&
    css`
      .ico-drag-question {
        display: block;
      }
    `}
`;
