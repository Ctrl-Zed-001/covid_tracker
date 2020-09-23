import React, { useState, useEffect } from 'react'
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";



const WorldMap = ({ data }) => {

    const [toggle, setToggle] = useState({
        active: "cases",
        color: "#bfe1ff"
    })

    const [tooltip, setTooltipContent] = useState("")

    const [countryData, setCountryData] = useState([])

    useEffect(
        () => {
            if (data !== undefined) {
                let newArray = [];
                data.map(country => {
                    newArray.push({ name: country.Country, count: country.TotalConfirmed });
                })
                setCountryData([
                    ...newArray
                ])
            }
        }, [data]
    )



    const rounded = num => {
        if (num > 1000000000) {
            return Math.round(num / 100000000) / 10 + "Bn";
        } else if (num > 1000000) {
            return Math.round(num / 100000) / 10 + "M";
        } else {
            return Math.round(num / 100) / 10 + "K";
        }
    };

    const geoUrl =
        "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

    const toggleButton = (type, color) => {
        let newArray = [];
        if (type === "cases") {
            data.map(country => {
                newArray.push({ name: country.Country, count: country.TotalConfirmed });
            })
        } else if (type === "deaths") {
            data.map(country => {
                newArray.push({ name: country.Country, count: country.TotalDeaths });
            })
        } else {
            data.map(country => {
                newArray.push({ name: country.Country, count: country.TotalRecovered });
            })
        }

        setCountryData([
            ...newArray
        ])
        setToggle({
            active: type,
            color: color
        })
    }

    return (
        <div className="row mt-4 mb-4">
            <div className="col">
                <div>
                    <div className="card border-0 shadow">
                        <div className="card-body">
                            <h4 className="card-title mb-4">World Map</h4>

                            <div className="row mb-3">

                                <div className="col-md-4 mb-1">
                                    <div onClick={() => toggleButton("cases", " #bfe1ff")} className={`rounded border pointer map-toggle p-3 ${toggle.active === "cases" ? "cases" : ""}`}>
                                        <img alt="cases" src="/images/virus.svg" className="img-fluid float-right" />
                                        <h4>Cases</h4>
                                    </div>
                                </div>

                                <div className="col-md-4 mb-1">
                                    <div onClick={() => toggleButton("deaths", "#ffbfbf")} className={`rounded border pointer map-toggle p-3 ${toggle.active === "deaths" ? "deaths" : ""}`}>
                                        <img alt="deaths" src="/images/skull.svg" className="img-fluid float-right" />
                                        <h4>Deaths</h4>
                                    </div>
                                </div>

                                <div className="col-md-4 mb-1">
                                    <div onClick={() => toggleButton("recovered", "#bfffca")} className={`rounded border pointer map-toggle p-3 ${toggle.active === "recovered" ? "recovered" : ""}`}>
                                        <img alt="recovered" src="/images/life.svg" className="img-fluid float-right" />
                                        <h4>Recovered</h4>
                                    </div>
                                </div>

                            </div>
                            <p className="text-center">Tap on any country to view.</p>
                            <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
                                <ZoomableGroup>
                                    <Geographies geography={geoUrl}>
                                        {({ geographies }) =>
                                            geographies.map(geo => (
                                                <Geography
                                                    key={geo.rsmKey}
                                                    geography={geo}
                                                    onMouseEnter={() => {
                                                        const { NAME } = geo.properties;
                                                        let country = countryData.filter(cntry => NAME.toLowerCase() === cntry.name.toLowerCase())
                                                        let count = country[0].count;
                                                        setTooltipContent(`${NAME} — ${rounded(count)}`);
                                                    }}
                                                    onMouseLeave={() => {
                                                        setTooltipContent("");
                                                    }}
                                                    style={{
                                                        default: {
                                                            fill: "#D6D6DA",
                                                            outline: "none"
                                                        },
                                                        hover: {
                                                            fill: toggle.color,
                                                            outline: "none"
                                                        },
                                                        pressed: {
                                                            fill: "#E42",
                                                            outline: "none"
                                                        }
                                                    }}
                                                />
                                            ))
                                        }
                                    </Geographies>
                                </ZoomableGroup>
                            </ComposableMap>
                            <ReactTooltip>{tooltip}</ReactTooltip>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorldMap
