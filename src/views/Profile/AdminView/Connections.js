import React from 'react'
import { Link2, Trash2 } from 'react-feather'

const Connections = () => {
  return (
    <div className='row m-1'>
      <div className='card'>
        <div className='card-body'>
            <p style={{fontSize: '1.125rem', fontWeight: '400'}}>Connected Accounts</p>
                <p style={{fontSize: '1rem', fontWeight: '300'}}>Display content from your connected accounts on your site</p>
                  <div class="list-group my-1">
                      <div class="d-flex justify-content-between align-items-center mt-1">
                          <img class="avatar" src="data:image/png base64,..."/>
                          <div class="ms-2 me-auto">
                          <h6 class="mb-0">Google</h6>
                          <p class="mb-0">Calendar and contacts</p>
                          </div>
                          <div class="form-check form-switch" style={{transform: 'scale(0.8)'}}>
                              <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"  />
                          </div>
                      </div>
                      <div class="d-flex justify-content-between align-items-center mt-1">
                          <img class="avatar" src="data:image/png base64,..."/>
                          <div class="ms-2 me-auto">
                          <h6 class="mb-0">Slack</h6>
                          <p class="mb-0">Communication</p>
                          </div>
                          <div class="form-check form-switch" style={{transform: 'scale(0.8)'}}>
                              <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"  />
                          </div>
                      </div>
                      <div class="d-flex justify-content-between align-items-center mt-1">
                          <img class="avatar" src="data:image/png base64,..."/>
                          <div class="ms-2 me-auto">
                          <h6 class="mb-0">Github</h6>
                          <p class="mb-0">Manage your Git repositories</p>
                          </div>
                          <div class="form-check form-switch" style={{transform: 'scale(0.8)'}}>
                              <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked />
                          </div>
                      </div>
                      <div class="d-flex justify-content-between align-items-center mt-1">
                          <img class="avatar" src="data:image/png base64,..."/>
                          <div class="ms-2 me-auto">
                          <h6 class="mb-0">Mailchimp</h6>
                          <p class="mb-0">Email marketing service</p>
                          </div>
                          <div class="form-check form-switch" style={{transform: 'scale(0.8)'}}>
                              <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"  />
                          </div>
                      </div>
                      <div class="d-flex justify-content-between align-items-center mt-1">
                          <img class="avatar" src="data:image/png base64,..."/>
                          <div class="ms-2 me-auto">
                          <h6 class="mb-0">Asana</h6>
                          <p class="mb-0">Communication</p>
                          </div>
                          <div class="form-check form-switch" style={{transform: 'scale(0.8)'}}>
                              <input class="form-check-input"  type="checkbox" id="flexSwitchCheckChecked" checked />
                          </div>
                      </div>
                  </div>
        </div>
      </div>
      <div className='card'>
        <div className='card-body'>
            <p style={{fontSize: '1.125rem', fontWeight: '400'}}>Social Accounts</p>
                <p style={{fontSize: '1rem', fontWeight: '300'}}>Display content from your social accounts on your site</p>
                  <div class="list-group my-1">
                      <div class="d-flex justify-content-between align-items-center mt-1">
                          <img class="avatar" src="data:image/png base64,..."/>
                          <div class="ms-2 me-auto">
                          <h6 class="mb-0">Facebook</h6>
                          <p class="mb-0">Not Connected</p>
                          </div>
                          <div class=" alert-secondary p-1 rounded" style={{transform: 'scale(0.8)'}}>
                            <Link2 />
                          </div>
                      </div>
                      <div class="d-flex justify-content-between align-items-center mt-1">
                          <img class="avatar" src="data:image/png base64,..."/>
                          <div class="ms-2 me-auto">
                          <h6 class="mb-0">Twitter</h6>
                          <p class="mb-0">Not Connected</p>
                          </div>
                          <div class=" alert-danger p-1 rounded" style={{transform: 'scale(0.8)'}}>
                            <Trash2 />
                          </div>
                      </div>
                      <div class="d-flex justify-content-between align-items-center mt-1">
                          <img class="avatar" src="data:image/png base64,..."/>
                          <div class="ms-2 me-auto">
                          <h6 class="mb-0">Linkedin</h6>
                          <p class="mb-0">Not Connected</p>
                          </div>
                          <div class=" alert-danger p-1 rounded" style={{transform: 'scale(0.8)'}}>
                            <Trash2 />
                          </div>
                      </div>
                      <div class="d-flex justify-content-between align-items-center mt-1">
                          <img class="avatar" src="data:image/png base64,..."/>
                          <div class="ms-2 me-auto">
                          <h6 class="mb-0">Dribble</h6>
                          <p class="mb-0">Not Connected</p>
                          </div>
                          <div class=" alert-secondary p-1 rounded" style={{transform: 'scale(0.8)'}}>
                            <Link2 />
                          </div>
                      </div>
                      <div class="d-flex justify-content-between align-items-center mt-1">
                          <img class="avatar" src="data:image/png base64,..."/>
                          <div class="ms-2 me-auto">
                          <h6 class="mb-0">Behance</h6>
                          <p class="mb-0">Not Connected</p>
                          </div>
                          <div class=" alert-secondary p-1 rounded" style={{transform: 'scale(0.8)'}}>
                            <Link2 />
                          </div>
                      </div>

                  </div>
        </div>
      </div>
    </div>
  )
}

export default Connections