import React from 'react';
import { prop } from 'ramda';
import { ErrorMessage } from '@hookform/error-message';

const FormError = (props) => {
  if (prop('hide', props)) return null;
  return (
    <div className="form-error-validation">
      <ErrorMessage {...props} render={({ message }) => <p>{message}</p>}/>
    </div>
  );
};

export default FormError;
