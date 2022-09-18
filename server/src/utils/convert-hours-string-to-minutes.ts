export function convertHoursStringToMinutes(hourtString: string){
  const [hours, minutes] = hourtString.split(':').map(Number);
  const minutesAmount = (hours * 60) + minutes;
  return minutesAmount;
}