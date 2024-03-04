import React, { useEffect, useState } from 'react'
import ReportsNav from './ReportsNav'
import { baseURL } from '../../assets/auth/jwtService'
import axios from 'axios'
import { ownUrl } from '../Validator'

const Outlet = () => {

    const [data, setData] = useState([])

    const getData = () => {
    axios.post(`${baseURL}/merchant/all_outlet_detail/`)
    .then((resp) => {
        console.log(resp.data.data.outlet_detail)
        setData(resp.data.data.outlet_detail)
    })
    .catch((error) => {
        console.log(error)
    })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <ReportsNav />
            <div className="row mt-2">
                <div className="col-12">
                    <table className="table table-hover overflow-x-auto">
                        <thead>
                            <tr>
                                <th scope="col" style={{width: '90px'}}>Sr No.</th>
                                <th scope="col" style={{width: '90px'}}>Outlet ID</th>
                                <th scope="col" style={{width: '90px'}}>Outlet name</th>
                                <th scope="col" style={{width: '90px'}}>Web URL</th>
                                <th scope="col" style={{width: '90px'}}>Api key</th>
                                <th scope="col">Outlet Logo</th>
                                <th scope="col">Outlet Cover</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.map((cur, key) => {
                                    return (
                                        <tr>
                                            <td>{key + 1}</td>
                                            <td>{cur.id}</td>
                                            <td>{cur.outlet_name}</td>
                                            <td>{cur.web_url}</td>
                                            <td>{cur.api_key}</td>
                                            <td><img src={`${ownUrl}/${cur.outlet_logo}`} alt="outlet_logo" width="50px" /></td>
                                            <td><img src={`${ownUrl}/${cur.outlet_cover_pic}`} alt="outlet_cover" width="50px" /></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Outlet