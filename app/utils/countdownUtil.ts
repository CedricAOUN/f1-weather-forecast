import { sub } from "date-fns";
import { getNextTrack } from "@/app/utils/tracksAPI";

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

export const currentGP = async () => {
  let nextGPRes = await getNextTrack();
  let nextGP = nextGPRes.data.MRData.RaceTable.Races[0];

  if (nextGP.date <= new Date()) {
    return null;
  } else {
    return nextGP;
  }
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
    } else {
      return (closest = null);
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
