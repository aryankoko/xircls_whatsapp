import React, { useState } from 'react'
import Wrapper from './Wrapper'
import { Edit2 } from 'react-feather'
import Button from 'react-bootstrap/Button'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { SelectInput, CheckBox, RadioInput } from './components'

// import Wrapper from './Wrapper'
// import { SuperLeadzBaseURL } from '../../../../assets/auth/jwtService'
// import axios from 'axios'
// import { useParams } from 'react-router-dom'

const Rules = () => {
    // const { id } = useParams()
    // useEffect(() => {
    //     const url = new URL(`${SuperLeadzBaseURL}/api/v1/pop_up_analytics/?shop=&app=superleadz&theme_id=${id}`)

    //     axios({
    //         method: "GET",
    //         url
    //     })
    //         .then((response) => {
    //             const theme = response.data.theme_json
    //             const custom_theme = JSON.parse(theme[0].custom_theme)
    //             setTitle(custom_theme.pages)

    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }, [])
    const [expand, setExpand] = useState(false)

    return (
        <>
            <style>
                {`
                    .container {
                        display: block;
                        position: relative;
                        cursor: pointer;
                        padding-left: 35px !important;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        user-select: none;
                      }
                      
                      .container input {
                        position: absolute;
                        opacity: 0;
                        cursor: pointer;
                      }

                      .checkmark {
                        position: absolute;
                        top: 2px;
                        left: 0;
                        height: 16px;
                        width: 16px;
                        background-color: #ffffff;
                        border-radius: 50%;
                        border: 1px solid #006aff;
                      }

                      .container:hover input ~ .checkmark {
                      }

                      .container input:checked ~ .checkmark {
                        background-color: #006aff;
                      }

                      .checkmark:after {
                        content: "";
                        position: absolute;
                        display: none;
                      }

                      .container input:checked ~ .checkmark:after {
                        display: block;
                      }

                      .container .checkmark:after {
                           top: 4px;
                          left: 4px;
                          width: 6px;
                          height: 6px;
                          border-radius: 50%;
                          background: white;
                      }
                      ul {
                        display: block;
                        list-style-type: disc;
                        margin-top: 1em;
                        margin-bottom: 1 em;
                        margin-left: 0;
                        margin-right: 0;
                        padding-left: 40px;
                      }
                      li::marker{
                        color: #006aff;
                        font-size: 20px;
                      }
                `}
            </style>
            <div className=''>
                <Wrapper />
                <div className=' mt-3'>
                    <div>
                        <div className='d-flex justify-content-between '>
                            <div>
                                <h4 className="">Rule-based</h4>
                            </div>
                            <div>
                                <Button variant="outline-primary d-flex gap-1 align-items-center" onClick={() => setExpand(!expand)}>
                                    <span><Edit2 size={20} /></span>
                                    Edit
                                </Button>
                            </div>
                        </div>
                        <div>
                            <ul>
                                <li>Show once per session</li>
                                <li>Spend on the page 20 seconds</li>
                                <li>Stop to display forever after subscription from any widget</li>
                                <li>Show in sequence using Silent Interval</li>
                                <li>Show on all types of devices</li>
                                <li>On any pages</li>
                                <li>Show in all locations</li>
                            </ul>
                        </div>

                    </div>
                    <div className=" mt-1" style={{ height: `${expand ? "306vh" : "0vh"}`, overflowY: "hidden", transition: "height 0.5s" }}>

                        <div className=" d-flex gap-1 mb-2">
                            <div >
                                {/* <Activity /> */}
                            </div>
                            <div className='mt-1'>
                                <h4>Display Frequency</h4>
                                <RadioInput name="frequency" title="Do not limit" />
                                <RadioInput name="frequency" title="Only once" />
                                <RadioInput name="frequency" title="Once per session" />
                                <div className='d-flex align-items-center gap-1'>

                                    <div>
                                        <label class="container">
                                            One time per
                                            <input type="radio" name="frequency" />
                                            <span class="checkmark"></span>
                                        </label>

                                    </div>
                                    <div>
                                        <SelectInput options={[{ label: "1", value: "1" }, { label: "2", value: "2" }, { label: "3", value: "3" }]} disabled={true} />
                                    </div>
                                    <div>
                                        <SelectInput options={[{ label: "Days", value: "Days" }, { label: "Months", value: "Months" }, { label: "Year", value: "Year" }]} disabled={false} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr />

                        <div className='d-flex gap-1 mb-2'>
                            <div>
                                {/* <Activity /> */}
                            </div>
                            <div >
                                <h4 className='mb-1'>When to display</h4>
                                <RadioInput name="display" title="Immediately" />
                                <RadioInput name="display" title="When All Conditions are met" />
                                <RadioInput name="display" title="When any Condition is met" />
                                <div className='d-flex align-items-center gap-1 mb-2 mt-2'>
                                    <CheckBox title="Spend on the page" />
                                    <div>
                                        <SelectInput options={[{ label: "1", value: "1" }, { label: "2", value: "2" }, { label: "3", value: "3" }]} disabled={false} />
                                    </div>
                                    <div>
                                        <SelectInput options={[{ label: "Seconds", value: "Seconds" }, { label: "Minutes", value: "Minutes" }]} disabled={false} />
                                    </div>
                                </div>
                                <div className='d-flex align-items-center gap-1 mb-2'>
                                    <CheckBox title="Spend on the Website" />
                                    <div>
                                        <SelectInput options={[{ label: "1", value: "1" }, { label: "2", value: "2" }, { label: "3", value: "3" }]} disabled={false} />
                                    </div>
                                    <div>
                                        <SelectInput options={[{ label: "Seconds", value: "Seconds" }, { label: "Minutes", value: "Minutes" }]} disabled={false} />
                                    </div>
                                </div>
                                <div className='d-flex align-items-center gap-1 mb-2'>
                                    <CheckBox title="Read the page by" />
                                    <div>
                                        <SelectInput options={[{ label: "1", value: "1" }, { label: "2", value: "2" }, { label: "3", value: "3" }]} disabled={false} />
                                    </div>
                                    <p className='m-0'>%</p>
                                </div>
                                <div className='d-flex align-items-center  gap-1 mb-2'>
                                    <CheckBox title="Visited" />
                                    <div>
                                        <SelectInput options={[{ label: "1", value: "1" }, { label: "2", value: "2" }, { label: "3", value: "3" }]} disabled={false} />
                                    </div>
                                    <p className='m-0'>Pages</p>
                                </div>
                                <div className='d-flex align-items-center gap-1 mb-2'>
                                    <CheckBox title="Not active on the page" />

                                    <div>
                                        <SelectInput options={[{ label: "1", value: "1" }, { label: "2", value: "2" }, { label: "3", value: "3" }]} disabled={false} />
                                    </div>
                                    <div>
                                        <SelectInput options={[{ label: "Seconds", value: "Seconds" }, { label: "Minutes", value: "Minutes" }]} disabled={false} />
                                    </div>
                                </div>
                                <div className='d-flex align-items-center gap-1 mb-2'>
                                    <CheckBox title="Exit Intent" />
                                </div>

                                <h4 className='mt-2 mb-1'>When to Stop displaying</h4>
                                <div className='d-flex align-items-center gap-1 mb-2'>
                                    <CheckBox title="After" />
                                    <div>
                                        <SelectInput options={[{ label: "1", value: "1" }, { label: "2", value: "2" }, { label: "3", value: "3" }]} disabled={false} />
                                    </div>
                                    <p >Seconds, in case of no interaction with the widget</p>
                                </div>
                                <p>The condition canceled when a user hovers the widget</p>

                                <div className='d-flex align-items-center gap-1 mb-2 '>
                                    <CheckBox title="After closing" />
                                    <div>
                                        <SelectInput options={[{ label: "1", value: "1" }, { label: "2", value: "2" }, { label: "3", value: "3" }]} disabled={false} />
                                    </div>
                                    <p className='m-0'>times</p>
                                </div>
                                <div className='d-flex align-items-center gap-1 mb-2'>
                                    <CheckBox title="After subscription" />
                                </div>
                                <RadioInput name="stopDisplay" title="From any widget" />
                                <RadioInput name="stopDisplay" title="From this widget" />

                            </div>
                        </div>

                        <hr />

                        <div className='d-flex gap-1 mb-2'>
                            <div>
                                {/* <Activity /> */}
                            </div>
                            <div >
                                <h4 className='mb-1'>Annoyance Safeguard</h4>
                                <div>
                                    <p>What to do with this widget if:</p>
                                </div>
                                <div className='ms-2'>
                                    <p>-Another widget has to be displayed together with this one</p>
                                    <p>-Another widget is displayed on the screen</p>
                                    <p>-Another widget has been displayed recently</p>
                                </div>
                                <div className='mb-1'>
                                    <Link to='/' style={{ textDecoration: "underline" }}>How it works</Link>
                                </div>
                                <div>
                                    <RadioInput name="safeguard" title="Show" />
                                    <RadioInput name="safeguard" title="Show in sequence using Slient Interval" />
                                    <RadioInput name="safeguard" title="Don't show during the current session" />
                                </div>
                            </div>
                        </div>

                        <hr />

                        <div className='d-flex gap-1 mb-2'>
                            <div>
                                {/* <Activity /> */}
                            </div>
                            <div >
                                <h4 className='mb-2'>To Whom</h4>
                                <div className="mb-2">
                                    <CheckBox title="New Visitors" />
                                </div>
                                <RadioInput name="toWhom" title="Show on all device types" />
                                <RadioInput name="toWhom" title="Show on desktop" />
                                <RadioInput name="toWhom" title="Show on mobile" />
                            </div>
                        </div>

                        <hr />

                        <div className='d-flex gap-1 mb-2'>
                            <div>
                                {/* <Activity /> */}
                            </div>
                            <div className='w-75'>
                                <h4>On pages</h4>
                                <p>By default, the widget display on all pages of the site</p>

                                <div className='w-100 d-flex justify-content-between align-items-center'>
                                    <div>
                                        <h4>Include</h4>
                                        <a className='btn btn-primary-main mt-1'>Add rule</a>
                                    </div>

                                    <div>
                                        <h4>Exclude</h4>
                                        <a className='btn btn-primary-main mt-1'>Add rule</a>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <hr />

                        <div className='d-flex gap-1 mb-2'>
                            <div>
                                {/* <Activity /> */}
                            </div>
                            <div >
                                <h4 className='mb-2'>In locations</h4>
                                <div>
                                    <RadioInput name="location" title="Show in all locations" />
                                    <RadioInput name="location" title="Show in selected locations" />
                                    <RadioInput name="location" title="Do not show in selected locations" />
                                </div>
                            </div>
                        </div>

                        <hr />

                        <div className='d-flex gap-1 mb-2'>
                            <div>
                                {/* <Activity /> */}
                            </div>
                            <div className='mt-1 mb-1'>
                                <Link to='/' style={{ textDecoration: "underline" }}>I need another rule</Link>
                            </div>
                        </div>

                        <hr />

                        <div className="mb-2">
                            <CheckBox title="Launcher click based" />
                        </div>

                        <hr />

                        <div className="mb-2">
                            <CheckBox title="On clicking an HTML element" />
                        </div>

                        <hr />

                        <div>
                            <div className="mb-2">
                                <CheckBox title="API based" />
                            </div>
                            <div className='ms-4'>
                                <Link to='/' style={{ textDecoration: "underline" }}>Learn more about how to show widgets via API</Link>
                                <p className='mt-1'>Rules-based widget calling does not work when you use API-based calling</p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Rules