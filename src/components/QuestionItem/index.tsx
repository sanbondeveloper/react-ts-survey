import Divider from '@mui/material/Divider';
import { MdDragIndicator } from 'react-icons/md';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

import { DragIconWrapper, Footer, Header } from './styles';
import { QuestionType } from '../../types/question';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectIsFocus, updateFocus } from '../../redux/slices/surveySlice';
import CardWrapper from '../CardWrapper';
import QuestionTitle from '../QuestionTitle';
import QuestionTypeSelect from '../QuestionTypeSelect';
import TextDecoration from '../TextDecoration';
import OptionList from '../OptionList';
import CopyQuestionButton from '../CopyQuestionButton';
import RemoveQuestionButton from '../RemoveQuestionButton';
import RequiredSwitch from '../RequiredSwitch';
import FocusMarker from '../FocusMarker';

interface Props {
  id: number;
  title: string;
  type: QuestionType['type'];
  options: QuestionType['options'];
  required: boolean;
  hasEtc: boolean;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

function QuestionItem({ id, title, type, options, required, hasEtc, dragHandleProps }: Props) {
  const isFocus = useAppSelector((state) => selectIsFocus(state, id));
  const dispatch = useAppDispatch();

  const handleFocus = () => {
    dispatch(updateFocus(id));
  };

  return (
    <CardWrapper>
      <DragIconWrapper className="ico-drag-question" $isFocus={isFocus} {...dragHandleProps}>
        <MdDragIndicator />
      </DragIconWrapper>

      <div id={`question-${id}`} onClick={handleFocus}>
        {isFocus && <FocusMarker />}
        <Header>
          <QuestionTitle id={id} title={title} isFocus={isFocus} />
          {isFocus && <QuestionTypeSelect id={id} type={type} />}
        </Header>
        {type === 'SHORT' || type === 'LONG' ? (
          <TextDecoration
            width={type === 'SHORT' ? 300 : 500}
            placeholder={`${type === 'SHORT' ? '단답형' : '장문형'} 텍스트`}
          />
        ) : (
          <OptionList id={id} type={type} options={options} isFocus={isFocus} hasEtc={hasEtc} />
        )}
        {isFocus && (
          <Footer>
            <CopyQuestionButton copiedId={id} />
            <RemoveQuestionButton removedId={id} />
            <Divider orientation="vertical" flexItem />
            <RequiredSwitch toggleId={id} required={required} />
          </Footer>
        )}
      </div>
    </CardWrapper>
  );
}

export default QuestionItem;
