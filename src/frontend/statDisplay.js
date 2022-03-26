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
        return (
            <div className="container-fluid">
                <div className = "row">
                    <section id="statusList" className = "col-sm-3 col-lg-3 col-xl-3">

                        <table>

                        <thead>
                            <tr>
                                <th scope="col">Statistics</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>User id: </td>
                                <td id="_id"/>
                            </tr>
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
                                <td>Year <span id= "year"> {(this.state.stat.hasOwnProperty('year'))? this.state.stat.year : ""}</span> sem <span id= "sem"> {(this.state.stat.hasOwnProperty('sem'))? this.state.stat.sem : ""}</span></td>
                            </tr>
                        </tbody>

                        </table>
                    </section>
                </div>
            </div>
        )
    }
}

export default StatDisplay;