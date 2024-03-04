import React from 'react'
import Select from 'react-select'

const SelectElement = ({ options, setSelectedOptions, isMulti, placeholder }) => {

  const handleChange = (options) => {
    if (isMulti) {
      const option_list = options.map((cur) => {
        return cur.value
      })
      // console.log(option_list, "ppp")
      setSelectedOptions(option_list)
    } else {
      setSelectedOptions(options.value)
    }
    
  }


  return (
    <>
        <Select
          isMulti = {isMulti}
          options={options}
          inputId="aria-example-input"
          closeMenuOnSelect={true}
          name="aria-live-color"
          placeholder={placeholder}
          onChange={handleChange}/>

    
    </>
  )
}

export default SelectElement