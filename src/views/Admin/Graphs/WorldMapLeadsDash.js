// import { geoIdentity } from 'd3'
import React from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import { scaleLinear } from 'd3-scale' // Import the d3-scale function
// import countries from '../../NewFrontBase/Country'

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

const data = [
  { country: "USA", value: 100},
  { country: "CAN", value: 50},
  { country: "IND", value: 100 },
  { country: "SOM", value: 70},
  { country: "NPL", value: 10},
  { country: "VEN", value: 70}
  // Add more data entries as needed
]

const getColor = (value) => {
  const maxValue = Math.max(...data.map((entry) => entry.value))
  const colorScale = scaleLinear().domain([0, maxValue]).range(["#f0f0f0", "#d32f2f"])
  // console.log("colorScale:", colorScale(value))
  return colorScale(value)
}

const WorldMapLeadsDash = () => {
  return (
    <div>
      <ComposableMap>
        <ZoomableGroup center={[0, 0]} zoom={1}> {/* Adjust the zoom level as needed */}
          <Geographies geography={geoUrl}>
            {({ geographies }) => geographies.map((geo) => {
                // console.log("geo: ===>", geo)
                const countryData = data.find((d) => d.country === geo.id)
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={countryData ? getColor(countryData.value) : "#EEE"}
                  />
                )
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}

export default WorldMapLeadsDash