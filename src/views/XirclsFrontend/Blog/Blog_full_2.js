import React from 'react'
import Header from '../base/Header'
import Footer from '../base/Footer'
import { Container, Row, Col } from 'reactstrap'
import { Mail} from 'react-feather'
import { Link } from 'react-router-dom'
import { SiFacebook, SiWhatsapp, SiLinkedin, SiTwitter } from 'react-icons/si'
import BlogHead from './BlogHead'
import BlogFoot from './BlogFoot'

const Blog_full_2 = () => {
    return (
        <div className="products">            
            <Container className='px-md-4 pb-1 pt-5'>
                <BlogHead component='monopolies' />
                <Container fluid className='py-6'>
                        <div style={{ display: `flex`, justifyContent: `center`, alignItems: `center` }}>
                            <img src='https://api.xircls.com/static/images/website-slide/blog/b21.jpg' className='w-100' />
                        </div>
                    </Container>
    
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Ever notice how any main street, in any town, is lined with the same restaurants, the same clothing stores, the same bookstores…</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>It’s like anywhere you go, you’re always in the same place</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>It wasn’t always that way. If I think back on my childhood vacations, I remember each place I traveled to was a new adventure. Every town had its different stores and local restaurants that drew you in with their own unique charm.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>What happened? Why has everything in America seemingly become so cookie-cutter?</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Evidently, this is what happens when a few companies own everything. This is what happens when the economy is controlled by big corporate monopolies.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Big companies with deep pockets, scoop up smaller companies like small change.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>The big companies get bigger and bigger, while the smaller companies are swallowed up and just disappear.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>This kind of negative uniformity that corporate monopolies engender in the name of scalability and (ironically) optimal customer experience, only translates to less choice in the variety of products and services available to consumers.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Do we all really want to go to the same steakhouse? Do we all really want to eat the same French fries and wear the same sneakers, or do we do so because there simply is no other option?</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Do we even really want what’s available or are we simply being brainwashed by corporate greed? It’s hard to know the answer when the choices are:</p>
                            <ul className='font-two fw-normal text-black lh-lg-md sixth-font-blog text-justify ps-1 mb-3'>
                                <li>Lonestar Steakhouse or Outback? </li>
                                <li>McDonald’s or Burger King? </li>
                                <li>KFC or Popeyes?</li>
                                <li>Nike or Adidas? </li>
                            </ul>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>It feels like five fingers on one hand or half of ten on the other.</p>
                        </Col>
                    </Row>
                    <Row className='mb-3 py-5'>
                        <Col md={12} className='py-1'>
                            <img src='https://api.xircls.com/static/images/website-slide/blog/b22.jpg' className='w-100' />
                        </Col>
                    </Row>
                    <Row className='my-3'>
                        <Col md={12}>
                            <h3 className='fourth-font font-two text-black fw-bolder mb-2'>The Game They Play </h3>
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-semibold text-black lh-lg-md sixth-font-blog text-justify'>Name Your Price: </p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>The laws of supply and demand dictate price. Simply put, the more demand there is for a product, the more customers will pay for it. Therefore, once corporations have created significant demand for a product, they can fix a higher price for it and charge whatever they like, knowing that customers have no cheaper alternatives. </p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>In fact, companies will often increase demand simply by manufacturing less of their own product. This artificial shortage allows corporations to raise the price further while customers are left wondering.</p>
                            <p className='font-two text-black lh-lg-md sixth-font-blog text-justify'><span className="fw-semibold">Inflation:</span><span className="fw-light"> When prices are ‘fixed’ in this manner, it also leads to inflation. With only a limited number of companies offering a certain service or product, once one company sets a high price tag, the other few companies in the same product/service category will do the exact same thing. These monopolies block competition. Any smaller company attempting to offer the same product or service for less money will be squeezed out, either by the big corporate companies buying the smaller companies, or by the bigger company temporarily reducing their prices, and undercutting the competition to the point where the smaller company can no longer afford to offer the product/service. Once the smaller company is edged out into oblivion, the big company will return to charging more money. </span></p>
                            <p className='font-two text-black lh-lg-md sixth-font-blog text-justify'><span className="fw-semibold">Inflation:</span><span className="fw-light"> When prices are ‘fixed’ in this manner, it also leads to inflation. With only a limited number of companies offering a certain service or product, once one company sets a high price tag, the other few companies in the same product/service category will do the exact same thing. These monopolies block competition. Any smaller company attempting to offer the same product or service for less money will be squeezed out, either by the big corporate companies buying the smaller companies, or by the bigger company temporarily reducing their prices, and undercutting the competition to the point where the smaller company can no longer afford to offer the product/service. Once the smaller company is edged out into oblivion, the big company will return to charging more money. </span></p>
                            <p className='font-two text-black lh-lg-md sixth-font-blog text-justify'><span className="fw-semibold">Price Discrimination:</span><span className="fw-light"> In addition to price-fixing and creating artificial shortages, such companies will also engage in Price Discrimination. This is where a company will offer extremely similar products or services to customers and charge them different prices based on the customer being a member of a particular group / in a particular situation or location.</span></p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>For Example:</p>
                            <ul className='font-two fw-normal text-black lh-lg-md sixth-font-blog text-justify ps-1'>
                                <li>“The Pink Tax” - Products are often more expensive for women than they are for men. A Pink disposable razor will often cost more than a blue one, and a box of hair dye with a woman’s picture on it will cost more than the hair dye in a box that has a man’s picture on it. </li>
                                <li>Food is more expensive at the movie theater because of a captive audience of customers who are not allowed to bring their own snacks with them. </li>
                            </ul>
                        </Col>
                    </Row>
                    <Row className='mb-3 py-5'>
                        <Col md={12} className='py-1'>
                            <img src='https://api.xircls.com/static/images/website-slide/blog/b23.jpg' className='w-100' />
                        </Col>
                    </Row>
                    <Row className='my-3'>
                        <Col md={12}>
                            <h3 className='fourth-font font-two text-black fw-bolder mb-2'>Money Matters Most!</h3>
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Big corporations care about one thing only: Making Money.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Corporate monopolies are formed by engaging in unethical practices designed only to benefit themselves in their continual pursuit of money. Money Matters Most. </p>
                            <ol className='font-two fw-normal text-black lh-lg-md sixth-font-blog text-justify ps-1'>
                                <li>They don’t care if customers are happy. Corporations have less need for happy, loyal customers if customers have nowhere else to go. </li>
                                <li>They don’t care about quality. With a captive (literally) customer base, big corporations have little incentive to invest in product development and create products and services designed to last a lifetime. </li>
                                <li>They don’t care when creativity and innovation are squashed, even within their own organizations. It’s close to impossible to come up with new ideas, solutions, or inspiration if all you ever do is chase the dollar. </li>
                            </ol>
                            <p className='font-two text-black lh-lg-md sixth-font-blog text-justify'><span className="fw-semibold">Commercial Monopolies Crush Society:</span><span className="fw-light"> The existence of such wide-scale monopolies in a society also leads and contributes to lower wages: if one company is the only business with employees who perform a particular task, then that company can pay their employees minimum wage, with little incentive to offer pay raises, as there are no other companies for the employee to work for. </span></p>
                            <p className='font-two text-black lh-lg-md sixth-font-blog text-justify'><span className="fw-semibold">The Company Town:</span><span className="fw-light"> We currently run the risk of Big Corporations turning the world into a virtual “Company Town”. In a company town, everything is owned by the corporation. All employees work for the corporation and in turn, the corporation: </span></p>
                            <ul className='font-two fw-normal text-black lh-lg-md sixth-font-blog text-justify ps-1'>
                                <li>Might own the employee’s house. </li>
                                <li>Pays the employee’s salary in a form of money that can only be spent on products and services provided by the corporation.</li>
                            </ul>
                            <p className='font-two text-black lh-lg-md sixth-font-blog text-justify'><span className="fw-semibold">The Price of Politics:</span><span className="fw-light"> In the current political climate, monopolies have considerable political power. Financially strong companies have the ability to contribute large sums of money to political campaigns with the expectation and understanding that any politician the company supports will then in turn vote for laws and policies which will support the contributing business to make more money.  </span></p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>For example: If a company has given a politician a large sum of money, they may later expect that politician to support a law that would guarantee the company lower tax rates. </p>
                        </Col>
                    </Row>
                    <Row className='mb-3 py-5'>
                        <Col md={12} className='py-1'>
                            <img src='https://api.xircls.com/static/images/website-slide/blog/b24.jpg' className='w-100' />
                        </Col>
                    </Row>
                    <Row className='my-3'>
                        <Col md={12}>
                            <h3 className='fourth-font font-two text-black fw-bolder mb-2'>But Just Imagine </h3>
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>What if, instead of dragging each other down and squeezing one another out of business, companies, big and small, formed mutually beneficial alliances?</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Imagine a world where businesses could partner together ethically to raise each other up instead of dragging everybody down. Imagine the possibilities.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Close your eyes and picture a world where companies can reach out, across the world, and right next door, to help each other. This is a world where time and energy are saved. There is no corporate waste. The power of the monopoly crumbles when the playing field is leveled.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>In this world, Big Businesses are able to attract a wide-scale audience of customers, and at the same time, smaller businesses are also able to: gain clout, reward their customers, and make it more likely that their customers will become repeat buyers. </p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>In this world, when we take a trip, drive our cars down any main street, we may find a vast array of different choices. Chain restaurants can sit on street corners across from independent Mom and Pop diners. A store selling hand-made toys can thrive. Independent bookstores can return to local shopping centers without fear of being put out of business. </p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>And if we can imagine it, surely there’s a way to make it happen.</p>
                        </Col>
                    </Row>
                    <Row className='my-3'>
                        <Col md={11}>
                            <Row>
                                <Col sm={2} className="font-two sixth-font-blog">Share this Post:</Col>
                                <Col sm={10} className='d-flex gap-1 align-items-center mb-2'>
                                    <Link to='/'>
                                        <div className='display-icon overflow-hidden twitter rounded'>
                                            <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                                <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                                    <SiTwitter size={20} />
                                                </span>
                                                <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                                    <SiTwitter size={20} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to='/'>
                                        <div className='display-icon overflow-hidden linkedin rounded'>
                                            <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                                <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                                    <SiLinkedin size={20} />
                                                </span>
                                                <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                                    <SiLinkedin size={20} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to='/'>
                                        <div className='display-icon overflow-hidden mail rounded'>
                                            <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                                <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                                    <Mail size={20} />
                                                </span>
                                                <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                                    <Mail size={20} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to='/'>
                                        <div className='display-icon overflow-hidden whatsapp rounded'>
                                            <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                                <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                                    <SiWhatsapp size={20} />
                                                </span>
                                                <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                                    <SiWhatsapp size={20} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={1}>
                            <Link to='/' className="text-blue hover-black cursor-pointer">Disclaimer</Link>
                        </Col>
                    </Row>
                    <Row className='my-5 py-5'>
                        <Col md={4} className='blog-img d-flex align-items-center justify-content-center mb-2'>
                            <Row>
                                <Col md={12}>
                                    <div className="text-center">
                                        <img width={110} height={110} className='rounded-circle mb-1' src={'https://api.xircls.com/static/images/website-slide/blog/a2.jpeg'} />
                                        <h5 className='fw-bolder text-dark fs-4 font-two'>Lauren Deah</h5>
                                        <p className='font-two fs-4 text-dark'>Copywriter, Content writer and Blogger, XIRCLS</p>
                                    </div>
                                </Col>
                                <Col md={12} className='d-flex align-items-center justify-content-center'>
                                    <Link to='/'>
                                        <div className='display-icon overflow-hidden facebook rounded-start'>
                                            <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                                <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                                    <SiFacebook size={20} />
                                                </span>
                                                <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                                    <SiFacebook size={20} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to='/'>
                                        <div className='display-icon overflow-hidden linkedin'>
                                            <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                                <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                                    <SiLinkedin size={20} />
                                                </span>
                                                <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                                    <SiLinkedin size={20} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to='/'>
                                        <div className='display-icon overflow-hidden mail rounded-end'>
                                            <div className="icon-container d-flex flex-column justify-content-between align-items-center">
                                                <span className='icon-social text-dark d-flex justify-content-center align-items-center'>
                                                    <Mail size={20} />
                                                </span>
                                                <span className='icon-social text-light d-flex justify-content-center align-items-center'>
                                                    <Mail size={20} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={7} className='ps-md-5 d-flex flex-column justify-content-center'>
                            <h5 className='font-two fw-light text-dark mb-3 sixth-font-blog lh-base'>Lauren has a B.A. in Creative Writing and English from The University of Southern New Hampshire, and she is a member of the Sigma Tau Delta English Honors Society.<br />Lauren grew up on the East Coast of the United States and traveled around the world after high school. She has come full circle and is once again living in Maryland. </h5>
                            <div>
                                <Link to='/blog/author/Lauren_Deah/' className="blog-learnmore-btn text-uppercase">Learn More</Link>
                            </div>
                        </Col>
                    </Row>
                <Row className='my-3'>
                    <BlogFoot component='monopolies' />
                </Row>
            </Container>
            <Footer />
        </div >
    )
}

export default Blog_full_2