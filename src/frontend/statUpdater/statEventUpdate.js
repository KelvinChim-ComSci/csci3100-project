/**************************************************************************************** 
This component is activated when the event have to be updated. When the user is in school
year 1 and semester 0 or school year 5 and semester 1, this function would be triggered.

Last updated: 5/5/2022 by Ho Cheuk Hin
****************************************************************************************/

export function statEventUpdate(newStat, dia_line_sub) {

newStat = {
    ...newStat,
    gpa: newStat.gpa + parseInt(dia_line_sub[0]),
    sports: newStat.sports + parseInt(dia_line_sub[1]),
    money: newStat.money + parseInt(dia_line_sub[2]),
    happiness: newStat.happiness + parseInt(dia_line_sub[3]),
}

//Update when user is in school year 1 and semester 0 
if (newStat.year === 1 && newStat.sem === 0){
    newStat = {
        ...newStat,
       sem: newStat.sem + 1,
    }
}

//Update when user is in school year 5 and semester 1
if (newStat.year === 5 && newStat.sem === 1){
    newStat = {
        ...newStat,
       sem: newStat.sem + 1,
    }
}
return newStat;
}