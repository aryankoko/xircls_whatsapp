import React from 'react'

function StarRating({ rating }) {
  // const handleStarClick = (clickedRating) => {
  //   onRatingChange(clickedRating)
  // }

  const renderStars = () => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fa ${i <= rating ? 'fa-star' : 'fa-star-o'}`}
          // onClick={() => handleStarClick(i)}
        ></i>
      )
    }
    return stars
  }

  return (
    <div className="star-rating">
      {renderStars()}
    </div>
  )
}

export default StarRating