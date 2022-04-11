export function statEventUpdate(newStat, dia_line_sub) {

newStat = {
    ...newStat,
    gpa: newStat.gpa + parseInt(dia_line_sub[0]),
    sports: newStat.sports + parseInt(dia_line_sub[1]),
    money: newStat.money + parseInt(dia_line_sub[2]),
    happiness: newStat.happiness + parseInt(dia_line_sub[3]),
}

if (newStat.year === 1 && newStat.sem === 0){
    newStat = {
        ...newStat,
       sem: newStat.sem + 1,
    }
}
if (newStat.year === 5 && newStat.sem === 1){
    newStat = {
        ...newStat,
       sem: newStat.sem + 1,
    }
}
return newStat;
}