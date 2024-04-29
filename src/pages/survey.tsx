import { useEffect, useState } from 'react';

import { useAppDispatch } from '../redux/hooks';
import SurveyHeader from '../components/SurveyHeader';
import QuestionList from '../components/QuestionList';
import FloatingButtons from '../components/FloattingButtons';
import { changeDescription, changeTitle, initQuestions } from '../redux/slices/surveySlice';

function SurveyPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const title = localStorage.getItem('title') || '';
    const description = localStorage.getItem('desc') || '';
    const questions = localStorage.getItem('questions');

    dispatch(changeTitle(title));
    dispatch(changeDescription(description));
    dispatch(initQuestions(questions ? JSON.parse(questions) : []));
  }, [dispatch]);

  return (
    <>
      <SurveyHeader />
      <QuestionList />
      <FloatingButtons />
    </>
  );
}

export default SurveyPage;
