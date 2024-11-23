function isMeetingPossible(startDay, endDay, startMeeting, durationMeeting){
  startDay = getRefactorValueInMinutes(startDay);
  endDay = getRefactorValueInMinutes(endDay);
  startMeeting = getRefactorValueInMinutes(startMeeting);
  return startMeeting >= startDay && startMeeting + durationMeeting <= endDay;
}
function getRefactorValueInMinutes(string){
  const stringList = string.split(':').map((element)=> +element);
  return stringList[0] * 60 + stringList[1];
}

isMeetingPossible('08:00', '17:30', '14:00', 90);
isMeetingPossible('8:0', '10:0', '8:0', 120);
isMeetingPossible('08:00', '14:30', '14:00', 90);
isMeetingPossible('14:00', '17:30', '08:0', 90);
isMeetingPossible('8:00', '17:30', '08:00', 900);
