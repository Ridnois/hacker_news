import React, { useState } from "react";
import { Link } from 'react-router-dom';

export interface ITab {
  title: string;
  to: string;
}

export const Tab: React.FunctionComponent<ITab> = (props) => {
  const [selected, setSelected] = useState(false);
  const { to, title } = props;

  return (
      <Link to={to}>
        <div className={`tab-selector__tab ${selected ? 'tab-selector__tab--selected': ''}`} onClick={() => setSelected(true)}>
          {title}
        </div>
      </Link>
  )
}

export interface ITabSelector {
  tabs: [ITab];
}
export const TabSelector: React.FunctionComponent = () => {
  
  return (
    <div className="tab-selector">
      <div className="tab-selector__container">
        <Tab title="All" to="/"/>
        <Tab title="My faves" to="/faves" />
      </div>
    </div>
  )
}
