import { useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

import { Wrapper } from './styles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addQuestion, selectFocusId, selectQuestionIds, updateFocus } from '../../redux/slices/surveySlice';

function FloatingButtons() {
  const questionIds = useAppSelector(selectQuestionIds);
  const focusId = useAppSelector(selectFocusId);
  const dispatch = useAppDispatch();
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const focusEl = document.getElementById(`question-${focusId}`);

    if (focusEl && buttonRef.current) {
      const rect = focusEl.getBoundingClientRect();

      buttonRef.current.style.transition = `transform 0.3s`;
      buttonRef.current.style.transform = `translateY(${rect.top + window.scrollY}px)`;
    }
  }, [focusId]);

  const handleAddQuestion = () => {
    const newId = Math.max(...questionIds, 0) + 1;

    dispatch(addQuestion(newId));
    dispatch(updateFocus(newId));
  };

  const handleGoToPreview = () => {
    navigate('/preview');
  };

  return (
    <Wrapper ref={buttonRef}>
      <button onClick={handleAddQuestion}>
        <MdAdd />
      </button>
      <button onClick={handleGoToPreview}>
        <MdOutlineRemoveRedEye />
      </button>
    </Wrapper>
  );
}

export default FloatingButtons;
