import { FormControlLabel, Switch } from '@mui/material';
import { useAppDispatch } from '../../redux/hooks';
import { toggleRequired } from '../../redux/slices/surveySlice';

interface Props {
  toggleId: number;
  required: boolean;
}

function RequiredSwitch({ toggleId, required }: Props) {
  const dispatch = useAppDispatch();

  const handleChange = () => {
    dispatch(toggleRequired(toggleId));
  };

  return (
    <FormControlLabel
      value="start"
      control={<Switch color="primary" checked={required} onChange={handleChange} />}
      label="필수"
      labelPlacement="start"
    />
  );
}

export default RequiredSwitch;
