import React from 'react';
import ReactDOM from 'react-dom';


export default class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <h1>Anuvaad</h1>
                <p className="lead text-muted">Localize your app in global languages</p>
            </div>
        );
    }
}