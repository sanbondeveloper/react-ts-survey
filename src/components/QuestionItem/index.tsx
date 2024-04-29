import Divider from '@mui/material/Divider';

import { Footer, Header } from './styles';
import { QuestionType } from '../../types/question';
import CardWrapper from '../CardWrapper';
import QuestionTitle from '../QuestionTitle';
import QuestionTypeSelect from '../QuestionTypeSelect';
import TextDecoration from '../TextDecoration';
import OptionList from '../OptionList';
import CopyQuestionButton from '../CopyQuestionButton';
import RemoveQuestionButton from '../RemoveQuestionButton';
import RequiredSwitch from '../RequiredSwitch';

interface Props {
  id: number;
  title: string;
  type: QuestionType['type'];
  options: QuestionType['options'];
  required: boolean;
  isFocus: boolean;
  hasEtc: boolean;
}

function QuestionItem({ id, title, type, options, required, isFocus, hasEtc }: Props) {
  return (
    <CardWrapper>
      <Header>
        <QuestionTitle id={id} title={title} isFocus={isFocus} />
        <QuestionTypeSelect id={id} type={type} />
      </Header>
      {type === 'SHORT' || type === 'LONG' ? (
        <TextDecoration
          width={type === 'SHORT' ? 300 : 500}
          placeholder={`${type === 'SHORT' ? '단답형' : '장문형'} 텍스트`}
        />
      ) : (
        <OptionList id={id} type={type} options={options} isFocus={isFocus} hasEtc={hasEtc} />
      )}
      <Footer>
        <CopyQuestionButton copiedId={id} />
        <RemoveQuestionButton removedId={id} />
        <Divider orientation="vertical" flexItem />
        <RequiredSwitch toggleId={id} required={required} />
      </Footer>
    </CardWrapper>
  );
}

export default QuestionItem;
