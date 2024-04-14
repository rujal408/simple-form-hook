import { FormErrors, Validations } from "../hooks/useForm";
declare function validate<T>(inputs: T, validations?: Validations<T>): Promise<{
    status: boolean;
    errors: FormErrors<T>;
}>;
export default validate;
