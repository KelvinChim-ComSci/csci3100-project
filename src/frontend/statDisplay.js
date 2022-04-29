/**************************************************************************************** 
This component corresponds to the right top statistics bar in main page.
Display of GPA is rescaled linearly so that 150 actual GPA will be displayed as 4.
Actual semester is stored as 1-4, but when displayed we show 2 semesters and each 
semester has two halves. 
For instance, actually semester 3 is displayed as sem 2 (1st half).
Any change in statistics through updateStat function in main.js will trigger this 
component to update to the latest statistics.
Last update: 29/4/2022 by Ku Nok Tik
****************************************************************************************/

import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class StatDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stat : {},
        };
    }

    // this function is 
    update(stat) {
        this.setState({ stat: { ...this.state.stat, ...stat } });
    }

    // show year and sem if year <= 4 else show graduated
    displaySemester(){
        if (this.state.stat.hasOwnProperty('year') && this.state.stat.year>4)
            return (
                <span style={{paddingLeft: 0}}>Graduated</span>
            )
        else
            return (
                <span style={{paddingLeft: 0}}>Year {(this.state.stat.hasOwnProperty('year'))? this.state.stat.year : ""} sem {(this.state.stat.hasOwnProperty('sem'))? Math.ceil(this.state.stat.sem/2) : ""} ({(this.state.stat.hasOwnProperty('sem'))? ((this.state.stat.sem%2 === 0)? "2nd" : "1st") : ""} half)</span>
            )
    }

    render(){
        require('./statDisplay.css');

        // layout of the bar
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
                                <td>{(this.state.stat.hasOwnProperty('gpa'))? parseFloat(this.state.stat.gpa/150 * 4).toFixed(2) : ""}</td>
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

                        </table>

                        {this.displaySemester()}
                        

                </div>
            </div>
        )
    }
}

export default StatDisplay;