import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { MdDragIndicator } from 'react-icons/md';

import { Question, Questions } from './styles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectQuestions, moveQuestion } from '../../redux/slices/surveySlice';
import QuestionItem from '../QuestionItem';
import StrictModeDroppable from '../StrictModeDroppable';

function QuestionList() {
  const questions = useAppSelector(selectQuestions);
  const dispatch = useAppDispatch();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    dispatch(moveQuestion({ srcIdx: result.source.index, dstIdx: result.destination.index }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId="droppableId" key="droppableId">
        {(provided, droppableSnapShot) => (
          <Questions ref={provided.innerRef} {...provided.droppableProps}>
            {questions.map((question, index) => (
              <Draggable key={question.id} draggableId={question.id.toString()} index={index}>
                {(provided, snapshot) => (
                  <Question
                    key={question.id}
                    ref={provided.innerRef}
                    $isDragging={snapshot.isDragging}
                    $draggingOverWith={droppableSnapShot.draggingOverWith}
                    {...provided.draggableProps}
                  >
                    <div className="ico-drag-question" {...provided.dragHandleProps}>
                      <MdDragIndicator />
                    </div>
                    <QuestionItem {...question} />
                  </Question>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Questions>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
}

export default QuestionList;
