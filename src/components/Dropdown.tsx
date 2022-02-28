import React, { useState, Children, useEffect, useRef } from "react";
import { useLocalStorage } from "../hooks";

interface IClickable {
  onClick: (...args: any[]) => any;
}

export const DropdownHeader: React.FC<IClickable> = (props) => {
  return (
    <div className="dropdown__header" onClick={props.onClick}>
      { props.children }
      <img className="dropdown__arrow" src="./expand_more_black_24dp.svg"/>
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

export const DropDownList: React.FunctionComponent<any> = (props) => {
  return (
    <div className="dropdown__list" style={props.style}>
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

  const parentRef = useRef<HTMLElement | any>();

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
    <div className="dropdown" ref={parentRef}>
      <DropdownHeader onClick={toggle}>
        <h3 className="dropdown__text">{ label }</h3>
      </DropdownHeader>
      { open &&
      
       <DropDownList style={{width: parentRef.current.offsetWidth}}>
        {children.map((child: any) => {
          const { value, label } = child.props;
          return <DropDownItem key={value} value={value} label={label} onClick={select(value, label)}>{child}</DropDownItem>
        })}
       </DropDownList> 
      }
    </div>
  )
}
