import CardLeft from '@src/views/main/components/CardLeft'
import Footer from '@src/views/main/utilities/footer/Footer'
import Navbar from '@src/views/main/utilities/navbar/Navbar'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Container } from 'reactstrap'
import { AiOutlineGlobal } from "react-icons/ai"
import { IoMdTime, IoIosCheckboxOutline } from "react-icons/io"
import { TbPigMoney } from "react-icons/tb"
import { ImProfile } from "react-icons/im"
import { CiShop } from "react-icons/ci"
const Collab = () => {

    const data = [
        {
            title: "XIRCLS is technology inspired by universal fundamentals.",
            desc: [
                "The journey to the self is through the other.",
                "Throughout human history, this principle echoes across ancient texts, philosophical doctrines, and literary realms.",
                "Science too acknowledges all life as an intricate network of cells in perpetual motion, seamlessly operating in harmony within and among themselves.",
                "It is as if we exist in a state of completion and incompletion all at once.",
                "Call it scientific, spiritual or divine, life seems to be an eternal journey that begins with oneself, extending to others, and ultimately returning to the self. A complete XIRCL.",
                "XIRCLS seeks to harness technology in order to give this universal principle form and function."
            ]
        },
        {
            title: "Life thrives on collaboration, not competition.",
            desc: [
                "Reflect on your personal and professional milestones, and you'll recall those who helped make it possible.",
                "In a fear-driven world fixated on competition, we overlook countless potential collaborators eager to join forces.",
                "In a world where life and society flourish through collaboration, why not extend the same principle to business?"
            ]
        },
        {
            title: "What if businesses helped each other reach their marketing goals?",
            desc: [
                "XIRCLS started out by asking this simple question.",
                "Every day, thousands of companies independently invest time, money and resources to engage the same customer base. Businesses bid & compete on advertising platforms, driving up ad prices and diminishing ROIs.",
                "Meanwhile, consumers face a barrage of ineffective marketing messages that rarely make an 'impression' and are perceived to be a nuisance.",
                "In a world where only Big Tech seems to win, facilitating seamless collaboration between businesses could create a fairer marketing landscape, safeguarding consumer interests as well."
            ]
        },
        {
            title: "A global level playing field.",
            desc: [
                "XIRCLS counters corporate monopolies by uniting people and making resources easily shareable – with no central authority or hidden agendas.",
                "XIRCLS envisions connecting individuals across sectors, platforms, touchpoints, borders, cultures, and the world."
            ]
        },
        {
            title: "Help is just a thought away.",
            desc: ["Whether you're a solo entrepreneur or part of a global enterprise, collaboration benefits everyone. Our global platform enables businesses to connect and collaborate virtually within minutes. Never feel alone again."]
        },
        {
            title: "What Collaboration Means to Us.",
            desc: [
                "In a 'Every Man for Himself' world, the question often arises: What's in it for XIRCLS, especially in the long run?",
                "To us, collaboration will always mean one thing - we are all in it together.",
                "Yes, we have big dreams. Yes, we want to make the world a gentler place. And yes, we want to create a safe haven for businesses facing crony capitalism and hateful greed.",
                "But we’re not in it for the glory. We promise to leave that - as well as your customers and profits - to you, our merchants."
            ]
        },
        {
            title: "We aim to establish a viable alternative to online advertising that’s accessible to every merchant in the world.",
            desc: ["Addressing power imbalances, low ROIs, transparency issues, ad fraud, and privacy concerns, XIRCLS pioneers a 100% transparent and decentralized marketing model. It is the world's first platform to comprehensively resolve these issues, empowering businesses with direct control."]
        },
        {
            title: "Changing the world, one company at a time.",
            desc: ["Recognizing the significant shift needed to challenge decades of advertising norms, we've embraced simplicity in our pricing. Our pay-as-you-go model enables any business to start using our platform today and discover a fresh approach to marketing."]
        },
        {
            title: "We address inefficient systems.",
            desc: ["Our collaborative innovations target issues of cost, access, and quality across industries. We don’t see competitors, only future partners. If you sense synergy between XIRCLS and your company, let's talk"]
        }
    ]
    const MarketingData = [
        {
            icon: <AiOutlineGlobal />,
            title: "Instant Global Collaborations",
            desc: "Run marketing campaigns with ease, collaborating with almost anybody, be it a global brand, a niche e-commerce company, an NGO, a professional or a local dairy farmer in rural India."
        },
        {
            icon: <IoMdTime />,
            title: "Real-Time Precision Marketing",
            desc: "Strategic collaborations help you reach genuine buyers actively seeking your product or service, enhancing your marketing precision."
        },
        {
            icon: <TbPigMoney />,
            title: "Cost-Effective Marketing",
            desc: "Utilize the power of collaboration to make marketing precise and affordable, ensuring accessibility for businesses of all sizes, and pass on savings to your customers."
        },
        {
            icon: <IoIosCheckboxOutline />,
            title: "Affordable Products & Services",
            desc: "By reducing marketing costs and increasing ROIs, companies can offer more affordable products, expanding their market reach, especially crucial in sectors like healthcare."
        },
        {
            icon: <CiShop />,
            title: "Ethical Marketing & Accountability",
            desc: "When businesses become marketing channels for each other, ethical practices become everyone’s priority. Through accountability, address issues like spam, ad fraud, and lack of measurability."
        },
        {
            icon: <ImProfile />,
            title: "Advanced Customer Profiling",
            desc: "Access valuable insights into customer shopping behavior through collaborative customer profiling while keeping your customer data 100% secure."
        }

    ]

    return (
        <div style={{ background: "#fff" }}>

                {/* <Navbar /> */}

                <Row className='text-black justify-content-center'>
                    <Col lg='10' xs='10' >
                        <div className='text-black text-center mt240' >
                            <h1 className=" display-1 main-heading  fw-bolder lh-83">Why Collaborative Marketing?</h1>
                            <h1 className="text-black fs-1" >
                                We believe the future of marketing must be collaborative.
                            </h1>
                        </div>

                        <div className=' px-lg-5'>
                            {
                                data.map((data, index) => (
                                    <div className='mt180' key={index}>
                                        <h1 className='display-3 text-center main-heading fw-bolder  lh-83 '>
                                            {data.title}
                                        </h1>
                                        <div className='text-center mt-2 d-flex flex-column gap-1 '>
                                            {
                                                data.desc.map((list, i2) => (
                                                    <h1 className='text-black fs-2' key={i2}>{list}</h1>
                                                ))
                                            }
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    </Col>
                </Row>

                <Container fluid='sm'>

                    <Row className='section8 justify-content-center mt180 '>
                            <h1 className=' text-center display-2 fw-bolder main-heading  ' >Benefits of Collaborative Marketing:</h1>
                        <Col xs="11" lg="12" xl="10"   >

                            <Row className='   justify-content-between  mt-2 '>
                                {
                                    MarketingData.map((data, index) => {
                                        return (
                                            <Col lg="4" md="6" className='' key={index}>
                                                <CardLeft icon={data.icon} title={data.title} desc={data.desc} key={index} />
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <div className=' p-5 px-2  mt180 text-center d-flex justify-content-center  align-items-center ' style={{ background: "#000", minHeight: "250px" }}>
                    <Container fluid='sm'>
                        <h1 className='display-3 text-white fw-lig '>Become part of a collaborative marketing revolution.</h1>
                        <h1 className='fs-1 text-white fw- '>Embrace the global shift from an advertising-centric internet to a transaction-driven internet.</h1>
                    </Container>
                </div>
                <Footer />


        </div>
    )
}

export default Collab
