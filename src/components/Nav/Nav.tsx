import React from "react";
import {Link} from "react-router-dom";

import NAV from "Constants/Nav";

import './Nav.pcss';

export default function Nav(){
  return <div className={'nav'}>
    {NAV.map((el, id) => <Link
      key={id}
      className={'nav__link'}
      to={el.link}
    >
      {el.title}
    </Link>
    )}
  </div>
}
