import React from 'react'
import Header from './components/Header';
import Navbar from './components/Navbar';
import Main from './components/Main';
import "./Root.css"

const Root = () => {
    return (
        <div id="root_content">
          <Header />
          <Navbar />
          <Main />
        </div>
    )
}

export default Root;
