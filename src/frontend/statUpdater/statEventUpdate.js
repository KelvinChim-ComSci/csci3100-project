export function statEventUpdate(newStat, dia_line_sub) {

console.log(dia_line_sub[0]);
newStat = {
    ...newStat,
    gpa: newStat.gpa+parseInt(dia_line_sub[0]),
    sports: newStat.sports + parseInt(dia_line_sub[1]),
    money: newStat.money + parseInt(dia_line_sub[2]),
    happiness: newStat.happiness + parseInt(dia_line_sub[3]),
}
return newStat;
}