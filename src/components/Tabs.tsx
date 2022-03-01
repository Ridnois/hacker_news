import React, { useState, useEffect} from "react";
import { Link } from 'react-router-dom';

export interface ITab {
  title: string;
  to: string;
  selected: string;
  onClick: (...args: any[]) => any; 
}

export const Tab: React.FunctionComponent<ITab> = (props) => {
  const { selected } = props;
  
  return (
    <Link to={props.to} onClick={props.onClick}>
      <div className={`tab-selector__tab ${selected === props.to ? 'tab-selector__tab--selected': ''}`}>
        {props.title}
      </div>
    </Link>
  )
}

export interface ITabSelector {
  tabs: [ITab];
}
export const TabSelector: React.FunctionComponent = () => {
  const [ selected, setSelected ] = useState<string>("");
  useEffect(() => {
    console.log(window.location.pathname)
    setSelected(window.location.pathname)
  }, [])
  
  const toggle = (to: string) => {
    setSelected(to);
  }
  return (
    <div className="tab-selector">
      <div className="tab-selector__container">
        <Tab title="All" selected={selected} to="/" onClick={() => toggle("/")}/>
        <Tab title="My faves" selected={selected} to="/faves" onClick={() => toggle("/faves")} />
      </div>
    </div>
  )
}
