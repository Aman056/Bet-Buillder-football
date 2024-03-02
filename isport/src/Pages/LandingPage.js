import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetFixtureData } from '../Redux/TeamSportsData/GetFixturesAction'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import NextWeekDate from '../Components/NextWeekDate'
import img from '../Image/football-8892.png'
export default function LandingPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const data = useSelector((state) => state.TeamLeaguesData)
    const dateForFilter = useSelector((state) => state.FilterDate)
    const [displayCount, setDisplayCount] = useState(20);
    const [searchResult, setSearchResult] = useState()
    const handleViewMore = () => {
        setDisplayCount(displayCount + 20);
    };
    useEffect(() => {
        dispatch(GetFixtureData())
    }, [dispatch])
    const handleClick = (data) => {
        navigate('/match-info', { state: { data } })
    }

    const formattedDate = dateForFilter?.clickedData?.split("/").join("/");
    function compareDates(dateStr1, dateStr2) {
        const parts1 = dateStr1.split('/');
        const parts2 = dateStr2.split('/');
        const date1 = new Date(parts1[2], parts1[0] - 1, parts1[1]); // month is 0-based
        const date2 = new Date(parts2[2], parts2[0] - 1, parts2[1]);
        return date1.getTime() === date2.getTime();
    }

    useEffect(() => {
        if (formattedDate) {
            const filteredData = data.data.filter(item => {
                const dateParts = item.MatchDate.split(" ");
                const convertedDate = dateParts[0];
                let parts = formattedDate.split('/');
                let temp = parts[0]
                parts[0] = parts[1]
                parts[1] = temp
                const formattedDate_ = parts.map(part => parseInt(part, 10).toString()).join('/');
                return compareDates(convertedDate, formattedDate_);
            });
            setSearchResult(filteredData)
        }
        else {
            setSearchResult(data?.data)
        }
    }, [formattedDate, data.data]);
    const renderRows = () => {
        if (searchResult !== undefined) {
            return searchResult?.slice(0, displayCount).map((item, index) => (
                <table className='w-100 mt-3' key={index}>
                    <thead>
                        <tr >
                            <span className='w-100 py-2 text-light'>     {item.Country}{item.Country && " - "}{item.LeagueName}</span>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                            <td className='py-3 pointer-event' onClick={() => handleClick(item)}>
                                <span>   {item?.Team1Name}  </span>
                                <span className='text-secondary'> {item?.MatchTime}</span>
                                <span>  {item.Team2Name}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            ));
        }
        else {
            return data?.data?.slice(0, displayCount).map((item, index) => (
                <table className='w-100 mt-3' key={index}>
                    <thead>
                        <tr >
                            <span className='w-100 py-2 text-light'>     {item.Country}{item.Country && " - "}{item.LeagueName}</span>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                            <td className='py-3' onClick={() => handleClick(item)}>
                                <span>   {item?.Team1Name}  </span>
                                <span className='text-secondary'> {item?.MatchTime}</span>
                                <span>  {item.Team2Name}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            ));
        }
    };
    return (
        <div>
            <h3 className='my-3'>TeamSportsData</h3>
            <div className=' d-flex justify-content-center'>
                <NextWeekDate />
            </div>
            {data.status === 'loading' && "Loading...."}
            <div className='mt-4 w-100'>
                <div className='container-fluid text-start my-1 football '>
                    <img src={img} className='' height={'14px'} width={'14px'} />
                    <span className='mx-2'><b>Football</b></span>
                </div>
                <div className="responsive-table-container container-fluid ">
                    {renderRows()}
                </div>
            </div>
            <div className='w-100 text-end mb-5 mt-4 d-grid justify-content-center'>
                <div className='container m-auto'>
                    {data?.data?.length > displayCount && (
                        <tfoot>
                            <tr>
                                <td colSpan="4">
                                    <button className='btn btn-primary' onClick={handleViewMore}>View More</button>
                                </td>
                            </tr>
                        </tfoot>
                    )}
                </div>

            </div>
        </div>
    )
}
