import useValidation from './useValidation';
import { useState } from 'react';

const useInput = (initialValue: string, validations: { [key: string]: boolean }) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const onBlur = () => {
    setDirty(true);
  };
  
  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid
  }
};

export default useInput;