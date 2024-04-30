import React from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { removeQuestion, selectQuestionIds, updateFocus } from '../../redux/slices/surveySlice';

interface Props {
  removedId: number;
}

const RemoveQuestionButton = React.memo(function RemoveQuestionButton({ removedId }: Props) {
  const questionIds = useAppSelector(selectQuestionIds);
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const index = questionIds.findIndex((id) => id === removedId);

    if (index !== -1) {
      dispatch(removeQuestion(removedId));
      dispatch(updateFocus(index === 0 ? -1 : questionIds[index - 1]));
    }
  };

  return (
    <button onClick={handleClick}>
      <RiDeleteBin5Line fontSize={20} />
    </button>
  );
});

export default RemoveQuestionButton;
