import React from 'react'

export default function CardLeft({ icon, title, desc, imgSrc }) {
    return (
        <div className='mt-2 mt-md-3 p-0 '>

            <style>
                {`
                .img{
                    margin-bottom:13px !important;
                }
                .title{
                    margin-bottom:10px !important;
                }
                @media only screen and (max-width: 600px) {
                    .title{
                        margin-bottom:0px !important;
                    }
                    .img{
                        margin-bottom:5px !important;
                    }
                  }
                `}
            </style>
            <div className='img fs-1 text-dark '>
                {icon}
                {imgSrc ? <img src={imgSrc} width={42} alt='rem' /> : ''}
            </div>
            <div className=''>
                <h1 className=' title fs-1 main-heading fw-bolder ' >{title}</h1>
                <h2 className='fs-3  text-black lh-32 m-0  '>{desc}</h2>
            </div>
        </div>
    )
}
