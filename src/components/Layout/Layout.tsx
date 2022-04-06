import React from "react";
import {Helmet} from "react-helmet";

import Header from "Components/Header";
import Footer from "Components/Footer";

import './Layout.pcss';

const TITLE = require("Constants/title");

export default function Layout({children, title = 'шаблон'}){
    return <div className={'container'}>
        <Helmet>
          <title>{`${TITLE} - ${title}`}</title>
        </Helmet>
        <Header />
        <div className={'content'}>
            {children}
        </div>
        <Footer />
    </div>
}
