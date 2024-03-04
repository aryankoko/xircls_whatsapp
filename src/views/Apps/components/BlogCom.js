import React from 'react'
import { blogs } from '../../../Helper/data'
import ColorCard from './ColorCard'
import { useNavigate } from 'react-router-dom'

const BlogComponent = () => {

  const navigate = useNavigate()
  
  const limitedBlogs = blogs.slice(0, 3)

  console.log({ limitedBlogs })

  return (
    <div>
      <div className='d-flex row'>
        {limitedBlogs.map((blog, index) => (
          <div key={index} className='col-4 my-1'>
            <ColorCard
              title={blog.heading}
              backgroundColor={blog.backgroundColor}
              blogLink={blog.link}
              content={
                <>
                  <div className='d-flex justify-content-center align-items-center'>
                    <img onClick={(e) => {
                      e.stopPropagation()
                      navigate(blog.authorLink)
                    }} className='rounded-circle' width={80} height={80} src={blog.authorImage} alt={blog.author} />
                  </div>
                </>
              }
              author={blog.author}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogComponent 
