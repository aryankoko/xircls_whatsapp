import React from 'react'
import { Link } from 'react-router-dom'

const NavbarAdmin = ({state, setState}) => {
  return (
    <div className='d-flex align-items-center justify-content-center gap-3 ' style={{color:"white", marginRight:"30px"}}>
        
        <Link to="/admin/home"><h4 style={{color:"white"}}>Home</h4></Link>
        <Link to="/admin/cps"><h4 style={{color:"white"}}>CPS</h4></Link>
        <Link to="/admin/reports"><h4 style={{color:"white"}}>Reports</h4></Link>        
        <input value={state} onChange={e => setState(e.target.value)} type="text" placeholder="Search..." className='form-control' style={{width: "200px"}} />
    </div>
  )
}

export default NavbarAdmin