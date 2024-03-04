import React from 'react'
import Moment from 'react-moment'

const MomentTime = ({ time, format }) => {
    return (
        <Moment format={format}>
            {time}
        </Moment>
    )
}

export default MomentTime