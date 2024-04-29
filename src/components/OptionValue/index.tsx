import { Container, InputValue } from './styles';
import { useAppDispatch } from '../../redux/hooks';
import { changeOptionValue } from '../../redux/slices/surveySlice';

interface Props {
  id: number;
  optionId: number;
  value: string;
  isFocus: boolean;
}

function OptionValue({ id, optionId, value, isFocus }: Props) {
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    dispatch(changeOptionValue({ id, optionId, value }));
  };

  return (
    <Container>
      <InputValue
        fullWidth
        variant="standard"
        disabled={optionId === -1}
        $isfocus={isFocus}
        value={value}
        onChange={handleChange}
      />
    </Container>
  );
}

export default OptionValue;
