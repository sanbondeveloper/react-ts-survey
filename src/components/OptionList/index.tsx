import { Button, TextField } from '@mui/material';

import { Container, Footer } from './styles';
import { QuestionType } from '../../types/question';
import OptionItem from '../OptionItem';
import OptionPrefix from '../OptionPrefix';
import { useAppDispatch } from '../../redux/hooks';
import { addOption, toggleEtcOption } from '../../redux/slices/surveySlice';

interface Props {
  id: number;
  type: QuestionType['type'];
  options: QuestionType['options'];
  isFocus: boolean;
  hasEtc: boolean;
}

function OptionList({ id, type, options, isFocus, hasEtc }: Props) {
  const dispatch = useAppDispatch();

  const handleAddOption = (isEtc: boolean) => {
    if (isEtc) {
      dispatch(toggleEtcOption(id));
      return;
    }

    const newOptionId = Math.max(...options.map((option) => option.id), 0) + 1;

    dispatch(addOption({ id, newOptionId }));
  };

  const hasRemoveBtn = options.length > 1;

  return (
    <Container>
      <ul>
        {options.map((option, index) => (
          <li key={option.id}>
            <OptionItem
              id={id}
              optionId={option.id}
              type={type}
              value={option.value}
              isFocus={isFocus}
              hasRemoveBtn={hasRemoveBtn}
              index={index}
            />
          </li>
        ))}
      </ul>
      {hasEtc && (
        <div className="etc">
          <OptionItem id={id} optionId={-1} type={type} value={'기타...'} isFocus={isFocus} hasRemoveBtn={true} />
        </div>
      )}

      <Footer>
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
      </Footer>
    </Container>
  );
}

export default OptionList;
