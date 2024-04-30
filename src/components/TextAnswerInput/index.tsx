import { TextField } from '@mui/material';

import { Wrapper } from './styles';
import { useAppDispatch } from '../../redux/hooks';
import { changeAnswer } from '../../redux/slices/previewSlice';

interface Props {
  width: number;
  questionId: number;
  value: string;
}

function TextAnswerInput({ width, questionId, value }: Props) {
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const answer = e.target.value;

    dispatch(changeAnswer({ questionId, answer }));
  };

  return (
    <Wrapper width={width}>
      <TextField fullWidth variant="standard" placeholder="내 답변" value={value} onChange={handleChange} />
    </Wrapper>
  );
}

export default TextAnswerInput;
