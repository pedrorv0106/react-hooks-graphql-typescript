import { useState } from 'react';

const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const reset = (newState = initialState) => {
    setValues(newState);
  };

  const handleInputChange = ({ target }: any) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  return [values, handleInputChange, reset];
};

export default useForm;
