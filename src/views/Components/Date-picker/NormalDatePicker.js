// ** React Imports
import { Fragment } from 'react'
import '@styles/react/libs/flatpickr/flatpickr.scss'
// ** Third Party Components
import Flatpickr from 'react-flatpickr'

import moment from 'moment/moment'

const PickerDefault = ({ setPicker, picker, minDate, maxDate, mode, dateFormat, enableTime, type, mainStyle, setMainStyle }) => {
  // ** State

  // console.log({minDate})

  // useEffect(() => {
    // if (minDate) {
      // console.log("moment", moment(minDate[0]).format("YYYY-MM-DD HH:mm:ss"), minDate)
    // }
  // }, [])

  return (
    <Fragment>
      <Flatpickr options={{ minDate: minDate ? Array.isArray(minDate) ? minDate[0] : minDate : "", maxDate: maxDate ? Array.isArray(maxDate) ? maxDate[0] : maxDate : "", mode: mode ? mode : "single", dateFormat: dateFormat ? dateFormat : "Y-m-d", enableTime }} className='form-control' value={Array.isArray(picker) ? picker[0] : picker} onChange={date => {
        if (type === "start") {
          setMainStyle({...mainStyle, campaignStartDate: moment(date[0]).format("YYYY-MM-DD HH:mm:ss")})
        } else if (type === "end") {
          setMainStyle({...mainStyle, campaignEndDate: moment(date[0]).format("YYYY-MM-DD HH:mm:ss")})
        } else {
          setPicker(date)
        }
      }} />
    </Fragment>
  )
}

export default PickerDefault
