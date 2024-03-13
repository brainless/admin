import { Component, createSignal } from "solid-js";
import Form from "../interactable/Form";
import { IFormField } from "../../utils/types";
import { invoke } from "@tauri-apps/api/core";
import Button from "../interactable/Button";
import Dropdown from "../interactable/Dropdown";

interface IFormState {
  isFormOpen: boolean;
}

interface INewThreadFormData {
  message: string;
  aiProvider: string;
  aiModel: string;
}

const NewThread: Component = () => {
  const [formData, setFormData] = createSignal<INewThreadFormData>({
    message: "",
    aiProvider: "OpenAI",
    aiModel: "gpt-4-turbo-preview",
  });

  const formFields: Array<IFormField> = [
    {
      name: "message",
      fieldType: "multiLineText",
      isRequired: true,
    },
  ];

  const handleNewThread = async () => {
    await invoke("start_chat_thread", {
      message: formData().message,
      aiProvider: formData().aiProvider,
      aiModel: formData().aiModel,
    });
  };

  return (
    <Form
      title="Start a new chat"
      formFields={formFields}
      // submitButtomLabel="Start"
      // handleSubmit={handleNewThread}
      setFieldInput={setFormData}
      submitButton={
        <div class="flex flex-row">
          <div class="grow">
            <Button size="sm" label="Start a chat" onClick={handleNewThread} />
          </div>
          <Dropdown label="AI model" choices={{ OpenAI: "OpenAI" }} size="sm" />
        </div>
      }
    ></Form>
  );
};

export default NewThread;
