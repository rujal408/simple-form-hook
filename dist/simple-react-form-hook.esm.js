import { useRef, useEffect, useState } from 'react';

const useRegister = (formData, setFormData) => {
  const ref = useRef(null);
  useEffect(() => {
    const formInputs = {};
    const setDefaultValues = () => {
      if (ref.current && ref.current.elements) {
        Array.from(ref.current.elements).forEach(el => {
          const element = el;
          if (ref.current && ref.current[element.name]) {
            ref.current[element.name].value = formData[element.name];
          }
        });
      }
    };
    const setInitialValues = () => {
      if (ref.current && ref.current.elements) {
        Array.from(ref.current.elements).forEach(element => {
          switch (element.nodeName) {
            case "INPUT":
              {
                const el = element;
                if (!(formData != null && formData[el == null ? void 0 : el.name])) {
                  formInputs[el == null ? void 0 : el.name] = undefined;
                }
                break;
              }
            case "SELECT":
              {
                const el = element;
                if (!(formData != null && formData[el == null ? void 0 : el.name])) {
                  formInputs[el == null ? void 0 : el.name] = undefined;
                }
                break;
              }
          }
        });
      }
      setFormData(th => ({
        ...th,
        ...formInputs
      }));
    };
    if (formData) {
      setDefaultValues();
    } else {
      setInitialValues();
    }
  }, []);
  return ref;
};

function validate(inputs, validations) {
  return new Promise((res, rej) => {
    let errors = {};
    if (validations) {
      Object.keys(validations).forEach(validate => {
        const fieldName = validate;
        const value = inputs[fieldName];
        const validationCriteria = validations[fieldName];
        if (validationCriteria) {
          if (validationCriteria != null && validationCriteria.required && !value) {
            Object.assign(errors, {
              [fieldName]: (validationCriteria == null ? void 0 : validationCriteria.message) || ""
            });
          } else if (validationCriteria != null && validationCriteria.validate) {
            const isValid = validationCriteria.validate(inputs[fieldName]);
            if (!isValid.requirement) {
              Object.assign(errors, {
                [fieldName]: isValid.message
              });
            }
          } else {
            if (errors[fieldName]) {
              delete errors[fieldName];
            }
          }
        }
      });
      Object.keys(errors).length > 0 ? rej({
        status: false,
        errors
      }) : res({
        status: true,
        errors
      });
    } else {
      res({
        status: true,
        errors
      });
    }
  });
}

const useForm = props => {
  const [formData, setFormData] = useState((props == null ? void 0 : props.defaultValue) || {});
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const ref = useRegister(props == null ? void 0 : props.defaultValue, setFormData);
  const handleValidate = (data, call) => validate(data, props == null ? void 0 : props.validations).then(res => {
    setErrors(res.errors);
    if (call) {
      call();
    }
  }).catch(e => {
    setErrors(e.errors);
  });
  const handleChange = e => {
    e.persist();
    const {
      name,
      value
    } = e.target;
    const newData = {
      ...formData,
      [name]: value
    };
    if (isSubmitted) {
      handleValidate(newData);
    }
    setFormData(newData);
  };
  const handleSubmit = onSubmit => {
    return e => {
      e.preventDefault();
      setIsSubmitted(true);
      handleValidate(formData, () => {
        onSubmit(formData);
      });
    };
  };
  return {
    ref,
    errors,
    handleChange,
    handleSubmit
  };
};

export default useForm;
//# sourceMappingURL=simple-react-form-hook.esm.js.map
