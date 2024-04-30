import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

import { QuestionType } from '../../types/question';
import { useDispatch } from 'react-redux';
import { changeAnswer } from '../../redux/slices/previewSlice';

interface Props {
  questionId: number;
  options: QuestionType['options'];
  hasEtc: boolean;
  value: string;
}

function RadioOption({ questionId, options, hasEtc, value }: Props) {
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const answer = e.target.value;

    dispatch(changeAnswer({ questionId, answer }));
  };

  return (
    <RadioGroup value={value} onChange={handleChange}>
      {options.map(({ id, value }) => (
        <FormControlLabel key={id} value={value} control={<Radio />} label={value} />
      ))}
      {hasEtc && <FormControlLabel key={Infinity} value={'기타'} control={<Radio />} label={'기타'} />}
    </RadioGroup>
  );
}

export default RadioOption;
