import { Container, InputValue } from './styles';

interface Props {
  id: number;
  optionId: number;
  value: string;
  isFocus: boolean;
}

function OptionValue({ id, optionId, value, isFocus }: Props) {
  const handleChange = () => {};

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
