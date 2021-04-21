import React, { useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import useReady from '../hooks/useReady';

const DescriptionForm = () => {
  console.log('DescriptionForm');
  const { control } = useFormContext();
  const ref = useRef();

  useReady(ref);

  return (
    <div ref={ref}>
      <Controller
        name="description"
        defaultValue={undefined}
        control={control}
        render={({onChange, value}) => <textarea onChange={onChange} placeholder="Description courte">{value}</textarea>}
      />
    </div>
  )
}

export default DescriptionForm
