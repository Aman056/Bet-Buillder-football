// ConvertDateTime---->
export default function ConvertDateTime({ inputDateTime }) {
    const [datePart, timePart] = inputDateTime.split(' ');
    const [month, day, year] = datePart.split('/');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthName = monthNames[parseInt(month) - 1];
    const [hour, minute] = timePart.split(':');
    const formattedHour = hour.padStart(2, '0');
    const formattedMinute = minute.padStart(2, '0');
    const formattedTime = `${formattedHour}:${formattedMinute}`;
    return `${monthName} ${day} ${year} ${formattedTime}`;


}
