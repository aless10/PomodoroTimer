import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp, library } from "@fortawesome/fontawesome-svg-core";
import { faPlay, faPause, faUndo } from "@fortawesome/free-solid-svg-icons";

library.add(faPlay, faPause, faUndo);

interface Props {
  onClick: () => void;
  name: string;
  icon: string;
}

export const Button = (props: Props) => {
  return (
    <div id={props.name}>
      <button onClick={props.onClick}>
        <FontAwesomeIcon icon={props.icon as IconProp} />
      </button>
    </div>
  );
};
