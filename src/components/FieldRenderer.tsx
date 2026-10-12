import { useMemo, type ChangeEvent } from "react";
import type { Field } from "../utils/types";
import { debouncer } from "../utils/debouncer";

function FormField(props: {
  field: Field;
  updateFn: (name: string, value: string | boolean) => void;
  validateFn: (field: Field, value: string | boolean) => void;
  value: string | boolean;
  errors: string[];
}) {
  //use memo to make a single ref survive rerenders
  const debouncedValidate = useMemo(
    () => debouncer(props.validateFn, 600),
    [props.validateFn],
  );

  //expensive change setting functions, be debounced
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
        <div className="flex flex-col items-start text-zinc-300 gap-2">
          <label htmlFor={props.field.name} className="flex gap-1">
            {props.field.label}
            {props.field.rules.required && <p className="text-red-400">*</p>}
          </label>
          <input
            className={`${props.errors.length > 0 ? " border-red-400" : "border-zinc-600"} border rounded-sm focus:ring-0 focus:outline-none p-2 w-120`}
            id={props.field.name}
            type={props.field.type}
            name={props.field.name}
            onChange={handleInputChange}
            onBlur={handleBlurChange}
            value={props.value as string}
            {...props.field.rules}
          />
          {props.errors.map((err) => (
            <div className="text-red-400 text-xs" key={err}>
              {err}
            </div>
          ))}
        </div>
      )}
      {/* option consuming */}
      {props.field.type == "select" && (
        <div className="flex flex-col items-start text-zinc-300 gap-2">
          <label htmlFor={props.field.name} className="flex gap-1">
            {props.field.label}
            {props.field.rules.required && <p className="text-red-400">*</p>}
          </label>
          <select
            className={`${props.errors.length > 0 ? " border-red-400" : "border-zinc-600"} border rounded-sm focus:ring-0 focus:outline-none p-2 w-120`}
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
            <div className="text-red-400 text-xs" key={err}>
              {err}
            </div>
          ))}
        </div>
      )}
      {props.field.type == "radio" &&
        props.field.options.map((optn) => {
          return (
            <div
              key={optn.radio_value}
              className="flex flex-col items-start text-zinc-300 gap-2"
            >
              <label className="flex gap-1">
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
        <div className="flex flex-col items-start text-zinc-300 gap-2">
          <label htmlFor={props.field.name} className="flex gap-1">
            {props.field.label}
            {props.field.rules.required && <p className="text-red-400">*</p>}
          </label>
          <input
            className={`${props.errors.length > 0 ? " border-red-400" : "border-zinc-600"} border rounded-sm focus:ring-0 focus:outline-none p-2 w-120`}
            id={props.field.name}
            type={props.field.type}
            name={props.field.name}
            onChange={handleCheckChange}
            {...props.field.rules}
          />
          {props.errors.map((err) => (
            <div className="text-red-400 text-xs" key={err}>
              {err}
            </div>
          ))}
        </div>
      )}
      {props.field.type == "textarea" && (
        <div className="flex flex-col items-start text-zinc-300 gap-2">
          <label htmlFor={props.field.name} className="flex gap-1">
            {props.field.label}
            {props.field.rules.required && <p className="text-red-400">*</p>}
          </label>
          <textarea
            className={`${props.errors.length > 0 ? " border-red-400" : "border-zinc-600"} border rounded-sm focus:ring-0 focus:outline-none p-2 w-120 resize-none`}
            onChange={handleInputChange}
            id={props.field.name}
            name={props.field.name}
            value={props.value as string}
            {...props.field.rules}
          />
          {props.errors.map((err) => (
            <div className="text-red-400 text-xs" key={err}>
              {err}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
export default FormField;
