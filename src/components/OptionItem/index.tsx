import { Wrapper } from './styles';
import { QuestionType } from '../../types/question';
import OptionPrefix from '../OptionPrefix';
import OptionValue from '../OptionValue';
import RemoveOptionButton from '../RemoveOptionButton/styles';

interface Props {
  type: QuestionType['type'];
  value: string;
  isFocus: boolean;
  index: number;
}

function OptionItem({ type, value, isFocus, index }: Props) {
  return (
    <Wrapper>
      <OptionPrefix type={type} index={index} />
      <OptionValue value={value} isFocus={isFocus} />
      <RemoveOptionButton />
    </Wrapper>
  );
}

export default OptionItem;
