import { Checkbox, FormControl, FormControlLabel } from '@mui/material';

import { QuestionType } from '../../types/question';
import { useDispatch } from 'react-redux';
import { AnswerType } from '../../types/answer';
import { changeAnswer } from '../../redux/slices/previewSlice';

interface Props {
  questionId: number;
  options: QuestionType['options'];
  hasEtc: boolean;
  checkeds: AnswerType[];
}

function CheckboxOption({ questionId, options, hasEtc, checkeds }: Props) {
  const values = checkeds.map(({ value }) => value);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean, id: number) => {
    const value = e.target.name;

    if (checked) {
      dispatch(changeAnswer({ questionId, answer: [...checkeds, { id, value }] }));
      return;
    }

    const newAnswer = checkeds.filter((checked) => checked.id !== id);

    dispatch(changeAnswer({ questionId, answer: newAnswer.length > 0 ? newAnswer : null }));
  };

  return (
    <FormControl>
      {options.map(({ id, value }) => (
        <FormControlLabel
          key={id}
          control={
            <Checkbox
              checked={values.includes(value)}
              onChange={(e, checked) => handleChange(e, checked, id)}
              name={value}
            />
          }
          label={value}
        />
      ))}
      {hasEtc && (
        <FormControlLabel
          key={Infinity}
          control={
            <Checkbox
              checked={values.includes('기타')}
              onChange={(e, checked) => handleChange(e, checked, Infinity)}
              name={'기타'}
            />
          }
          label={'기타'}
        />
      )}
    </FormControl>
  );
}

export default CheckboxOption;
