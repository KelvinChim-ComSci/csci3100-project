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
        this.setState({ stat: { ...this.state.stat, ...stat } })
    }

    render(){
        require('./statDisplay.css');
        return (
            <div className="container-fluid" id="statDisplay">
                <div className = "row">
                   

                        <table>

                        <thead>
                            <tr>
                                <th scope="col" id="col1">Statistics</th>
                                <th scope="col" id="col2"></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>GPA: </td>
                                <td id="gpa">{(this.state.stat.hasOwnProperty('gpa'))? this.state.stat.gpa : ""}</td>
                            </tr>
                            <tr>
                                <td>Sports: </td>
                                <td id="sports">{(this.state.stat.hasOwnProperty('sports'))? this.state.stat.sports : ""}</td>
                            </tr>
                            <tr>
                                <td>Happiness: </td>
                                <td id="happiness">{(this.state.stat.hasOwnProperty('happiness'))? this.state.stat.happiness : ""}</td>
                            </tr>
                            <tr>
                                <td>Money: </td>
                                <td id="money">{(this.state.stat.hasOwnProperty('money'))? this.state.stat.money : ""}</td>
                            </tr>
                            <tr>
                                <td>Stamina: </td>
                                <td id="stamina">{(this.state.stat.hasOwnProperty('stamina'))? this.state.stat.stamina : ""}</td>
                            </tr>
                            <tr>
                                <td>Semester: </td>
                                <td>Year <div id= "year"> {(this.state.stat.hasOwnProperty('year'))? this.state.stat.year : ""}</div> sem <div id= "sem"> {(this.state.stat.hasOwnProperty('sem'))? Math.ceil(parseInt(this.state.stat.sem)/2) : ""}</div></td>
                            </tr>
                        </tbody>

                        </table>

                </div>
            </div>
        )
    }
}

export default StatDisplay;