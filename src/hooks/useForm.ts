"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import useRegister from "./useRegister";
import validate from "../utils/validate";

export type FormErrors<T> = {
  [key in keyof T]?: string;
};

type ValidationFunction<T> = {
  required?: boolean;
  message?: string;
  validate?: (value: T) => {
    requirement: boolean;
    message: string;
  };
};

export type Validations<T> = {
  [key in keyof T]?: ValidationFunction<T[key]>;
};

interface UseFormProps<T> {
  defaultValue?: T;
  validations?: Validations<T>;
}

type DataType = string | number | boolean | null | undefined | object;

const useForm = <T extends Record<string, DataType>>(
  props?: UseFormProps<T>
) => {
  const [formData, setFormData] = useState<T>((props?.defaultValue as T) || {});
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const ref = useRegister(props?.defaultValue, setFormData);

  const handleValidate = (data: T, call?: CallableFunction) =>
    validate<T>(data, props?.validations)
      .then((res) => {
        setErrors(res.errors as FormErrors<T>);
        if (call) {
          call();
        }
      })
      .catch((e) => {
        setErrors(e.errors as FormErrors<T>);
      });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.persist();
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    if (isSubmitted) {
      handleValidate(newData);
    }
    setFormData(newData);
  };

  const handleSubmit = (
    onSubmit: (data: T) => void
  ): ((e: FormEvent) => void) => {
    return (e) => {
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
    handleSubmit,
  };
};

export default useForm;
