import React from "react"
import Flatpickr from "react-flatpickr"
import moment from "moment"
import { Col } from "reactstrap"
const AdvanceOptions = ({ dataToSearch, advanceSearchValue, updateData }) => {
    return (
        <>
            {dataToSearch.map((item, index) => (
                <Col key={index} md="4" className="mb-1">
                    <label>{item.name}</label>
                    {item.type === "text" ? (
                        <input
                            className="form-control advanInputs"
                            name={`columns[${index}][search][value]`}
                            value={advanceSearchValue[`columns[${index}][search][value]`]}
                            onChange={(e) => updateData(e)}
                            placeholder={item.name}
                        />
                    ) : item.type === "date" ? (
                        <Flatpickr
                            options={{ dateFormat: "Y-m-d", mode: 'range' }}
                            className="form-control advanInputs"
                            name={`columns[${index}][search][value]`}
                            onChange={(date) => {
                                console.log(date)
                                try {
                                    updateData({
                                        target: {
                                            name: `columns[${index}][search][value]`,
                                            value: `${moment(date[0]).format("YYYY-MM-DD")},${moment(date[1]).format("YYYY-MM-DD")}`
                                        }
                                    })
                                } catch (error) {
                                    console.log(error)
                                }
                            }}
                            placeholder={item.name}
                        />
                    ) : item.type === "select" ? (
                        <select
                            className="form-control advanInputs"
                            name={`columns[${index}][search][value]`}
                            value={advanceSearchValue[`columns[${index}][search][value]`]}
                            onChange={(e) => updateData(e)}
                        >
                            {item.options.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                    ) : null
                    }
                </Col>
            ))}
        </>
    )
}

export default AdvanceOptions
