import React from 'react';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { Button, TextField } from '@mui/material';
import { MdDragIndicator } from 'react-icons/md';

import { Container, DragIconWrapper, Footer, Option } from './styles';
import { QuestionType } from '../../types/question';
import { useAppDispatch } from '../../redux/hooks';
import { addOption, moveOption, toggleEtcOption } from '../../redux/slices/surveySlice';
import OptionPrefix from '../OptionPrefix';
import OptionItem from '../OptionItem';
import StrictModeDroppable from '../StrictModeDroppable';

interface Props {
  id: number;
  type: QuestionType['type'];
  options: QuestionType['options'];
  isFocus: boolean;
  hasEtc: boolean;
}

const OptionList = React.memo(function OptionList({ id, type, options, isFocus, hasEtc }: Props) {
  const dispatch = useAppDispatch();

  const handleAddOption = (isEtc: boolean) => {
    if (isEtc) {
      dispatch(toggleEtcOption(id));
      return;
    }

    const newOptionId = Math.max(...options.map((option) => option.id), 0) + 1;

    dispatch(addOption({ id, newOptionId }));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    dispatch(moveOption({ id, srcIdx: result.source.index, dstIdx: result.destination.index }));
  };

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId="droppableId" key="droppableId">
          {(provided, droppableSnapShot) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {options.map((option, index) => (
                <Draggable key={option.id} draggableId={option.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <Option
                      ref={provided.innerRef}
                      $isDragging={snapshot.isDragging}
                      $draggingOverWith={droppableSnapShot.draggingOverWith}
                      {...provided.draggableProps}
                    >
                      <DragIconWrapper className="ico-drag-option" $isFocus={isFocus} {...provided.dragHandleProps}>
                        <MdDragIndicator />
                      </DragIconWrapper>

                      <OptionItem
                        id={id}
                        optionId={option.id}
                        type={type}
                        value={option.value}
                        isFocus={isFocus}
                        hasRemoveBtn={options.length > 1}
                        index={index}
                      />
                    </Option>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </StrictModeDroppable>
      </DragDropContext>
      {hasEtc && (
        <div className="etc">
          <OptionItem id={id} optionId={-1} type={type} value={'기타...'} isFocus={isFocus} hasRemoveBtn={true} />
        </div>
      )}

      <Footer>
        {isFocus && (
          <>
            <OptionPrefix type={type} index={options.length} />
            <TextField variant="standard" placeholder="옵션 추가" onClick={handleAddOption.bind(null, false)} />
            {(type === 'RADIO' || type === 'CHECKBOX') && !hasEtc && (
              <>
                <span>또는</span>
                <Button variant="text" onClick={handleAddOption.bind(null, true)}>
                  '기타' 추가
                </Button>
              </>
            )}
          </>
        )}
      </Footer>
    </Container>
  );
});

export default OptionList;
