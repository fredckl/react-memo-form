import React, { useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import Input from './Input';
import useReady from '../hooks/useReady';
import { toLower } from 'ramda';
import FormError from './FormError';

const ProfileForm = () => {
  console.log('ProfileForm');
  const ref = useRef();
  const { control, watch, errors } = useFormContext();
  const {firstname} = watch(['firstname']);

  useReady(ref);
  const isFred = toLower(firstname || '') === 'fred';
  return (
    <div className="form-inline" ref={ref}>
      <Controller
        name="firstname"
        defaultValue={null}
        control={control}
        render={({onChange, value}) => <Input onChange={onChange} value={value} placeholder="Prénom : tape fred"/>}
      />
      <Controller
        name="lastname"
        defaultValue={null}
        control={control}
        render={({onChange, value}) => <Input onChange={onChange} value={value} placeholder="Nom"/>}
      />
      {!isFred && (
        <>
          <div>
            <Controller
              name="email"
              defaultValue={null}
              control={control}
              render={({onChange, value}) => <Input onChange={onChange} value={value} placeholder="Email"/>}
              rules={{required: 'Ce champ est obligatoire'}}
            />
            <FormError name="email" errors={errors}/>
          </div>
          <Controller
            name="N° de téléphone"
            defaultValue={null}
            control={control}
            render={({onChange, value}) => <Input onChange={onChange} value={value} placeholder="N° de téléphone"/>}
          />
        </>
      )}
    </div>
  )
}

export default ProfileForm
