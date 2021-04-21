import React, { memo } from 'react';
import {
  equals,
  join,
  compose,
  map,
  isNil,
  reject,
  propOr,
  prop,
  isEmpty,
  path,
  either,
  complement,
  filter,
  ifElse,
  T,
  F,
  concat,
  uniq
} from 'ramda';
import { useFormContext } from 'react-hook-form';
import propTypes from 'prop-types';

const isNotNilOrEmpty = complement(either(isNil, isEmpty));
const getPathMethods = key => path(['methods', key]);
const getPathName = getPathMethods('pathName');
const getErrors = getPathMethods('errors');
const getFields = getPathMethods('fields');
const getObserverFields = getPathMethods('observerFields');
const rejectNil = reject(isNil);
const removeNilFormData = compose(reject(either(isNil, isEmpty)), prop('formData'));
const getFieldNameBuilder = field => key => compose(
  join('.'),
  rejectNil
)([field, key]);

/**
   * Methods de comparaison
   * @param {*} prevProps
   * @param {*} nextProps
   * @returns
   */
const areEquals = (prevProps, nextProps) => {
  const prevData = removeNilFormData(prevProps);
  const nextData = removeNilFormData(nextProps);
  const pathName = getPathName(nextProps);
  const allErrors = getErrors(nextProps);
  const fields = getFields(nextProps);
  const observerFields = getObserverFields(nextProps);

  const isEmptyFields = compose(isEmpty, prop('fields'));

  const hasFieldErrors = ifElse(
    compose(isNotNilOrEmpty, prop('allErrors')), // Si erreur
    ifElse(
      isEmptyFields,
      T, // Si pas de fields définit et qu'il y une erreur, on renvoi true
      compose( // Si non, on chercher la correspondance des champs qui sont en erreur
        isNotNilOrEmpty,
        filter(field => compose(
          isNotNilOrEmpty,
          path(rejectNil([pathName, field]))
        )(allErrors)),
        prop('fields')
      )),
    F
  )({ allErrors, fields: compose(uniq, concat(observerFields))(fields) });

  // Si erreur de validation, alors on rejoue tous les composants
  if (hasFieldErrors) {
    return false;
  }

  return equals(prevData, nextData);
};

/**
 * Fonction permettant d'améliorer les performances de rendu des composants de formulaire
 * S'utilise avec la librairie, react-hook-form
 * ATTENTION: ne pas utiliser ReactHookForm.useFormContext dans les composants enfants, cela annulerait cette
 * fonctionnalité d'optimisation
 *
 * opts = {
 *  pathName: string,
 *  observerFields: array
 * }
 * @param {object} opts
 * @returns
 */
const memoForm = opts => Component => {
  const pathName = prop('pathName', opts);
  const getFieldName = getFieldNameBuilder(pathName);
  const MemoizedComponent = memo(Component, areEquals);

  const WrapperMemoizedComponent = (props) => {
    const methods = useFormContext();
    const getFormValues = compose(
      methods.getValues,
      map(getFieldName)
    );
    const observerFields = propOr([], 'observerFields', opts);
    const fields = propOr([], 'fields', opts);
    const formData = getFormValues(observerFields);

    return (
      <MemoizedComponent
        {...props}
        methods={{ ...methods, getFieldName, getFormValues, pathName, observerFields, fields }}
        formData={formData}
      />
    );
  };
  WrapperMemoizedComponent.displayName = 'WrapperMemoizedComponent';
  return WrapperMemoizedComponent;
};

export const memoFormPropTypes = {
  register: propTypes.func.isRequired,
  unregister: propTypes.func.isRequired,
  errors: propTypes.oneOfType([propTypes.object, propTypes.string]).isRequired,
  watch: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
  reset: propTypes.func.isRequired,
  setError: propTypes.func.isRequired,
  clearError: propTypes.func,
  setValue: propTypes.func.isRequired,
  getValues: propTypes.func.isRequired,
  triggerValidation: propTypes.func,
  control: propTypes.object.isRequired,
  formState: propTypes.object.isRequired,
  getFieldName: propTypes.func.isRequired,
  getFormValues: propTypes.func.isRequired,
  pathName: propTypes.string.isRequired
};

export const methodsPropTypes = {
  methods: propTypes.shape(memoFormPropTypes)
};

export default memoForm;
