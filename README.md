### React Memo Form

using library [react-hook-form](https://react-hook-form.com/)

```javascript
const Input = ({onChange, value, methods}) => <input onChange={onChange} value={value}/>

const mf = memoForm({
  /**
   * Define path using with a sub-object data
   * {
   *  contact: {
   *   firstname: 'Fred'
   *  }
   * }
   */
  pathName: String

  /**
   * Observer fields for refresh component when data change
   */
  observerFields: [String]

  /**
   * Other fields for refresh component when an errors
   */
  fields: [String]
})

export default mf(Input)

```

> Information!
> The `observerFields` and `fields` props is merged.

The memoForm HOC inject 2 additional helpers functions to methods react-hook-form

```javascript
/*
 * Get the field name
 * Equals to using simple string notation: contact.firstname
 */
const fieldName = methods.getFieldName('firstname');
console.log(fieldname); // contact.firstname

/*
 * Get the value of field
 * Equals to using methods.getValues(['contact.firstname'])
 */
const { firstname } = methods.getFormValues(['firstname']);
console.log(firstname); // fred
```

Complete example:

Nested Component

```javascript
import React from 'react';

const ContactForm = ({ methods }) => {
  const { getFieldName, getFormValues, errors, register } = methods;
  const firstNamefield = getFieldName('firstname');

  // Get the value
  const { firstname } = getFormValues(['firstname']);

  return (
    <>
      <label>Firstname</label>
      <input {...register(firstNamefield)} />
      {errors.contact?.firstname && 'Field required'}
    </>
  );
};

export default memoForm({
  pathName: 'contact',
  // Only for using with watch|getValues|getFormValues
  observerFields: ['firstname'],
  // Or if not using watch|getValues|getFormValues, you can use prop field for re-render component on errors
  fields: ['firstname'],
})(ContactForm);
```

Parent component

```javascript
import React from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import ContactForm from './';

const defaultValues = {
  contact: {
    firstname: 'Fred',
  },
};

const ParentForm = () => {
  const methods = useForm({
    defaultValues,
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <ContactForm />
      </form>
    </FormProvider>
  );
};

export default ParentForm;
```

Visit [homepage](https://fredckl.github.io/react-memo-form/)
