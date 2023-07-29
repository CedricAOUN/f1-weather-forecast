import { add, sub } from "date-fns";

// export const nextSessionDate = (races: []) => {
//   let currentDate = new Date().getTime();
//   races.find((race: any) => {
//     if (new Date(`${race.date} ${race.time}`).getTime() > currentDate) {
//       if (race.hasOwnProperty("Sprint")) {
//         let firstSession = new Date(
//           `${race.FirstPractice.date} ${race.FirstPractice.time}`,
//         );
//         let secondSession = new Date(
//           `${race.Qualifying.date} ${race.Qualifying.time}`,
//         );
//         let thirdSession = new Date(
//           `${race.SecondPractice.date} ${race.SecondPractice.time}`,
//         );
//         let fourthSession = new Date(`${race.Sprint.date} ${race.Sprint.time}`);
//         let raceSession = new Date(`${race.date} ${race.time}`);
//
//         let dateArray = [
//           firstSession,
//           secondSession,
//           thirdSession,
//           fourthSession,
//           raceSession,
//         ];
//
//         let closest = dateArray.map((d) =>
//           Math.abs(new Date().getTime() - new Date(d).getTime()),
//         );
//
//         return dateArray[closest.indexOf(Math.min(...closest))];
//       } else {
//         let firstSession = new Date(
//           `${race.FirstPractice.date} ${race.FirstPractice.time}`,
//         );
//         let secondSession = new Date(
//           `${race.SecondPractice.date} ${race.SecondPractice.time}`,
//         );
//         let thirdSession = new Date(
//           `${race.ThirdPractice.date} ${race.ThirdPractice.time}`,
//         );
//         let fourthSession = new Date(
//           `${race.Qualifying.date} ${race.Qualifying.time}`,
//         );
//         let raceSession = new Date(`${race.date} ${race.time}`);
//
//         let dateArray = [
//           firstSession,
//           secondSession,
//           thirdSession,
//           fourthSession,
//           raceSession,
//         ];
//         let closest = dateArray.map((d) =>
//           Math.abs(new Date().getTime() - new Date(d).getTime()),
//         );
//
//         return dateArray[closest.indexOf(Math.min(...closest))];
//       }
//     }
//   });
// };

export const isLiveSession = (sessionDate: Date, race: boolean): boolean => {
  let currentDate = new Date();
  if (race) {
    return (
      sessionDate > sub(currentDate, { hours: 2 }) && sessionDate < currentDate
    );
  }
  return (
    sessionDate > sub(currentDate, { hours: 1, minutes: 15 }) &&
    sessionDate < currentDate
  );
};

export function isAnySessionLive(sessions: any): string {
  let liveSession = "";
  sessions.find((session) => {
    if (isLiveSession(session.date, session.sessionName == "Race")) {
      return (liveSession = session.sessionName);
    }
  });
  return liveSession;
}

export const isPastSession = (sessionEndDate: Date): boolean => {
  return sessionEndDate < new Date();
};

export const currentGP = (tracks: any): any | null => {
  let closest = null;
  tracks.find((track) => {
    let trackDate = new Date(`${track.date} ${track.time}`);
    if (
      trackDate <= add(new Date(), { days: 3 }) &&
      trackDate >= sub(new Date(), { days: 4 })
    )
      return (closest = track);
  });
  return closest;
};

export function nearestSession(trackSessions: any) {
  let closest;
  let sortedSessions = trackSessions.sort((a, b) => {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);

    return dateA.getTime() - dateB.getTime();
  });

  sortedSessions.find((session) => {
    if (session.date > new Date()) {
      return (closest = session);
    }
  });
  return closest;
}

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
