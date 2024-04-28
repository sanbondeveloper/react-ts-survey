import { useDispatch } from 'react-redux';

import { InputQuestionTitle } from './styles';
import { changeQuestionTitle } from '../../redux/slices/surveySlice';

interface Props {
  id: number;
  title: string;
  isFocus: boolean;
}

function QuestionTitle({ id, title, isFocus }: Props) {
  const dispatch = useDispatch();

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeQuestionTitle({ id, title: e.target.value }));
  };

  return (
    <InputQuestionTitle
      fullWidth
      multiline
      placeholder="제목"
      variant={isFocus ? 'filled' : 'standard'}
      value={title}
      onChange={handleChangeTitle}
    />
  );
}

export default QuestionTitle;
