import { PiCopySimple } from 'react-icons/pi';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { copyQuestion, selectQuestionIds, updateFocus } from '../../redux/slices/surveySlice';

interface Props {
  copiedId: number;
}

function CopyQuestionButton({ copiedId }: Props) {
  const questionIds = useAppSelector(selectQuestionIds);
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const newId = Math.max(...questionIds, 0) + 1;

    dispatch(copyQuestion({ newId, copiedId }));
    dispatch(updateFocus(newId));
  };

  return (
    <button onClick={handleClick}>
      <PiCopySimple fontSize={24} />
    </button>
  );
}

export default CopyQuestionButton;
