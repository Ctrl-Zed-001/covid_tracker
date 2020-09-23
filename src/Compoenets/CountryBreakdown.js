import React, { useState, useEffect } from 'react'

const CountryBreakdown = ({ data }) => {

    const [countries, setCountries] = useState({
        sortedData: [],
        countryList: [],
        firstIndex: 0,
        lastIndex: 10
    })

    useEffect(
        () => {
            if (data !== undefined) {
                let list = data.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed).slice(0, 10)
                setCountries({
                    ...countries,
                    sortedData: data.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed),
                    countryList: list
                })
            }
        }, [data]
    )

    const filterCountry = (e) => {
        if (e.target.value !== "") {
            let filterArray = countries.sortedData.filter(arr => arr.Slug.toLowerCase().includes(e.target.value.toLowerCase())).slice(0, 10);
            setCountries({
                ...countries,
                countryList: filterArray
            })
        } else {
            var list = countries.sortedData.slice(0, 10)
            setCountries({
                ...countries,
                countryList: list
            })
        }
    }

    const changeList = (position) => {
        if (position === "next") {
            let nextArray = countries.sortedData.slice(countries.firstIndex + 10, countries.lastIndex + 10)
            setCountries({
                ...countries,
                countryList: nextArray,
                firstIndex: countries.firstIndex + 10,
                lastIndex: countries.lastIndex + 10
            })
        } else {
            let prevArray = countries.sortedData.slice(countries.firstIndex - 10, countries.lastIndex - 10)
            setCountries({
                ...countries,
                countryList: prevArray,
                firstIndex: countries.firstIndex - 10,
                lastIndex: countries.lastIndex - 10
            })
        }
    }

    return (
        <div className="row mt-4 mb-4">
            <h3> <span role="img" aria-label="world">🌎</span> Country Breakdown</h3>
            <div className="col-md-4 col-xs-12">
                <div className="input-group w-m-100 mt-2">
                    <label className="form-label">Search Country : &nbsp; </label>
                    <input type="text" className="rounded-pill form-control form-control-sm" onChange={filterCountry} />
                </div>
            </div>
            <div className="col-12">
                <div className="mt-4 table-responsive">
                    <table className="table table-striped border">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Country</th>
                                <th>Cases</th>
                                <th>Deaths</th>
                                <th>Recovered</th>
                                <th>New Cases</th>
                                <th>New Deaths</th>
                                <th>New Recovered</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                countries.countryList.length === 0 ?
                                    <tr></tr> :
                                    countries.countryList.map(single => {

                                        return (
                                            <tr key={single.CountryCode}>
                                                <td>{data && data.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed).indexOf(single) + 1}</td>
                                                <td><img className="img-fluid mr-2" alt={single.Slug} src={`https://www.countryflags.io/${single.CountryCode}/flat/32.png`} /> {single.Country}</td>
                                                <td>{single.TotalConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                <td>{single.TotalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                <td>{single.TotalRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                <td>{single.NewConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                <td>{single.NewDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                <td>{single.NewRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>

                                            </tr>
                                        )
                                    })

                            }
                        </tbody>
                    </table>
                    <nav aria-label="Page navigation example" className="float-right">
                        <ul className="pagination">
                            <li className={`page-item ${countries.firstIndex === 0 ? "disabled" : ""}`}><button className="page-link text-dark" onClick={() => changeList("prev")}>Previous</button></li>
                            <li className={`page-item ${countries.lastIndex >= 188 ? "disabled" : ""}`}><button className="page-link text-dark" onClick={() => changeList("next")}>Next</button></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default CountryBreakdown
