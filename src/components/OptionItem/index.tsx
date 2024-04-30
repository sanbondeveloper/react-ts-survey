import React from 'react';

import { Wrapper } from './styles';
import { QuestionType } from '../../types/question';
import OptionPrefix from '../OptionPrefix';
import OptionValue from '../OptionValue';
import RemoveOptionButton from '../RemoveOptionButton';

interface Props {
  id: number;
  optionId: number;
  type: QuestionType['type'];
  value: string;
  isFocus: boolean;
  hasRemoveBtn: boolean;
  index?: number;
}

const OptionItem = React.memo(function OptionItem({ id, optionId, type, value, isFocus, hasRemoveBtn, index }: Props) {
  return (
    <Wrapper>
      <OptionPrefix type={type} index={index} />
      <OptionValue id={id} optionId={optionId} value={value} isFocus={isFocus} />
      {hasRemoveBtn && isFocus && <RemoveOptionButton id={id} optionId={optionId} />}
    </Wrapper>
  );
});

export default OptionItem;
