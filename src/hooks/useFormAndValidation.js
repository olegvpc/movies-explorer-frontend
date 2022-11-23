import {useState, useCallback} from 'react';

function useFormAndValidation() {
  const [ values, setValues ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ isValid, setIsValid ] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]: value });
    setErrors({...errors, [name]: e.target.validationMessage});
    setIsValid(e.target.closest('form').checkValidity());
  };

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}

export default useFormAndValidation;

// import React from 'react';
//
// export function useFormWithValidation() {
//
//   const [values, setValues] = React.useState({});
//   const [errors, setErrors] = React.useState({});
//   const [isValid, setIsValid] = React.useState(false);
//
//   //---ОБРАБОТЧИКИ---
//   function handleChange(e) {
//     const input = e.target;
//     const name = input.name;
//     const value = input.value;
//
//     setValues({...values, [name]: value});
//     setErrors({...errors, [name]: input.validationMessage});
//     setIsValid(input.closest('form').checkValidity());
//   };
//
//   return {values, errors, isValid, handleChange, setValues, setIsValid, setErrors};
// };