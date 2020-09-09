import React from 'react';
import Header from './Header';
import Content from './Content';

import './App.css';

class App extends React.Component{
    render(){
        return(
            <>
                <div className="app-wrapper">
                    <Header />
                    <Content />
                </div>
            </>
        );
    }
}

export default App;
