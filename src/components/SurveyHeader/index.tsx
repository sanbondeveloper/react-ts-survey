import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { InputTitle, InputDescription } from './styles';
import {
  changeDescription,
  changeTitle,
  selectDesc,
  selectIsFocus,
  selectTitle,
  updateFocus,
} from '../../redux/slices/surveySlice';
import CardWrapper from '../CardWrapper';
import FocusMarker from '../FocusMarker';

function SurveyHeader() {
  const title = useAppSelector(selectTitle);
  const description = useAppSelector(selectDesc);
  const isFocus = useAppSelector((state) => selectIsFocus(state, -1));
  const dispatch = useAppDispatch();

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTitle(e.target.value));
  };

  const handleChangeDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeDescription(e.target.value));
  };

  const handleFocus = () => {
    dispatch(updateFocus(-1));
  };

  return (
    <CardWrapper>
      <div onClick={handleFocus}>
        {isFocus && <FocusMarker />}
        <InputTitle
          fullWidth
          variant="standard"
          placeholder="설문지 제목"
          $isfocus={isFocus}
          value={title}
          onChange={handleChangeTitle}
        />
        <InputDescription
          fullWidth
          multiline
          variant="standard"
          placeholder="설문지 설명"
          $isfocus={isFocus}
          value={description}
          onChange={handleChangeDesc}
        />
      </div>
    </CardWrapper>
  );
}

export default SurveyHeader;
