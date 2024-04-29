import { Container, InputValue } from './styles';

interface Props {
  value: string;
  isFocus: boolean;
  isEtc: boolean;
}

function OptionValue({ value, isEtc, isFocus }: Props) {
  const handleChange = () => {};

  return (
    <Container>
      <InputValue
        fullWidth
        variant="standard"
        disabled={isEtc}
        $isfocus={isFocus}
        value={value}
        onChange={handleChange}
      />
    </Container>
  );
}

export default OptionValue;
