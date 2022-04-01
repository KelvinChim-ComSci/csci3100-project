import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class StatDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stat : {},
        };
    }

    update(stat) {
        this.setState({ stat: { ...this.state.stat, ...stat } });
    }

    render(){
        require('./statDisplay.css');
        return (
            <div className="container-fluid" id="statDisplay">
                <div className = "row">
                   
                        <table>

                        <thead>
                            <tr>
                                <th scope="col" id="col1"></th>
                                <th scope="col" id="col2"></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>GPA: </td>
                                <td>{(this.state.stat.hasOwnProperty('gpa'))? this.state.stat.gpa : ""}</td>
                            </tr>
                            <tr>
                                <td>Sports: </td>
                                <td>{(this.state.stat.hasOwnProperty('sports'))? this.state.stat.sports : ""}</td>
                            </tr>
                            <tr>
                                <td>Happiness: </td>
                                <td>{(this.state.stat.hasOwnProperty('happiness'))? this.state.stat.happiness : ""}</td>
                            </tr>
                            <tr>
                                <td>Money: </td>
                                <td>{(this.state.stat.hasOwnProperty('money'))? this.state.stat.money : ""}</td>
                            </tr>
                            <tr>
                                <td>Stamina: </td>
                                <td>{(this.state.stat.hasOwnProperty('stamina'))? this.state.stat.stamina : ""}</td>
                            </tr>
                            
                        </tbody>
                        Year {(this.state.stat.hasOwnProperty('year'))? this.state.stat.year : ""} sem {(this.state.stat.hasOwnProperty('sem'))? Math.ceil(this.state.stat.sem/2) : ""} ({(this.state.stat.hasOwnProperty('sem'))? ((this.state.stat.sem%2 === 0)? "2nd" : "1st") : ""} half)

                        </table>

                </div>
            </div>
        )
    }
}

export default StatDisplay;