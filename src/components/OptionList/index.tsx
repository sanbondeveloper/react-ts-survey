import { QuestionType } from '../../types/question';
import OptionItem from '../OptionItem';

interface Props {
  id: number;
  type: QuestionType['type'];
  options: QuestionType['options'];
  isFocus: boolean;
}

function OptionList({ id, type, options, isFocus }: Props) {
  return (
    <ul>
      {options.map((option, index) => (
        <li key={option.id}>
          <OptionItem type={type} value={option.value} isFocus={isFocus} index={index} />
        </li>
      ))}
    </ul>
  );
}

export default OptionList;
