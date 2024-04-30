import React, { SyntheticEvent, useState } from 'react';
import { MdShortText } from 'react-icons/md';
import { MdSubject } from 'react-icons/md';
import { MdRadioButtonChecked } from 'react-icons/md';
import { MdOutlineCheckBox } from 'react-icons/md';
import { MdOutlineExpandCircleDown } from 'react-icons/md';
import { Divider, Select, SelectChangeEvent, MenuItem } from '@mui/material';

import { OptionText, OptionWrapper } from './styles';
import { QuestionType } from '../../types/question';
import { useAppDispatch } from '../../redux/hooks';
import { changeQuestionType } from '../../redux/slices/surveySlice';

const options: { label: string; value: QuestionType['type']; icon: React.ReactNode }[] = [
  { label: '단답형', value: 'SHORT', icon: <MdShortText fontSize={25} /> },
  { label: '장문형', value: 'LONG', icon: <MdSubject fontSize={25} /> },
  { label: '객관식 질문', value: 'RADIO', icon: <MdRadioButtonChecked fontSize={25} /> },
  { label: '체크박스', value: 'CHECKBOX', icon: <MdOutlineCheckBox fontSize={25} /> },
  { label: '드롭다운', value: 'DROPDOWN', icon: <MdOutlineExpandCircleDown fontSize={25} /> },
];

interface Props {
  id: number;
  type: QuestionType['type'];
}

const QuestionTypeSelect = React.memo(function QuestionTypeSelect({ id, type }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | (EventTarget & Element)>(null);
  const dispatch = useAppDispatch();

  const handleClick = (event: SyntheticEvent<Element, Event>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const type = event.target.value as QuestionType['type'];

    dispatch(changeQuestionType({ id, type }));
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Select
      style={{ width: 350, height: 52, marginLeft: 40 }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      onOpen={handleClick}
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
      value={type}
      onChange={handleChange}
    >
      {options.slice(0, 2).map((option) => (
        <MenuItem key={option.value} value={option.value}>
          <OptionWrapper>
            {option.icon}
            <OptionText>{option.label}</OptionText>
          </OptionWrapper>
        </MenuItem>
      ))}
      <Divider />
      {options.slice(2).map((option) => (
        <MenuItem key={option.value} value={option.value}>
          <OptionWrapper>
            {option.icon}
            <OptionText>{option.label}</OptionText>
          </OptionWrapper>
        </MenuItem>
      ))}
    </Select>
  );
});

export default QuestionTypeSelect;
