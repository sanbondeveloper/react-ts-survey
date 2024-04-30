import { Title } from './styles';
import { useAppSelector } from '../../redux/hooks';
import { selectDesc, selectTitle } from '../../redux/slices/surveySlice';
import CardWrapper from '../CardWrapper';

function PreviewHeader() {
  const title = useAppSelector(selectTitle);
  const description = useAppSelector(selectDesc);

  return (
    <CardWrapper>
      <Title>{title}</Title>
      <p>{description}</p>
    </CardWrapper>
  );
}

export default PreviewHeader;
