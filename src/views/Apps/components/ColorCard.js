import React from 'react' 
import { useNavigate } from 'react-router-dom'
import { Card } from 'reactstrap' 

const ColorCard = ({ backgroundColor, title, content, author, blogLink }) => {

  const navigate = useNavigate()
  const cardStyle = {
    position: 'relative',
    height: '100%',
    backgroundColor,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  } 

  const contentContainerStyle = {
    flex: 1
  } 

  const titleStyle = {
    fontSize: '16px',
    fontWeight: '400'
  } 

  const contentStyle = {
    fontSize: '13px',
    fontWeight: '400'
  } 

  const authorStyle = {
    fontSize: '13px',
    fontWeight: '300'
  } 

  return (
    <Card onClick={() => navigate(blogLink)} className='px-1 ' style={{...cardStyle, cursor: "pointer"}}>
      <div className='row text-break match-height' style={contentContainerStyle}>
        <div className="d-flex justify-content-between align-items-center flex-column col-8">
          <h4 className='w-100' style={titleStyle}>{title}</h4>
          <p className='align-self-end m-0 mb-1' style={authorStyle}>~ {author}</p>
        </div>
        <div className='col-4 ' style={contentStyle}>
          {content}
        </div>
      </div>
    </Card>
  ) 
} 

export default ColorCard 
