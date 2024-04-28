import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addQuestion, selectQuestionIds } from '../../redux/slices/surveySlice';

function FloatingButtons() {
  const questionIds = useAppSelector(selectQuestionIds);
  const dispatch = useAppDispatch();

  const handleAddQuestion = () => {
    const newId = Math.max(...questionIds, 0);

    dispatch(addQuestion(newId));
  };

  return <button onClick={handleAddQuestion}>추가</button>;
}

export default FloatingButtons;
