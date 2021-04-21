import React, { useRef } from 'react'
import { Controller } from 'react-hook-form';
import useReady from '../hooks/useReady';
import memoForm from '../form/memoForm';
import FormError from './FormError';

const DescriptionForm2 = ({ methods }) => {
  console.log('DescriptionForm2');
  const { control, errors } = methods;
  const ref = useRef();
  useReady(ref);
  console.log(errors)

  return (
    <div ref={ref}>
      <Controller
        name="description"
        defaultValue={null}
        control={control}
        rules={{required: 'Ce champ est obligatoire'}}
        render={({onChange, value}) => <textarea onChange={onChange} placeholder="Description courte">{value}</textarea>}
      />

      <FormError name="description" errors={errors}/>
    </div>
  )
}

export default memoForm({
  // observerFields: ['description']
  fields: ['description']
})(DescriptionForm2)
