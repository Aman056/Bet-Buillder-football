import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ConvertDateTime from '../Components/ConvertDateTime';
import { useDispatch, useSelector } from 'react-redux'
import { MarketApi } from '../Redux/Market/MarketsAction';
import { LegsApi } from '../Redux/Legs/LegsAction';
import { BetBuilder } from '../Redux/BetBuilderBets/BetBuilderBetsAction';
import Table from '../Components/Table';
import { Link } from 'react-router-dom';

export default function MatchInfo() {
    const MarketData = useSelector((state) => state.Market)
    const BetBuilderData = useSelector((state) => state.BetBuilder)
    const Legs = useSelector((state) => state.Legs)
    const [selected_Data, setSelected_Data] = useState()
    const location = useLocation();
    const dispatch = useDispatch()
    const data = location.state.data;

    useEffect(() => {
        dispatch(MarketApi())
        dispatch(LegsApi())
    }, [dispatch])

    const handleChange = (e) => {
        const data = e.target
        setSelected_Data({ ...selected_Data, [data.name]: data.value })
    }
    useEffect(() => {
        const Data_top_Post = {
            "matchId": data?.MatchId,
            "marketId": selected_Data?.MarketId,
            "legs": selected_Data?.legs
        }
        if (selected_Data && selected_Data?.legs) {
            dispatch(BetBuilder(Data_top_Post));
        }
    }, [dispatch, selected_Data?.legs, selected_Data?.MarketId]);

    return (
        <div className='container-fluid-Modify m-auto'>
            <div className='row mt-4 m-auto'>
                <div className='col text-start'>
                    <Link to={'/'}>
                        <i class="bi bi-arrow-left-circle-fill fs-2"></i>
                    </Link>

                </div>
            </div>
            <div className='container text-start my-3 make-it-bet-builder-section'>
                <h4 className='py-3 px-4'>Make it a Bet Builder?</h4>

            </div>
            <div className='Gradient-div py-3'>
                <div className='text-light w-25'><ConvertDateTime inputDateTime={data.KickOffUtc} /></div>
                <div className='team-match text-light w-75'>
                    <h6 className='fw-medium m-0'>{data.MatchName.toUpperCase()}</h6>
                    <span className='m-0 fs-6'> {data?.Country} - {data?.LeagueName}</span>

                </div>
            </div>

            <span className='text-danger my-2'>{BetBuilderData?.error}</span>
            <div className='group-dropdown mt-5  w-100'>

                <div className='p-1 d-flex flex-wrap justify-content-center'>
                    <label className='mt-2 fw-bolder'>Selection:</label>
                    <select className='mx-1 selection-dropdown dropdown' onChange={handleChange} name='MarketId'>
                        {MarketData?.data?.map((item, index) => (
                            <option key={index} value={item.MarketId}>{item.MarketName}</option>
                        ))}
                    </select>
                </div>

                <div className='p-1 d-flex  flex-wrap justify-content-center'>
                    <label className='mt-2 fw-bolder'>Legs:</label>
                    <select className='leg-dropdown dropdown' onChange={handleChange} name='legs'>
                        {Legs?.data?.map((item, index) => (
                            <option key={index} value={item.selectionValue}>{item.selectionValue}</option>
                        ))}
                    </select>
                </div>

            </div>
            <div className='container'>
                {BetBuilderData.status === 'loading' && 'Loading.....'}
                <div className='container mt-5'>

                    {BetBuilderData.status === 'succeeded' && <Table data={BetBuilderData} />}
                </div>


            </div>
        </div>
    )
}
