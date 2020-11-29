import React, { Component } from 'react';

import dora from "./dora.jpg";

export default class FirstPage extends Component {
    render() {
        return (
            <div>
                <img src={dora} className="center" alt="Dora is cute" width="80%"/>
            </div>
        )
    }
}
