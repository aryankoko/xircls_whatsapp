// ** React Imports
import { Link, useNavigate } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { User, Settings, HelpCircle, Power, Award, Box, Circle, Briefcase } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import { useContext } from 'react'
// import { getReq } from '../../../../assets/auth/jwtService'
import { removeToken } from '../../../../assets/auth/auth'
import { PermissionProvider } from '../../../../Helper/Context'
import Cookies from 'js-cookie'
import { getReq } from '../../../../assets/auth/jwtService'

const UserDropdown = () => {
  const navigate = useNavigate()
  // const [outletData, setOutletData] = useState([])
  const { userPermission } = useContext(PermissionProvider)

  // const removePermision = () => {
  //   setUserPermission({
  //     appName: '',
  //     multipleDomain: [],
  //     apiKey: '',
  //     installedApps: [],
  //     campaign: []
  //   })
  // }

  // console.log(userPermission, "userPermission")
  const LogOut = (e) => {
    e.preventDefault()
    getReq("logoutEntry")
    .then((data) => {
      console.log(data)
      // removePermision()
      removeToken()
      Cookies.remove('superUser')
      navigate("/merchant/login/")
    })
    .catch((err) => {
      console.log(err)
      // removePermision()
      removeToken()
      Cookies.remove('superUser')
      navigate("/merchant/login/")
    })
  }

  // const getData = () => {
  //   getReq('saveOutletDetails')
  //   .then((data) => data.json())
  //   .then((resp) => {
  //     setOutletData(resp.data.data.outlet_detail)
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
  // }

  // useEffect(() => {
  //   getData()
  // }, [])
  
  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold text-capitalize' style={{whiteSpace: 'nowrap'}}>
            {userPermission?.logged_in_user?.user_first_name}
          </span>
          {<span className='user-status' style={{whiteSpace: 'nowrap'}}>{userPermission?.logged_in_user?.user_role}</span>}
        </div>
        <Avatar img={defaultAvatar} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to='/merchant/admin_view/'>
          <User size={14} className='me-75' />
          <span className='align-middle'>Profile</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/merchant/company/profile/'>
          <Award size={14} className='me-75' />
          <span className='align-middle'>Company</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/merchant/outlets/'>
          <Box size={14} className='me-75' />
          <span className='align-middle'>Domains</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/merchant/customers/add-dept/'>
          <Briefcase size={14} className='me-75' />
          <span className='align-middle'>Department</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/merchant/customers/Manage-user/'>
          <Briefcase size={14} className='me-75' />
          <span className='align-middle'>User</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to='/merchant/admin_view/'>
          <Settings size={14} className='me-75' />
          <span className='align-middle'>Settings</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/merchant/faqs/'>
          <HelpCircle size={14} className='me-75' />
          <span className='align-middle'>FAQ</span>
        </DropdownItem>
        <DropdownItem to="/" tag={Link} onClick={(e) => LogOut(e)}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
