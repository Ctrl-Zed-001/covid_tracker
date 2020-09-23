import React from 'react'
import CountBox from './CountBox'

const BoxArea = ({ summary }) => {

    return (
        <div className="row">
            <h1 className="mt-4">Covid-19 Tracker</h1>
            <p className="text-muted mb-4">Track the spread of the Coronavirus Covid-19 outbreak</p>
            <div className="col-md-4 mb-3 mt-4">
                <CountBox title="TOTAL CASES" image="/images/cases.svg" count={summary.TotalConfirmed} new={summary.NewConfirmed} color="danger" />
            </div>
            <div className="col-md-4 mb-3 mt-4">
                <CountBox title="TOTAL DEATHS" image="/images/deaths.svg" count={summary.TotalDeaths} new={summary.NewDeaths} color="danger" />
            </div>
            <div className="col-md-4 mt-4 mb-4">
                <CountBox title="TOTAL RECOVERIES" image="/images/recoveries.svg" count={summary.TotalRecovered} new={summary.NewRecovered} color="custom" />
            </div>
            {/* <div className="col-md-6 mb-4">
                <CountBox title="ACTIVE CASES" image="/images/active_cases.svg" count={summary.NewConfirmed} new={summary.NewConfirmed} color="custom" />
            </div> */}
        </div>

    )
}

export default BoxArea
