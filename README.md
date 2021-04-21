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

The memoForm HOC inject 2 additional functions to methods react-hook-form

```javascript
const defaultValues = {
  contact: {
    firstname: 'Fred',
  },
};

memoForm({
  pathName: 'contact',
});

// Get the field name
const fieldName = methods.getFieldName('contact.firstname'); // 'firstname'

// Get the value of field
const { firstname } = methods.getFormValues(['firstname']); // 'fred'
```
