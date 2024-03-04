import React from "react"

const DroppableElements = (props) => {

  switch (props.type) {
    //basic elements
    case 'text':
      return <span contentEditable="true" className="text-secondary" style={{ fontSize: '0.9rem', outline: '0' }} >Text Element</span>
    case 'image':
      return <img className="img-fluid" src="https://via.placeholder.com/100" alt="placeholder" />
    case 'button':
      return <button contentEditable="true" className="btn btn-primary px-1" style={{ fontSize: '0.9rem', outline: '0' }}>Button Element</button>
    //form elements  
    // case 'input':
    //   return <input className="px-1 form-control" type="text" placeholder="Input Element" style={{ fontSize: '0.9rem', outline: '0' }} />
    // case 'radio':
    //   return <input className="px-1 form-control" type="text" placeholder="Radio Element" style={{ fontSize: '0.9rem', outline: '0' }} />
    // case 'checkbox':
    //   return <input className="px-1 form-control" type="text" placeholder="CheckBox Element" style={{ fontSize: '0.9rem', outline: '0' }} />
    // case 'dropdown':
    //   return <input className="px-1 form-control" type="text" placeholder="Dropdown Element" style={{ fontSize: '0.9rem', outline: '0' }} />
    // case 'feedback':
    //   return <input className="px-1 form-control" type="text" placeholder="Dropdown Element" style={{ fontSize: '0.9rem', outline: '0' }} />
    // case 'textarea':
    //   return <input className="px-1 form-control" type="text" placeholder="Dropdown Element" style={{ fontSize: '0.9rem', outline: '0' }} />
  }
}

export default DroppableElements
