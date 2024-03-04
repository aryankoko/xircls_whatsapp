import React from 'react'
import Select from 'react-select' 

const General = () => {
    const options = [
        { value: 'India', label: 'India' },
        { value: 'United States', label: 'United States' },
        { value: 'South Africa', label: 'South Africa' },
        { value: 'United Arab Emirates', label: 'United Arab Emirates' }
      ] 
  return (
    <>
     <div className='row'>
       <div className='col-12'>
        <div className='card'>
            <div className='card-body'>
                <h6 className="text-base font-weight-medium mb-2">Country/Region:</h6>
                    <div className="form-group">
                        <Select
                        options={options}
                        id="select-input1"
                        classNamePrefix="react-select"
                        />
                    </div>
                </div>
            </div>
        </div> 
    </div>   
    </>
  )
}

export default General