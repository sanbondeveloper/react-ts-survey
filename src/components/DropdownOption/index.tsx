import Select, { SelectChangeEvent } from '@mui/material/Select';

import { QuestionType } from '../../types/question';
import { useAppDispatch } from '../../redux/hooks';
import { SyntheticEvent, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { changeAnswer } from '../../redux/slices/previewSlice';

interface Props {
  questionId: number;
  options: QuestionType['options'];
  value: string;
}

function DropdownOption({ questionId, options, value }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | (EventTarget & Element)>(null);
  const dispatch = useAppDispatch();

  const handleClick = (e: SyntheticEvent<Element, Event>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleChange = (e: SelectChangeEvent) => {
    const answer = e.target.value;

    setAnchorEl(null);
    dispatch(changeAnswer({ questionId, answer: answer === 'None' ? '' : answer }));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Select
      style={{ width: '200px' }}
      open={Boolean(anchorEl)}
      onOpen={handleClick}
      onClose={handleClose}
      MenuProps={{
        anchorEl: anchorEl,
        open: Boolean(anchorEl),
        onClose: handleClose,
        onClick: handleClose,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
        transformOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      }}
      value={value || 'None'}
      onChange={handleChange}
    >
      <MenuItem value={'None'}>선택</MenuItem>
      <Divider />
      {options.map(({ id, value }) => (
        <MenuItem key={id} value={value}>
          {value}
        </MenuItem>
      ))}
    </Select>
  );
}

export default DropdownOption;
