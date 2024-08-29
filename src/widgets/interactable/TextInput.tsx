import { Component, JSX } from "solid-js";
import { useUserInterface } from "../../stores/userInterface";
import { IFormField } from "../../utils/types";
import { ContentType } from "../../api_types/ContentType";

const TextInput: Component<IFormField> = (props) => {
  const [_, { getColors }] = useUserInterface();
  if (props.contentType !== ("Text" as ContentType)) {
    return null;
  }

  let inputType: string = "text";
  if (!!props.contentSpec.textType) {
    const textType = props.contentSpec.textType;
    if (textType === "Email") {
      inputType = "email";
    } else if (textType === "Password") {
      inputType = "password";
    }
  }

  const handleChange: JSX.ChangeEventHandler<HTMLInputElement, Event> = (
    event,
  ) => {
    if (!!props.onChange) {
      props.onChange(props.name, event.currentTarget.value);
    }
  };

  return (
    <>
      {!!props.label && (
        <label
          class="block text-sm font-medium leading-6 mb-1"
          style={{ color: getColors().colors["input.foreground"] }}
        >
          {props.label}
        </label>
      )}
      <input
        name={props.name}
        type={inputType}
        required={props.isRequired || undefined}
        class="block w-full rounded-md px-2 py-1.5 border font-content"
        style={{
          "background-color": getColors().colors["input.background"],
          "border-color": getColors().colors["input.border"],
          color: getColors().colors["input.foreground"],
        }}
        placeholder={props.placeholder || undefined}
        value={props.value !== undefined ? props.value : ""}
        onChange={handleChange}
        onFocus={props.onFocus}
        disabled={!props.isEditable}
      />
    </>
  );
};

export default TextInput;
