import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addQuestion, selectQuestionIds, updateFocus } from '../../redux/slices/surveySlice';

function FloatingButtons() {
  const questionIds = useAppSelector(selectQuestionIds);
  const dispatch = useAppDispatch();

  const handleAddQuestion = () => {
    const newId = Math.max(...questionIds, 0) + 1;

    dispatch(addQuestion(newId));
    dispatch(updateFocus(newId));
  };

  return <button onClick={handleAddQuestion}>추가</button>;
}

export default FloatingButtons;
