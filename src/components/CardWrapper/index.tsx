import { CustomCard } from './styles';

interface Props {
  children: React.ReactNode;
}

function CardWrapper({ children }: Props) {
  return <CustomCard>{children}</CustomCard>;
}

export default CardWrapper;
