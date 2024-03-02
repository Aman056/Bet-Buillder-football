import React from 'react';

export default function AddSuffix(dateString) {
    
    var parts = dateString.split(' ');
    var day = parts[0];
    var date = parseInt(parts[1], 10);
    var month = parts[2];
    console.log(month, date, day)
    var suffix = "";
    switch (date) {
        case 1:
        case 21:
        case 31:
            suffix = "st";
            break;
        case 2:
        case 22:
            suffix = "nd";
            break;
        case 3:
        case 23:
            suffix = "rd";
            break;
        default:
            suffix = "th";
    }

    var formattedDate = date + suffix + " " + month;
    return formattedDate;
}
