import { ChangeEvent, FormEvent } from "react";
export declare type FormErrors<T> = {
    [key in keyof T]?: string;
};
declare type ValidationFunction<T> = {
    required?: boolean;
    message?: string;
    validate?: (value: T) => {
        requirement: boolean;
        message: string;
    };
};
export declare type Validations<T> = {
    [key in keyof T]?: ValidationFunction<T[key]>;
};
interface UseFormProps<T> {
    defaultValue?: T;
    validations?: Validations<T>;
}
declare type DataType = string | number | boolean | null | undefined | object;
declare const useForm: <T extends Record<string, DataType>>(props?: UseFormProps<T> | undefined) => {
    ref: import("react").RefObject<HTMLFormElement>;
    errors: FormErrors<T>;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (onSubmit: (data: T) => void) => (e: FormEvent) => void;
};
export default useForm;
