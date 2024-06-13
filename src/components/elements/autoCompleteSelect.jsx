import React from "react";
import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";

export default function AutoCompleteSelect({
  data,
  selectedKey,
  setSelectedKey,
  label,
  setErrors,
  errors
}) {
  return (
    <Autocomplete
      size="lg"
      label={label}
      labelPlacement="outside"
      className="w-full"
      variant="bordered"
      defaultItems={data}
      allowsCustomValue={true}
      selectedKey={selectedKey}
      onSelectionChange={setSelectedKey}
      onInputChange={(value) => {
        if (value === "") {
          setSelectedKey("");
          setErrors({ ...errors, translateTo: '' });
        } else {
          setErrors({ ...errors, translateTo: '' });
        }
      }}
    >
      {data.map((language) => (
        <AutocompleteItem
          key={language.key}
          startContent={<Avatar alt={language.label} className="w-6 h-6" src={language.icon} />}
        >
          {language.label}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
}
