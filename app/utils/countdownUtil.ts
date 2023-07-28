export const nextSessionDate = (races: []) => {
  let currentDate = new Date().getTime();
  races.some((race: any) => {
    if (new Date(`${race.date} ${race.time}`).getTime() > currentDate) {
      if (race.hasOwnProperty("Sprint")) {
        let firstSession = new Date(
          `${race.FirstPractice.date} ${race.FirstPractice.time}`,
        );
        let secondSession = new Date(
          `${race.Qualifying.date} ${race.Qualifying.time}`,
        );
        let thirdSession = new Date(
          `${race.SecondPractice.date} ${race.SecondPractice.time}`,
        );
        let fourthSession = new Date(`${race.Sprint.date} ${race.Sprint.time}`);
        let raceSession = new Date(`${race.date} ${race.time}`);

        let dateArray = [
          firstSession,
          secondSession,
          thirdSession,
          fourthSession,
          raceSession,
        ];

        let closest = dateArray.map((d) =>
          Math.abs(new Date().getTime() - new Date(d).getTime()),
        );

        closestSession = dateArray[closest.indexOf(Math.min(...closest))];

        return true;
      } else {
        let firstSession = new Date(
          `${race.FirstPractice.date} ${race.FirstPractice.time}`,
        );
        let secondSession = new Date(
          `${race.SecondPractice.date} ${race.SecondPractice.time}`,
        );
        let thirdSession = new Date(
          `${race.ThirdPractice.date} ${race.ThirdPractice.time}`,
        );
        let fourthSession = new Date(
          `${race.Qualifying.date} ${race.Qualifying.time}`,
        );
        let raceSession = new Date(`${race.date} ${race.time}`);

        let dateArray = [
          firstSession,
          secondSession,
          thirdSession,
          fourthSession,
          raceSession,
        ];
        let closest = dateArray.map((d) =>
          Math.abs(new Date().getTime() - new Date(d).getTime()),
        );

        closestSession = dateArray[closest.indexOf(Math.min(...closest))];

        return true;
      }
    }
  });
};

export const currentDate = new Date();
const ONE_HOUR = 60 * 60 * 1000;
const TWO_HOURS = ONE_HOUR * 2;
const anHourAhead = Date.now() + ONE_HOUR;
const twoHoursAhead = Date.now() + TWO_HOURS;

export const isLiveSession = (sessionDate: Date, race: boolean): boolean => {
  if (race) {
    return (
      sessionDate.getTime() < twoHoursAhead &&
      sessionDate.getTime() > currentDate.getTime()
    );
  }
  return (
    sessionDate.getTime() < anHourAhead &&
    sessionDate.getTime() > currentDate.getTime()
  );
};

export const isPastSession = (sessionEndDate: Date): boolean => {
  return sessionEndDate < currentDate;
};

export function TrackSessions(track: any) {
  const Sessions: { sessionName: string; date: Date }[] = [];
  Sessions.push({
    sessionName: "FP1",
    date: new Date(`${track.FirstPractice.date} ${track.FirstPractice.time}`),
  });
  if (track.hasOwnProperty("Sprint")) {
    Sessions.push({
      sessionName: "Qualifying",
      date: new Date(`${track.Qualifying.date} ${track.Qualifying.time}`),
    });
    Sessions.push({
      sessionName: "Sprint Shootout",
      date: new Date(
        `${track.SecondPractice.date} ${track.SecondPractice.time}`,
      ),
    });
    Sessions.push({
      sessionName: "Sprint",
      date: new Date(`${track.Sprint.date} ${track.Sprint.time}`),
    });
  } else {
    Sessions.push({
      sessionName: "FP2",
      date: new Date(
        `${track.SecondPractice.date} ${track.SecondPractice.time}`,
      ),
    });
    Sessions.push({
      sessionName: "FP3",
      date: new Date(`${track.ThirdPractice.date} ${track.ThirdPractice.time}`),
    });
    Sessions.push({
      sessionName: "Qualifying",
      date: new Date(`${track.Qualifying.date} ${track.Qualifying.time}`),
    });
  }
  Sessions.push({
    sessionName: "Race",
    date: new Date(`${track.date} ${track.time}`),
  });
  return Sessions;
}

export let closestSession = new Date();
