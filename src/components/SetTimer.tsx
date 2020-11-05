import React from "react"

interface Props {
  onIncrement: () => void
  onDecrement: () => void
  value: number
  name: string
}


export const SetTimer = (props: Props) => {

    return <div id={props.name}>
      <button onClick={props.onIncrement}>+</button>
      <span>{props.value}</span>
      <button onClick={props.onDecrement}>-</button>
    </div>
}
