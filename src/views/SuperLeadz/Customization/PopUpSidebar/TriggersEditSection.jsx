import React from 'react'

const TriggersEditSection = () => {
    return (
        <div className='p-3'>
            <h6 className='fw-bolder'>Automatic triggers: </h6>
            <div className='ps-2'>
                <label className='fw-medium'>Show Pop up</label>
                <ul style={{ listStyle: 'none' }} className='trigger-list ps-2 mb-3'>
                    <li className='py-2 d-flex gap-2 align-items-center'>
                        <input id='exit-intent-trigger' style={{ width: '17.5px', height: '17.5px', accentColor: '#fbcd0c' }} type="checkbox" /><label htmlFor="exit-intent-trigger">On Exit Intent</label>
                    </li>
                    <li className='py-2 d-flex align-items-center gap-2'>
                        <input id='on-timer-trigger' style={{ width: '17.5px', height: '17.5px', accentColor: '#fbcd0c' }} type="checkbox" /><label htmlFor="on-timer-trigger">On Timer</label><input min={0} max={30} style={{ width: '15%' }} type="number" /><label>seconds</label>
                    </li>
                    <li className='py-2 d-flex align-items-center gap-2'>
                        <input id='on-scroll-trigger' style={{ width: '17.5px', height: '17.5px', accentColor: '#fbcd0c' }} type="checkbox" /><label htmlFor="on-scroll-trigger">On Scroll</label><input min={0} max={100} style={{ width: '15%' }} type="number" /><label>% of page</label>
                    </li>
                </ul>
                <label className='fw-medium'>Show Again</label>
                <ul style={{ listStyle: 'none' }} className='trigger-list ps-2 mb-3'>
                    <li className='py-2 d-flex gap-2 align-items-center'>
                        <input id='once-every-day-trigger' style={{ width: '17.5px', height: '17.5px', accentColor: '#fbcd0c' }} type="checkbox" /><label htmlFor="once-every-day-trigger">Once every</label><input min={0} max={30} style={{ width: '15%' }} type="number" /> <select defaultValue={'Day(s)'}>
                            <option value={'Minute(s)'} >Minute(s)</option>
                            <option value={'Hour(s)'} >Hour(s)</option>
                            <option value={'Day(s)'} >Day(s)</option>
                            <option value={'Week(s)'} >Week(s)</option>
                            <option value={'Month(s)'} >Month(s)</option>
                        </select>
                    </li>
                    <li className='py-2 d-flex align-items-center gap-2'>
                        <input id='once-every-session-trigger' style={{ width: '17.5px', height: '17.5px', accentColor: '#fbcd0c' }} type="checkbox" /><label htmlFor="once-every-session-trigger">Once every</label><input min={0} max={30} style={{ width: '15%' }} type="number" /><label>sessions</label>
                    </li>
                    <li className='py-2 d-flex align-items-center gap-2'>
                        <input id='once-every-page-trigger' style={{ width: '17.5px', height: '17.5px', accentColor: '#fbcd0c' }} type="checkbox" /><label htmlFor="once-every-page-trigger">Once every</label><input min={0} max={30} style={{ width: '15%' }} type="number" /><label>page</label>
                    </li>
                </ul>
                <label className='fw-medium'>Stop Showing</label>
                <ul style={{ listStyle: 'none' }} className='trigger-list ps-2 mb-3'>
                    <li className='py-2 d-flex gap-2 align-items-center'>
                        <input id='after-sub-to-trigger' style={{ width: '17.5px', height: '17.5px', accentColor: '#fbcd0c' }} type="checkbox" /><label htmlFor="after-sub-to-trigger">After subscribe to</label><select defaultValue={'this pop up'}>
                            <option value={'any pop up'} >any pop up</option>
                            <option value={'this pop up'} >this pop up</option>
                            <option value={'specific pop up'} >specific pop up</option>
                        </select>
                    </li>
                    <li className='py-2 d-flex gap-2 align-items-center'>
                        <input id='after-shows-per-trigger' style={{ width: '17.5px', height: '17.5px', accentColor: '#fbcd0c' }} type="checkbox" /><label htmlFor="after-shows-per-trigger">After</label><input min={0} max={30} style={{ width: '15%' }} type="number" />shows per <select defaultValue={'sessions'}>
                            <option value={'sessions'} >sessions</option>
                            <option value={'visitors'} >visitors</option>
                        </select>
                    </li>
                </ul>
            </div>
            <h6 className='fw-bolder'>Teaser Trigger: </h6>
            <div className='ps-2'>
                <div className="d-flex align-items-center gap-2"><input id='before-sub-trigger' style={{ width: '17.5px', height: '17.5px', accentColor: '#fbcd0c' }} type="checkbox" /><label htmlFor='before-sub-trigger' className='fw-medium'>Before subscribe to this pop up</label></div>
                <ul style={{ listStyle: 'none' }} className='trigger-list ps-2 my-2'>
                    <li className='py-2 d-flex gap-2 align-items-center'>
                        <input id='before-automatic-trigger' style={{ width: '17.5px', height: '17.5px', accentColor: '#fbcd0c' }} type="checkbox" /><label htmlFor="before-automatic-trigger">Before Automatic Trigger</label>
                    </li>
                    <li className='py-2 d-flex align-items-center gap-2'>
                        <input id='after-automatic-trigger' style={{ width: '17.5px', height: '17.5px', accentColor: '#fbcd0c' }} type="checkbox" /><label htmlFor="after-automatic-trigger">After Automatic Trigger</label>
                    </li>
                </ul>
                <div className="d-flex align-items-center gap-2"><input id='after-sub-trigger' style={{ width: '17.5px', height: '17.5px', accentColor: '#fbcd0c' }} type="checkbox" /><label htmlFor='after-sub-trigger' className='fw-medium'>After subscribe to this pop up</label></div>
            </div>
        </div>
    )
}

export default TriggersEditSection