import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './statDisplay.css';
import statUpdateFromFrontend from './Main';

class statDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stat: null,
        }
        statUpdateFromFrontend = statUpdateFromFrontend.bind(this);
    }

    render(){
        return (
            <div className='container-fluid'>
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
                            <tr><td>User id: </td>
                                <td id="_id" /></tr>
                            <tr><td>GPA: </td>
                                <td id="gpa"/></tr>
                            <tr><td>Sports: </td>
                                <td id="sports"/></tr>
                            <tr><td>Happiness: </td>
                                <td id="happiness"/></tr>
                            <tr><td>Money: </td>
                                <td id="money"/></tr>
                            <tr><td>Stamina: </td>
                                <td id="stamina"/></tr>
                            <tr><td>Semester: </td>
                                <td>Year <span id= "year" /> sem <span id= "sem" /></td></tr>
                        </tbody>

                        </table>
                    </section>
                </div>
            </div>
        )
    }
}

export default statDisplay;

