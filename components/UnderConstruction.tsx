import React from "react";
import { IconUnderConstruction } from "./icons/IconUnderConstruction";
import { Text } from "./Text";

export function UnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <IconUnderConstruction className="opacity-70 text-cyan-blue-500" />
      <Text variant="title-bold" as="h1" color="text-regular">
        Em construção
      </Text>
      <Text variant="text-regular-special" color="text-gray-500" as="p">
        Esta página está em desenvolvimento. Volte em breve!
      </Text>
    </div>
  );
} 