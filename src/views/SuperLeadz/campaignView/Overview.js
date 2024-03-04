import React, { useEffect } from 'react'
import Wrapper from './Wrapper'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { SuperLeadzBaseURL } from '../../../assets/auth/jwtService'
import { getCurrentOutlet } from '../../Validator'

const Overview = () => {
    const { id } = useParams()

    const outletData = getCurrentOutlet()

    useEffect(() => {
        const url = new URL(`${SuperLeadzBaseURL}/api/v1/pop_up_analytics/?shop=${outletData[0]?.web_url}&app=superleadz&theme_id=${id}`)

        axios({
            method: "GET",
            url
        })
        .then((response) => {
            const theme = response.data.theme_json
            const custom_theme = JSON.parse(theme[0].custom_theme)
            setTitle(custom_theme.pages)

        })
        .catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <>
            <Wrapper>

            </Wrapper>

        </>
    )
}

export default Overview