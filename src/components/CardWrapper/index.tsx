import { CustomCard } from './styles';

interface Props {
  children: React.ReactNode;
  isError?: boolean;
}

function CardWrapper({ children, isError }: Props) {
  return <CustomCard $isError={isError}>{children}</CustomCard>;
}

export default CardWrapper;
