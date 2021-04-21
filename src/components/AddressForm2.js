import React, { useRef } from 'react'
import { Controller } from 'react-hook-form';
import Input from './Input';
import useReady from '../hooks/useReady';
import memoForm from '../form/memoForm';

const AddressForm2 = ({methods}) => {
  console.log('AddressForm2');
  const { control, watch } = methods;
  const ref = useRef();
  const { address1 } = watch(['address1'])
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

export default memoForm({
  observerFields: ['address1']
})(AddressForm2)
