import React, { useState, Children, useRef } from "react";

interface Option {
  label: string;
  value: string;
}

interface IClickable {
  onClick: (...args: any[]) => any;
}

interface WithCallback {
  callback: (...args: any[]) => any,
}

export const TopicBox: React.FunctionComponent<Option> = (props) => {
  return (
    <div className="topic-box" {...props}>
      { props.children }
    </div>
  ) 
}

type IDropdown = WithCallback & Pick<Option, "label"> 

export const DropdownHeader: React.FC<IClickable> = (props) => {
  return (
    <div className="dropdown__header" onClick={props.onClick}>
      { props.children }
      <img className="dropdown__arrow" alt="" src="./expand_more_black_24dp.svg"/>
    </div>
  )
}

export const DropDownItem: React.FC<IClickable & Option> = (props) => {
  return (
    <div className="dropdown__item" onClick={props.onClick}>
      {props.children}
    </div>
  )
}

export const DropDownList: React.FunctionComponent<{style: any}> = (props) => {
  return (
    <div className="dropdown__list" style={props.style}>
      {props.children}
    </div>
  )
}

export const Dropdown: React.FC<IDropdown> = (props) => {
  const [ , setValue ] = useState<string>();
  const [ label, setLabel ] = useState(props.label);
  const [ open, setOpen ] = useState(false);

  const children = Children.toArray(props.children);
  
  // Use parent width reference to provide width property on
  // `position: absolute:` element.
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
    <div className="dropdown" ref={ parentRef }>
      <DropdownHeader onClick={ toggle }>
        <h3 className="dropdown__text">{ label }</h3>
      </DropdownHeader>
      { open &&
        <DropDownList style={{ width: parentRef.current.offsetWidth }}>
          {children.map((child: any) => {
            const { value, label } = child.props;
            return <DropDownItem key={ value } value={ value } label={ label } onClick={ select(value, label) }>{child}</DropDownItem>
          })}
       </DropDownList> 
      }
    </div>
  )
}
