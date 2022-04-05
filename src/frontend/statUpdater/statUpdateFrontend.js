export function statScheduleUpdate(newStat, plan) {
        //transition here
        
        /*
        sequence of events stored in plan
        's'->study                    gpa+1, stamina-20
        'w'->part time                money+1, stamina-20
        'g'->gym                      sports+1, stamina-20
        'f'->hang out with friends    happiness+1, stamina-20
        'r'->rest                     stamina+50
        */
    let original_stat = newStat;
    //handle stat
    for (let i = 0; i < plan.length; i++) {
        if (newStat.stamina<0){
            alert("Oh no! You didn't have enough rest and became exhausted! The schedule will be ineffective.");
            newStat = {
                ...original_stat,
                stamina: 0,
            }
            break;
        }
        switch(plan[i]) {
            case "s":
                newStat = {
                    ...newStat,
                    gpa: newStat.gpa+1,
                    stamina: newStat.stamina-20,
                }
                break;
            case "w":
                newStat = {
                    ...newStat,
                    money: newStat.money+1,
                    stamina: newStat.stamina-20,
                }
                break;
            case "g":
                newStat = {
                    ...newStat,
                    sports: newStat.sports+1,
                    stamina: newStat.stamina-20,
                }
                break;
            case "f":
                newStat = {
                    ...newStat,
                    happiness: newStat.happiness+1,
                    stamina: newStat.stamina-20,
                }
                break;
            case "r":
                let newStamina = ((newStat.stamina>50) ? 100 : newStat.stamina+50);
                newStat = {
                    ...newStat,
                    stamina: newStamina,
                }
                break;
        }
    }
    // handle year and sem
    if (newStat.sem === 4)
        newStat = {
            ...newStat,
            sem: 1,
            year: newStat.year+1,
        }
    else {
        newStat = {
            ...newStat,
            sem: newStat.sem+1,
        }
    }
    return newStat;
}