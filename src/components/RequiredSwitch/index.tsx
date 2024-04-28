import { FormControlLabel, Switch } from '@mui/material';

interface Props {
  required: boolean;
}

function RequiredSwitch({ required }: Props) {
  return (
    <FormControlLabel
      value="start"
      control={<Switch color="primary" checked={required} />}
      label="필수"
      labelPlacement="start"
    />
  );
}

export default RequiredSwitch;
