import { Footer, Form } from './styles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectQuestions } from '../../redux/slices/surveySlice';
import { clearAnswers, selectAnswers, setErrorId } from '../../redux/slices/previewSlice';
import PreviewField from '../PreviewField';

function PreviewForm() {
  const questions = useAppSelector(selectQuestions);
  const answers = useAppSelector(selectAnswers);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requiredQuestions = questions.filter((question) => question.required);

    for (const question of requiredQuestions) {
      const answer = answers[question.id];

      if (!answer) {
        const questionEl = document.getElementById(`question-${question.id}`);

        questionEl?.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });

        dispatch(setErrorId(question.id));

        return;
      }
    }

    const result = questions.map(({ id, title, type, required }, index) => ({
      index,
      title,
      type,
      required,
      answer: answers[id],
    }));

    console.log(result);
  };

  const handleClearAnswers = () => {
    dispatch(clearAnswers());
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <PreviewField {...question} answer={answers[question.id]} />
          </li>
        ))}
      </ul>

      <Footer>
        <button type="submit" className="btn-submit">
          제출하기
        </button>
        <button type="button" className="btn-clear" onClick={handleClearAnswers}>
          양식 지우기
        </button>
      </Footer>
    </Form>
  );
}

export default PreviewForm;
