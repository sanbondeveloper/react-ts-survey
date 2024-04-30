import React from 'react';
import { MdClear } from 'react-icons/md';

import { Button } from './styles';
import { useAppDispatch } from '../../redux/hooks';
import { removeOption, toggleEtcOption } from '../../redux/slices/surveySlice';

interface Props {
  id: number;
  optionId: number;
}

const RemoveOptionButton = React.memo(function RemoveOptionButton({ id, optionId }: Props) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (optionId === -1) {
      dispatch(toggleEtcOption(id));
      return;
    }

    dispatch(removeOption({ id, optionId }));
  };

  return (
    <Button onClick={handleClick}>
      <MdClear fontSize={20} />
    </Button>
  );
});

export default RemoveOptionButton;
