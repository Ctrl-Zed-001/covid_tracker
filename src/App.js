import React, { useState, useEffect } from 'react'
import BoxArea from './Compoenets/BoxArea'
import CountryBreakdown from './Compoenets/CountryBreakdown'
import Axios from "axios"
import WorldMap from './Compoenets/WorldMap'

const App = () => {
    const [summary, setSummary] = useState({})
    const [countryData, setCountryData] = useState()

    useEffect(
        () => {
            Axios.get("https://api.covid19api.com/summary")
                .then(res => {
                    setSummary(res.data.Global);
                    setCountryData(res.data.Countries)
                })
                .catch(err => console.log(err))
        }, []
    )
    return (
        <div className="container padding-4">
            {/* COUNT BOXES FOR CASES, RECOVERIES ETC... */}
            <BoxArea summary={summary} />

            {/* COUNTRY BREAKDON TABLE */}
            <CountryBreakdown data={countryData} />

            <WorldMap data={countryData} />

            <p className="text-center mt-4">Developed By <a href="https://github.com/Ctrl-Zed-001">Ctrl-Zed</a></p>

        </div>

    )
}

export default App
