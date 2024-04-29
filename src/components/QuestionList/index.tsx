import { Questions } from './styles';
import { useAppSelector } from '../../redux/hooks';
import { selectQuestions } from '../../redux/slices/surveySlice';
import QuestionItem from '../QuestionItem';

function QuestionList() {
  const questions = useAppSelector(selectQuestions);

  return (
    <Questions>
      {questions.map((question) => (
        <li key={question.id}>
          <QuestionItem {...question} />
        </li>
      ))}
    </Questions>
  );
}

export default QuestionList;
