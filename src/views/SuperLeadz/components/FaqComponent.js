import React, { useEffect, useState } from 'react'
import {
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Col,
    Container,
    Row,
    UncontrolledAccordion
} from 'reactstrap'
export default function FaqComponent({ data, theme, title, SubTitle}) {
        const [Data, setData] = useState('')
    useEffect(() => {
        data ? setData(data) : setData(null)
    }, [])
    

    if (!Data) {
        return null
    }


    return (
        <div className={`${theme}`} >
            <style>
                {`
           
            .collapsing {
                position: relative;
                height: 0;
                overflow: hidden;
                -webkit-transition-property: height, visibility;
                transition-property: height, visibility;
                -webkit-transition-duration: 0.6s;
                transition-duration: 0.6s;
                -webkit-transition-timing-function: ease;
                transition-timing-function: ease;
              }
            
            `}
            </style>

            <Row className={`mt170  py-2 ${theme}`} >
                <div className='col-md-10 offset-md-1'>

                    <h1 className={`fs-2 fw-bolder my-2 text-start main-heading  ps-1`} >{title ? title : ""}</h1>
                    <h1 className={`fs-3 my-2 text-start  ps-1`} >{SubTitle ? SubTitle : "blank"}</h1>


                    <UncontrolledAccordion

                        stayOpen
                        defaultOpen={['1']}
                    >
                        {
                            Data.map((data, index) => (
                                <AccordionItem>
                                    <AccordionHeader className="" targetId={index}>
                                        <h5 className=''>{data.q}</h5>
                                    </AccordionHeader>
                                    <AccordionBody accordionId={index}>
                                        <p className=''>
                                            {data.a}
                                        </p>
                                    </AccordionBody>
                                </AccordionItem>
                            )
                            )
                        }
                    </UncontrolledAccordion>
                </div>


            </Row>

        </div>
    )
}