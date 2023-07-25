export const nextSessionDate = (races: []) => {
    let currentDate = new Date().getTime();
    races.some((race: any) => {
        if(new Date(`${race.date} ${race.time}`).getTime() > currentDate) {
            if(race.hasOwnProperty('Sprint')) {
                let firstSession = new Date(`${race.FirstPractice.date} ${race.FirstPractice.time}`);
                let secondSession = new Date(`${race.Qualifying.date} ${race.Qualifying.time}`);
                let thirdSession = new Date(`${race.SecondPractice.date} ${race.SecondPractice.time}`);
                let fourthSession = new Date(`${race.Sprint.date} ${race.Sprint.time}`);
                let raceSession = new Date(`${race.date} ${race.time}`);

                let dateArray = [
                    firstSession,
                    secondSession,
                    thirdSession,
                    fourthSession,
                    raceSession,
                ]

                let closest = dateArray.map(d => Math.abs(new Date().getTime() - new Date(d).getTime()));

                closestSession = dateArray[closest.indexOf(Math.min(...closest))]

                return true;
            } else {
                let firstSession = new Date(`${race.FirstPractice.date} ${race.FirstPractice.time}`)
                let secondSession = new Date(`${race.SecondPractice.date} ${race.SecondPractice.time}`)
                let thirdSession = new Date(`${race.ThirdPractice.date} ${race.ThirdPractice.time}`)
                let fourthSession = new Date(`${race.Qualifying.date} ${race.Qualifying.time}`)
                let raceSession = new Date(`${race.date} ${race.time}`)

                let dateArray = [
                    firstSession,
                    secondSession,
                    thirdSession,
                    fourthSession,
                    raceSession
                ]
                let closest = dateArray.map(d => Math.abs(new Date().getTime() - new Date(d).getTime()))

                closestSession = dateArray[closest.indexOf(Math.min(...closest))]

                return true;
            }
        }
    })
}


export let closestSession = new Date();



