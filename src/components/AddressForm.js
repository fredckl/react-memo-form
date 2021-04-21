import React, { useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import Input from './Input';
import useReady from '../hooks/useReady';

const AddressForm = () => {
  console.log('AddressForm');
  const { control, getValues } = useFormContext();
  const ref = useRef();

  console.log(getValues())

  useReady(ref);

  return (
    <div style={{padding: '1rem 0'}} ref={ref}>
      <Controller
        name="address1"
        defaultValue={null}
        control={control}
        render={({onChange, value}) => <Input onChange={onChange} value={value} placeholder="Adresse 1"/>}
      />
      <Controller
        name="address2"
        defaultValue={null}
        control={control}
        render={({onChange, value}) => <Input onChange={onChange} value={value} placeholder="Adresse 2"/>}
      />
      <Controller
        name="zipCode"
        defaultValue={null}
        control={control}
        render={({onChange, value}) => <Input onChange={onChange} value={value} placeholder="Code postal"/>}
      />
      <Controller
        name="city"
        defaultValue={null}
        control={control}
        render={({onChange, value}) => <Input onChange={onChange} value={value} placeholder="Ville"/>}
      />
    </div>
  )
}

export default AddressForm
