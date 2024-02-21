import { Component, onMount } from "solid-js";
import { useSchema } from "../stores/schema";

interface IPropTypes {
  dataSourceId: string;
}

const SchemaLoader: Component<IPropTypes> = (props) => {
  const [_, { readSchemaFromAPI }] = useSchema();

  onMount(() => {
    if (!!props.dataSourceId) {
      readSchemaFromAPI(props.dataSourceId);
    }
  });

  return <></>;
};

export default SchemaLoader;
