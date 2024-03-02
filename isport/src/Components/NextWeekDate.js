import React, { useState, useEffect } from 'react';
import { setClickedData } from '../Redux/DateTransfer/DateTransfer_';
import { useDispatch } from 'react-redux'
import AddSuffix from './AddSuffix';
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
                // nextWeekDatesArray.push(nextDate.toLocaleDateString('en-GB', options));
                var parts = nextDate.toLocaleDateString('en-GB', options).split('/');
                var day = new Date(parts[2], parts[0] - 1, parts[1]).toLocaleDateString('en-US', { weekday: 'short' });
                var date = parseInt(parts[1], 10) - 1;
                var month = new Date(parts[2], date, parts[0]).toLocaleDateString('en-US', { month: 'short' });

                switch (parseInt(parts[0], 10)) {
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
        dispatch(setClickedData(date))
        setActive(index)
    }

    return (
        <div className='filter-btn-group'>
            <div className='container-fluid d-flex child-btn-grp'>
                {nextWeekDates?.map((item, index) => (
                    <span
                        className={`filter-btn rounded-5 ${index === active ? "active-btn text-light" : "in-active"
                            } mx-2 mt-1`}
                        key={index}
                        onClick={() => handlClick(item.toShow, index)}
                    >
                        <div className="date-info">
                            <div className="day">{item.Day}</div>
                            <div className="date">
                                <div className="month">  {item?.Date + index}<sup>{item?.Suffix}</sup> {item?.Month}</div>
                            </div>

                        </div>
                    </span>
                ))}
            </div>
        </div>

    );
};

export default NextWeekDates;
