"use client";
import { useEffect, useRef } from "react";

const useRegister = (
  formData: any,
  setFormData: React.Dispatch<React.SetStateAction<any>>
) => {
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const formInputs: any = {};

    const setDefaultValues = () => {
      if (ref.current && ref.current.elements) {
        Array.from(ref.current.elements).forEach((el) => {
          const element = el as HTMLInputElement;
          if (ref.current && ref.current[element.name]) {
            ref.current[element.name].value = formData[element.name];
          }
        });
      }
    };

    const setInitialValues = () => {
      if (ref.current && ref.current.elements) {
        Array.from(ref.current.elements).forEach((element) => {
          switch (element.nodeName) {
            case "INPUT": {
              const el = element as HTMLInputElement;
              if (!formData?.[el?.name]) {
                formInputs[el?.name] = undefined;
              }
              break;
            }
            case "SELECT": {
              const el = element as HTMLSelectElement;
              if (!formData?.[el?.name]) {
                formInputs[el?.name] = undefined;
              }
              break;
            }
            default:
              break;
          }
        });
      }
      setFormData((th: any) => ({ ...th, ...formInputs }));
    };

    if (formData) {
      setDefaultValues();
    } else {
      setInitialValues();
    }
  }, []);

  return ref;
};

export default useRegister;
