/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

export default function Skin_type_form() {

    const [ShowEmail, setShowEmail] = useState(false)

    const formData = [
        {
            title: "Texture of your skin",
            opts: [
                "Does not Shine",
                "Is dry and sometimes slight flaking may appear",
                "Shines on the nose",
                "Shines all-over"
            ]
        },
        {
            title: "Appearance of pores on your skin",
            opts: [
                "Normal",
                "Very fine",
                "Visible",
                "Very opened"
            ]
        },
        {
            title: "How does your skin look like?",
            opts: [
                "Cool, fresh, and supple",
                "Thin and lacking moisture",
                "Shines on the \"T\" zone",
                "Shines and has a tendency for acne"
            ]
        },
        {
            title: "How does your skin feel when touched?",
            opts: [
                "Supple",
                "Dry or very dry",
                "Oily on the forehead and nose",
                "Oily all over"
            ]
        },
        {
            title: "How often do you feel tightness around the eyes and mouth area",
            opts: [
                "Very often",
                "Regularly",
                "Sometimes",
                "Never"
            ]
        },
        {
            title: "How often do you have pimples?",
            opts: [
                "Very seldom",
                "Never",
                "Sometimes",
                "Very often"
            ]
        },
        {
            title: "What happens when your skin is exposed to sun?",
            opts: [
                "Reddens",
                "Burns",
                "Tans",
                "Tans very well"
            ]
        }

    ]

    return (
        <div className=' m-auto' style={{ maxWidth: "1440px", paddingBottom: "200px" }}>
            <style>
                {`
                .cyberpunk-checkbox {
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    min-width: 16px;
                    min-height: 16px;
                    max-width: 16px;
                    max-height: 16px;
                    border: 1px solid #6b6b6b;
                    border-radius: 5px;
                    background-color: transparent;
                    display: inline-block;
                    position: relative;
                    margin-right: 10px;
                    cursor: pointer;
                }
                
                .cyberpunk-checkbox:before {
                    content: "";
                    background-color: #6b6b6b;
                    display: block;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) scale(0);
                    border-radius: 3px;
                    width: 8px;
                    height: 8px;
                    min-width: 8px;
                    min-height: 8px;
                    max-width: 8px;
                    max-height: 8px;
                    transition: all 0.3s ease-in-out;
                }
                
                .cyberpunk-checkbox:checked:before {
                    transform: translate(-50%, -50%) scale(1);
                }
                
                .cyberpunk-checkbox-label {
                    cursor: pointer;
                    user-select: none;
                    display: flex;
                    align-items: center;
                    justify-content:start;
                    gap:10px;
      }
      @media only screen and (max-width: 600px) {
        .cyberpunk-checkbox-label {
         font-size:calc(1.0836rem + 0.0032vw);
         gap:7px

        }
      }

    `}
            </style>
            <div className='border rounded-3  m-auto  py-2 mt-2 px-2' style={{ maxWidth: "1000px" }}>
                <h2 className='f text-center m-0  p-0'>Skin Type Test</h2>
                <hr className='mt-2' />

                {
                    !ShowEmail &&
                    <form action="" className=' mt-3 d-flex flex-column m-auto gap-3' style={{ maxWidth: "800px" }}>
                        {
                            formData.map((data, index) => {
                                return (
                                    <div className=' '>
                                        <div className='ms-1 ms-md-2 '>

                                            <div className='d-flex'>
                                                <span className='h2 me-1'>{index + 1}.</span>
                                                <div className='h2'>{data.title}</div>
                                            </div>
                                            <div className='d-flex  ms-4  flex-column' style={{ marginTop: "4px" }}>
                                                {
                                                    data.opts.map((opt, index2) => (

                                                        <label class="cyberpunk-checkbox-label h4 " style={{marginTop:"2px"}}>
                                                            <input type="radio" name={`${index + 1}Q`} class="cyberpunk-checkbox " value={`${index + 1}Q- ${index2 + 1}opt`} />
                                                            {opt}</label>
                                                    ))}

                                            </div>
                                        </div>
                                        {/* <hr className='mt-1 pb-1' /> */}
                                    </div>
                                )
                            })
                        }
                        <div className='text-center mb-2 mt-2'>
                            <button onClick={() => setShowEmail(true)} className='btn  btn-primary fs-5 text-secondary '>Find Skin Type</button>
                        </div>

                    </form>
                }
                {
                    ShowEmail &&
                    <form className='mt-3 ms-2'>
                        <div className=' m-auto' style={{ maxWidth: "425px" }}>

                            <div className='h1'>Where should we send your results?</div>
                            <div className='mt-2'>
                                <label className='h3'>E-mail</label>
                                <input className='form-control' placeholder="yourmail@gmail.com" style={{ maxWidth: "425px" }} />
                            </div>

                            <div className='text-center mb-2 mt-2'>
                                <button onClick={() => setShowEmail(false)} className='btn  btn-primary fs-5 text-secondary px-3'>Submit</button>
                            </div>
                        </div>

                    </form>

                }

            </div>

        </div>
    )
}
