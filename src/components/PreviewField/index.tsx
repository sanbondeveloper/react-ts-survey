import { Header } from './styles';
import { QuestionType } from '../../types/question';
import { useAppSelector } from '../../redux/hooks';
import { AnswerType } from '../../types/answer';
import CardWrapper from '../CardWrapper';
import RadioOption from '../RadioOption';
import TextAnswerInput from '../TextAnswerInput';
import CheckboxOption from '../CheckboxOption';
import DropdownOption from '../DropdownOption';
import { selectIsError } from '../../redux/slices/previewSlice';

interface Props {
  id: number;
  title: string;
  type: QuestionType['type'];
  required: boolean;
  options: QuestionType['options'];
  hasEtc: boolean;
  answer: string | AnswerType | AnswerType[] | null | undefined;
}

function PreviewField({ id, title, type, required, options, hasEtc, answer }: Props) {
  const isError = useAppSelector((state) => selectIsError(state, id));

  return (
    <div id={`question-${id}`}>
      <CardWrapper isError={isError}>
        <Header>
          <h2>
            {title}
            {required && <span className="required">*</span>}
          </h2>
        </Header>
        {(() => {
          if (type === 'SHORT' || type === 'LONG') {
            const width = type === 'SHORT' ? 300 : 500;
            const value = answer || '';

            return <TextAnswerInput width={width} questionId={id} value={value as string} />;
          } else if (type === 'RADIO') {
            const value = answer ? answer : '';

            return <RadioOption questionId={id} options={options} hasEtc={hasEtc} value={value as string} />;
          } else if (type === 'CHECKBOX') {
            const checkeds = answer ? answer : [];

            return (
              <CheckboxOption questionId={id} options={options} hasEtc={hasEtc} checkeds={checkeds as AnswerType[]} />
            );
          } else if (type === 'DROPDOWN') {
            const value = answer ? answer : '';
            return <DropdownOption questionId={id} options={options} value={value as string} />;
          }
        })()}
        {isError && <div className="error">필수 질문입니다.</div>}
      </CardWrapper>
    </div>
  );
}

export default PreviewField;
