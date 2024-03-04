import { Briefcase, CheckSquare } from 'react-feather'
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import Avatar from '@components/avatar'

function AdminProfileCard() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-1">

        {/* 1 */}

        <div className="pt-4 d-flex flex-column justify-content-center align-items-center">
            <img src={defaultAvatar} alt="img" style={{ width: '100px', height: '100px', marginBottom: '1rem', borderRadius: '6px'}}/>
            <h6 style={{fontSize: '1.375rem', overflow: 'hidden', fontWeight: '500', marginBottom: '1rem'}}>Selina Kyle</h6>
            <p style={{borderRadius: '0.25rem', fontSize:'.8125rem', fontWeight: '500', marginBottom: '1rem', color: 'gray', backgroundColor: '#F1F1F2', padding: '0 10px'}}>
            <span style={{ opacity: '0.16', position: 'absolute'}}></span>
              Admin
            </p>
        </div>
        
    </div>
  )
}

export default AdminProfileCard