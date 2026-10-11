import { useMemo, type ChangeEvent } from "react";
import type { Field } from "../utils/types";

//generic debouncing wrapper fn
function debouncer<T extends (...args: any[]) => void>(
  callback: T,
  ms: number,
) {
  //init a timerID variable, stays alive due to closure of the fn returned below
  let timerID: number;

  //return a function that clears old setTimeout and reassigns a new one
  return (...args: Parameters<T>) => {
    clearTimeout(timerID);
    timerID = setTimeout(() => callback(...args), ms);
  };
}

function FormField(props: {
  field: Field;
  updateFn: (name: string, value: string | boolean) => void;
  validateFn: (field: Field, value: string | boolean) => void;
  value: string | boolean;
  errors: string[];
}) {
  const debouncedValidate = useMemo(
    () => debouncer(props.validateFn, 600),
    [props.validateFn],
  );

  //expensive change setting functions, need to be debounced?
  const handleCheckChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.updateFn(event.target.name, event.target.checked);
  };
  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    props.updateFn(event.target.name, event.target.value);
    //pass the args to the returned fn
    debouncedValidate(props.field, event.target.value);
  };

  //simply shows errors of each input's errors (string[])
  const handleBlurChange = (
    event: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    if (!(props.errors.length == 0)) {
      console.log(props.errors);
    }
  };
  return (
    <>
      {/* simple */}
      {(props.field.type == "text" ||
        props.field.type == "email" ||
        props.field.type == "password" ||
        props.field.type == "number" ||
        props.field.type == "url" ||
        props.field.type == "tel" ||
        props.field.type == "date") && (
        <div>
          <label htmlFor={props.field.name}>{props.field.label}</label>
          <input
            id={props.field.name}
            type={props.field.type}
            name={props.field.name}
            onChange={handleInputChange}
            onBlur={handleBlurChange}
            value={props.value as string}
            {...props.field.rules}
          />
          {props.errors.map((err) => (
            <div key={err}>{err}</div>
          ))}
        </div>
      )}
      {/* option consuming */}
      {props.field.type == "select" && (
        <div>
          <label htmlFor={props.field.name}>
            {props.field.rules.required && <p className="text-red-700">*</p>}
            {props.field.label}
          </label>
          <select
            onChange={handleInputChange}
            id={props.field.name}
            name={props.field.name}
            value={props.value as string}
            {...props.field.rules}
          >
            {props.field.options.map((optn) => {
              return (
                <option key={optn.option_name} value={optn.option_name}>
                  {optn.option_label}
                </option>
              );
            })}
          </select>
          {props.errors.map((err) => (
            <div key={err}>{err}</div>
          ))}
        </div>
      )}
      {props.field.type == "radio" &&
        props.field.options.map((optn) => {
          return (
            <div key={optn.radio_value}>
              <label>
                <input
                  value={optn.radio_value}
                  type={props.field.type}
                  name={props.field.name}
                  onChange={handleInputChange}
                  {...props.field.rules}
                />
                {optn.radio_label}
              </label>
              {props.errors.map((err) => (
                <div key={err}>{err}</div>
              ))}
            </div>
          );
        })}
      {/* other type */}
      {props.field.type == "checkbox" && (
        <div>
          <label htmlFor={props.field.name}>{props.field.label}</label>
          <input
            id={props.field.name}
            type={props.field.type}
            name={props.field.name}
            onChange={handleCheckChange}
            {...props.field.rules}
          />
          {props.errors.map((err) => (
            <div key={err}>{err}</div>
          ))}
        </div>
      )}
      {props.field.type == "textarea" && (
        <div>
          <label htmlFor={props.field.name}>{props.field.label}</label>
          <textarea
            onChange={handleInputChange}
            id={props.field.name}
            name={props.field.name}
            value={props.value as string}
            {...props.field.rules}
            className={`border focus:outline-none focus:ring-2 ${
              props.errors.length > 0
                ? "border-red-500 focus:ring-red-200"
                : "border-green-500 focus:ring-green-200"
            }`}
          />
          {props.errors.map((err) => (
            <div key={err}>{err}</div>
          ))}
        </div>
      )}
    </>
  );
}
export default FormField;
