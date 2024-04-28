import React from 'react';
import { MdRadioButtonUnchecked } from 'react-icons/md';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';

import { Container } from './styles';
import { QuestionType } from '../../types/question';

interface Props {
  type: QuestionType['type'];
  index: number;
}

const OptionPrefix = React.memo(function OptionPrefix({ type, index }: Props) {
  return (
    <Container>
      {(() => {
        if (type === 'RADIO') {
          return <MdRadioButtonUnchecked fontSize={25} />;
        } else if (type === 'CHECKBOX') {
          return <MdCheckBoxOutlineBlank fontSize={25} />;
        } else {
          return `${index + 1}.`;
        }
      })()}
    </Container>
  );
});

export default OptionPrefix;
