import { Container, InputValue } from './styles';

interface Props {
  value: string;
  isFocus: boolean;
}

function OptionValue({ value, isFocus }: Props) {
  const handleChange = () => {};

  return (
    <Container>
      <InputValue fullWidth variant="standard" $isfocus={isFocus} value={value} onChange={handleChange} />
    </Container>
  );
}

export default OptionValue;
