import { RiDeleteBin5Line } from 'react-icons/ri';
import { useAppDispatch } from '../../redux/hooks';
import { removeQuestion } from '../../redux/slices/surveySlice';

interface Props {
  removedId: number;
}

function RemoveQuestionButton({ removedId }: Props) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(removeQuestion(removedId));
  };

  return (
    <button onClick={handleClick}>
      <RiDeleteBin5Line fontSize={20} />
    </button>
  );
}

export default RemoveQuestionButton;
