import React from 'react';

const Table = ({ data }) => {
    return (
        <div className="table-responsive">
            <div className='w-100 text-start'>
                <span className='text-dark text-start'><b>Bet Builder Odds:</b> <text className='builder-text fs-6 '> {data?.data?.TotalOdds}</text></span>
            </div>
            {data?.data?.BetBuilderSelections.length > 0 ?
                <table className="table">
                    <thead className="thead-light-green">
                        <tr>
                            <th>Key Stats</th>
                            <th>Market</th>
                            <th>Outcomes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.BetBuilderSelections?.map((item, index) => (
                            <tr key={index}>
                                <td className='text-start'>
                                    {item.RTB.split(/\b(\d+)\b/).map((part, index) => {
                                        return /\d+/.test(part) ? <span key={index} style={{ color: "red" }}>{part}</span> : <span key={index}>{part}</span>;
                                    })}</td>
                                <td>{item.Market}</td>
                                {/* <td>
                                    <SubmarketCalculator key={index} decimalOdds={item?.Odds?.Decimal} fractionalOdds={item?.Odds?.Fractional} />
                                </td> */}
                                <td>{item.Selection}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> : ''
            }


        </div>
    );
};

export default Table;
