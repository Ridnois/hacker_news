import React, { useState, Children, useEffect, useRef } from "react";
import { useLocalStorage } from "../hooks";

interface IClickable {
  onClick: (...args: any[]) => any;
}

export const DropdownHeader: React.FC<IClickable> = (props) => {
  return (
    <div className="dropdown__header" onClick={props.onClick}>
      { props.children }
    </div>
  )
}

export const DropDownItem: React.FC<IClickable & {label: string, value: string}> = (props) => {
  return (
    <div className="dropdown__item" onClick={props.onClick}>
      {props.children}
    </div>
  )
}

export const Dropdown: React.FC<{callback: (...args: any[]) => any, label: string}> = (props) => {
  const [ selected, setSelected ] = useState<string>(props.label);
  const [ value, setValue ] = useState<string>();
  const [ label, setLabel ] = useState<string>(props.label);
  const [ open, setOpen ] = useState(false);

  const children = Children.toArray(props.children);
  
  const toggle = () => {
    setOpen(!open)  
  }

  const select = (value: string, label: string) => () => {
    setValue(value);
    setLabel(label);
    props.callback(value);
    toggle();
  }

  return (
    <div className="dropdown">
      <DropdownHeader onClick={toggle}>
        <h3 className="dropdpwn__text">{ label }</h3>
      </DropdownHeader>
      { open &&
        children.map((child: any) => {
          const { value, label } = child.props;
          return <DropDownItem key={value} value={value} label={label} onClick={select(value, label)}>{child}</DropDownItem>
        })
      }
    </div>
  )
}
