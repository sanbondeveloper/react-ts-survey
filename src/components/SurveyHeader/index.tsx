import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { InputTitle, InputDescription } from './styles';
import { changeDescription, changeTitle, selectDesc, selectTitle } from '../../redux/slices/surveySlice';
import CardWrapper from '../CardWrapper';

function SurveyHeader() {
  const title = useAppSelector(selectTitle);
  const description = useAppSelector(selectDesc);
  const dispatch = useAppDispatch();

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTitle(e.target.value));
  };

  const handleChangeDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeDescription(e.target.value));
  };

  return (
    <CardWrapper>
      <InputTitle
        fullWidth
        variant="standard"
        placeholder="설문지 제목"
        $isfocus={false}
        value={title}
        onChange={handleChangeTitle}
      />
      <InputDescription
        fullWidth
        multiline
        variant="standard"
        placeholder="설문지 설명"
        $isfocus={false}
        value={description}
        onChange={handleChangeDesc}
      />
    </CardWrapper>
  );
}

export default SurveyHeader;
