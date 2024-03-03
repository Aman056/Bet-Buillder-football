import React, { useState, useEffect } from 'react';
import { setClickedData } from '../Redux/DateTransfer/DateTransfer_';
import { useDispatch } from 'react-redux'
const NextWeekDates = () => {
    const [nextWeekDates, setNextWeekDates] = useState();
    const [active, setActive] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        const getNextWeekDates = () => {
            const today = new Date();
            const nextWeekDatesArray = [];
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            for (let i = 0; i < 7; i++) {
                const nextDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);

                var parts = nextDate.toLocaleDateString('en-GB', options).split('/');
                console.log(parts)
                var day = new Date(parts[2], parts[0] - 1, parts[1]).toLocaleDateString('en-US', { weekday: 'short' });
                var date = parseInt(parts[1]) - 1;
                var month = new Date(parts[2], date, parts[0]).toLocaleDateString('en-US', { month: 'short' });
                switch (parseInt(parts[0])) {
                    case 1:
                    case 21:
                    case 31:

                        nextWeekDatesArray.push({
                            toShow: nextDate.toLocaleDateString('en-GB', options),
                            Day: day,
                            Date: date,
                            Month: month,
                            Suffix: 'st'

                        });
                        break;
                    case 2:
                    case 22:
                        nextWeekDatesArray.push({
                            toShow: nextDate.toLocaleDateString('en-GB', options),
                            Day: day,
                            Date: date,
                            Month: month,
                            Suffix: 'nd'

                        });
                        break;
                    case 3:
                    case 23:
                        nextWeekDatesArray.push({
                            toShow: nextDate.toLocaleDateString('en-GB', options),
                            Day: day,
                            Date: date,
                            Month: month,
                            Suffix: 'rd'

                        });
                        break;
                    default:
                        nextWeekDatesArray.push({
                            toShow: nextDate.toLocaleDateString('en-GB', options),
                            Day: day,
                            Date: date,
                            Month: month,
                            Suffix: 'th'

                        });
                }
            }
            return nextWeekDatesArray;
        };
        setNextWeekDates(getNextWeekDates());
    }, []);

    const handlClick = (date, index) => {
        const formattedDay = date.date < 10 ? `0${date.date}` : date.date;
        let Swap = date.Date.split("/");
        Swap[0] = formattedDay;
        dispatch(setClickedData(Swap.join("/")))
        setActive(index)
    }


    function getOrdinalSuffix(day) {
        const j = day % 10,
            k = day % 100;
        if (j === 1 && k !== 11) {
            return 'st';
        }
        if (j === 2 && k !== 12) {
            return 'nd';
        }
        if (j === 3 && k !== 13) {
            return 'rd';
        }
        return 'th';
    }
   
function formatDate(dateString) {
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
  
    const daySuffix = getOrdinalSuffix(day);
  
    const dateObject = {
      day: parts[0],
      month: parts[1],
      year: parts[2]
    };
  
    const date = new Date(year, month - 1, day);
  
    const options = { weekday: 'short', month: 'short' };
    const formattedDate = date.toLocaleDateString('en-GB', options);
  
    return {
      date: dateObject,
      day: formattedDate.split(' ')[0],
      month: formattedDate.split(' ')[1],
      suffix: daySuffix
    };
  }

    return (
        <div className='filter-btn-group'>
            <div className='container-fluid d-flex child-btn-grp'>

                {nextWeekDates?.map((item, index) => (
                    <div
                        className={`filter-btn py-1 rounded-5 ${index === active ? "active-btn text-light" : "in-active"
                            } mx-1 mt-1`}
                        key={index}
                        onClick={() => handlClick({ "date": item.Date + index+1, "Date": item.toShow }, index)}
                    >
                        <div className="date-info">
                            <div className="day">{(formatDate(item.toShow)).month}</div>
                            <div className="date">
                                <div className="month">  {(formatDate(item.toShow).date.day)}<sup>{item?.Suffix}</sup> {(formatDate(item.toShow).day)}</div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default NextWeekDates;
