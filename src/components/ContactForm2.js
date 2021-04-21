import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import AddressForm from './AddressForm2';
import DescriptionForm from './DescriptionForm2';
import ProfileForm from './ProfileForm2';

const defaultValues = {
  firstname: null,
  lastname: null,
  email: null,
  address1: null,
  address2: null,
  city: null,
  zipCode: null,
  description: null
}

const ContactForm2 = () => {
  const methods = useForm({
    defaultValues
  });

  const onSubmit = (value) => {
    console.log(value);
  }
  return (
    <div className="form-content">
      <FormProvider {...methods}>
        <h2>Formulaire avec memo</h2>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <ProfileForm/>
          <AddressForm/>
          <DescriptionForm/>
          <pre>
          {JSON.stringify(methods.getValues(), null, 2)}

        </pre>
          <button type="submit">Envoyer</button>
        </form>
      </FormProvider>
    </div>
  )
}

export default ContactForm2
