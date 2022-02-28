import React, { useState, Children, useEffect, useRef } from "react";
export const DropdownHeader: React.FC<{onClick: any}> = (props) => {
  return (
    <div className="dropdown__header" onClick={props.onClick}>
      {props.children}
      <img className="dropdown__arrow" src="./expand_more_black_24dp.svg"/>
    </div>
  )
}

interface IDropDownList {
  onSelected?: () => any;
}

export const DropDownList: React.FunctionComponent<any> = (props) => {
  return (
    <div className="dropdown__list" style={props.style}>
      {props.children}
    </div>
  )
}

export const DropDownContent: React.FunctionComponent<{onClick: any}> = (props) => {
  return (
    <div className="dropdown__content" onClick={props.onClick}>
      {props.children}
    </div>
  )
}

export const Dropdown: React.FunctionComponent<{callback?: (value: string) => any, label: string}> = (props) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(props.label);
  const { callback } = props;
  const arrayChildren = Children.toArray(props.children);
  
  const parentRef = useRef<HTMLElement | any>();

  const toggle = () => {
    setOpen(!open)
  }
  
  const select = (child: any) => (e: MouseEvent) => {
    e.preventDefault();
    setSelected(child.props.value);
    toggle()
  }
  
  useEffect(() => {
    if(callback && selected != props.label) {
      callback(selected)
    }
  }, [selected, setSelected]) 
  
  return (
    <div className="dropdown" ref={parentRef}>
      <DropdownHeader  onClick={toggle}>
        <h3 className="dropdown__text">{selected}</h3>
      </DropdownHeader>
      {
        open && (
        <DropDownList style={{width: parentRef.current.offsetWidth}}>
          {
            Children.map(arrayChildren, (child, index) => {
              return (
                <DropDownContent onClick={select(child)}>
                  {child}
                </DropDownContent>
              )
            })
          }
        </DropDownList>
        )
      }
    </div>
  )
}
