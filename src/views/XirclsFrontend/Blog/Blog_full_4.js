import React from 'react'
import Header from '../base/Header'
import Footer from '../base/Footer'
import { Container, Row, Col } from 'reactstrap'
import { Mail} from 'react-feather'
import { Link } from 'react-router-dom'
import { SiFacebook, SiWhatsapp, SiLinkedin, SiTwitter } from 'react-icons/si'
import BlogHead from './BlogHead'
import BlogFoot from './BlogFoot'

const Blog_full_4 = () => {
    return (
        <div className="products">
            <Header />
            <Container className='px-md-4 pb-1 pt-5'>
                <BlogHead component='influencer' />
                <Container fluid className='py-6'>
                        <div style={{ display: `flex`, justifyContent: `center`, alignItems: `center` }}>
                            <img src='https://api.xircls.com/static/images/website-slide/blog/b4.jpg' className='w-100' />
                          </div>
                    </Container>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Every day, billions of people visit various social media platforms such as Instagram, TikTok, Twitter, YouTube and Facebook. According to a <Link className='text-blue' to='/'>survey</Link> conducted in February of 2021, 46% of survey participants spent an average of five to six hours on their phones daily, with an additional 22% spending an average of three to four hours on their phones every day.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>People are spending more time engaged with brands, content and other users than ever before. And to combat this market oversaturation, companies are tapping into <span className="fw-bold">social media influencers</span> as a marketing strategy in their bid to draw the attention of their target consumers.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>True to their name, social media influencers do really have the power to ‘influence’ behavior. As consumers, we naturally seek to emulate the lifestyle that these beautiful people display on their feed and are tempted to buy the products they promote. Marketing departments in companies know this, which is why influencer marketing has become a buzzword in recent years.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>However, as more brands are beginning to realize, there are significant and hidden costs to doing business with influencers.</p>
                        </Col>
                    </Row>
                    <Row className='mb-3 py-5'>
                        <Col md={12} className='py-1'>
                            <img src='https://api.xircls.com/static/images/website-slide/blog/b4_img_1.jpg' className='w-100' />
                        </Col>
                    </Row>
                    <Row className='my-3'>
                        <Col md={12}>
                            <h3 className='fourth-font font-two text-black fw-bolder mb-2'>The Cost of Reliability</h3>
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Companies, especially small companies with limited marketing budgets, have come to understand that not all influencers are created equal. A lot of brands orchestrate deals with mid-tier, micro, and nano-influencers without set contracts. The going rate for posts from a nano-influencer averages out to $10-$100, so companies rarely think of writing a contract for such a small expenditure. However, this means that there are no contractual obligations for these influencers to create the promotional content the way it is expected, keep the post up on their feed or even respond to the company after they pocket the money. There is zero accountability.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>On the other side of that coin, nano-influencers often have the highest engagement rate, with an average 5% engagement rate as opposed to a 1.6% engagement rate for mega-influencers.</p>
                        </Col>
                    </Row>
                    <Row className='mb-3 py-5'>
                        <Col md={12} className='py-1'>
                            <img src='https://api.xircls.com/static/images/website-slide/blog/b4_img_2.jpg' className='w-100' />
                        </Col>
                    </Row>
                    <Row className='my-3'>
                        <Col md={12}>
                            <h3 className='fourth-font font-two text-black fw-bolder mb-2'>Inventory Costs</h3>
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Inventory alone is a huge hidden cost in influencer marketing. More and more influencers are seeking a trial period with the product before agreeing to promote anything. If you plan on recruiting ten influencers to promote your company, and eight of them request to try your products before agreeing to work with you, then those are inventory costs to consider, especially if you are a smaller business with a finite amount of resources readily available for marketing purposes. </p>
                        </Col>
                    </Row>
                    <Row className='mb-3 py-5'>
                        <Col md={12} className='py-1'>
                            <img src='https://api.xircls.com/static/images/website-slide/blog/b4_img_3.jpg' className='w-100' />
                        </Col>
                    </Row>
                    <Row className='my-3'>
                        <Col md={12}>
                            <h3 className='fourth-font font-two text-black fw-bolder mb-2'>The Influencer’s Reputation</h3>
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>As a company, if you choose traditional marketing strategies over influencer marketing, your brand’s reputation management remains an internal matter. However, if you seek to do business with external sources like influencers, their reputation can quickly become your company’s problem.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>If you do business with an influencer whose reputation is ruined overnight, consumers will associate that influencer’s reputation with your brand. This can mean a loss of new customers, a decrease in customer retention, and a significant blow to your brand’s overall reputation.</p>
                        </Col>
                    </Row>
                    <Row className='mb-3 py-5'>
                        <Col md={12} className='py-1'>
                            <img src='https://api.xircls.com/static/images/website-slide/blog/b4_img_4.jpg' className='w-100' />
                        </Col>
                    </Row>
                    <Row className='my-3'>
                        <Col md={12}>
                            <h3 className='fourth-font font-two text-black fw-bolder mb-2'>Shifting Perspectives on Influencers</h3>
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Social media is ever-changing and evolving. Today, there are thousands of influencers who are highly effective in delivering persuasive brand content to their followers. However, in recent times, there has been a growing need among followers for transparency from their favorite influencers and celebrities.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Influencers are often known to use Photoshop, filters, and other forms of photo and video enhancement, photo staging strategies, and even stage artificial relationships and friendships to create a mirage of a life that is not attainable to those watching them. While such kind of ‘aspirational content’ used to be a recipe for success, it is fast losing its appeal among consumers demanding more authenticity from the influencers they follow.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>In such a scenario, where influencers and their activities are looked upon with a certain degree of suspicion, hitching your brand to their wagon may not always be a good decision.</p>
                        </Col>
                    </Row>
                    <Row className='mb-3 py-5'>
                        <Col md={12} className='py-1'>
                            <img src='https://api.xircls.com/static/images/website-slide/blog/b4_img_5.jpg' className='w-100' />
                        </Col>
                    </Row>
                    <Row className='my-3'>
                        <Col md={12}>
                            <h3 className='fourth-font font-two text-black fw-bolder mb-2'>App Usage</h3>
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>As stated before, social media is constantly evolving. Many apps experience ebbs and flow in popularity and usage. Influencer marketing does generate <Link to='/' className="text-blue hover-black">high ROIs</Link>, with roughly $5 earned for every $1 spent, but these are numbers that can fluctuate and shift dramatically just overnight. TikTok is clear evidence that just one social media app can completely change the board.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Influencers are often known to use Photoshop, filters, and other forms of photo and video enhancement, photo staging strategies, and even stage artificial relationships and friendships to create a mirage of a life that is not attainable to those watching them. While such kind of ‘aspirational content’ used to be a recipe for success, it is fast losing its appeal among consumers demanding more authenticity from the influencers they follow.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>If you are looking for quick popularity and a temporary surge in one-time purchases, then influencer marketing may be an ideal fit for your company. However, if you have more long-term goals such as customer retention and repeat business, you will have to fall back on other marketing strategies that promise more stability and reliability.</p>
                        </Col>
                    </Row>
                    <Row className='mb-3 py-5'>
                        <Col md={12} className='py-1'>
                            <img src='https://api.xircls.com/static/images/website-slide/blog/b4_img_6.jpg' className='w-100' />
                        </Col>
                    </Row>
                    <Row className='my-3'>
                        <Col md={12}>
                            <h3 className='fourth-font font-two text-black fw-bolder mb-2'>Is Influencer Marketing Right For Your Brand?</h3>
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col md={12}>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>Influencer marketing can be very appealing to all kinds of companies. You can target your key consumer demographic, see massive amounts of engagement and high conversions, and not spend a fortune on marketing and advertising.</p>
                            <p className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>However, carefully consider these key things:</p>
                            <ol className='font-two fw-light text-black lh-lg-md sixth-font-blog text-justify'>
                                <li><span className="fw-bold">What is your company looking for?</span> New customers? Customer loyalty? Brand awareness? Figure out what you want your company to gain from influencer marketing. </li>
                                <li><span className="fw-bold">What type of influencer do you want for your company?</span> Does this influencer match your ideal demographic? What are they known for? Do they feel like a good fit for your brand? Do you want a nano-influencer or a celebrity to promote your brand?</li>
                                <li><span className="fw-bold">Are you willing to pay for the hidden costs of influencer marketing?</span> As stated previously in this post, there are a lot of seemingly hidden costs to doing business with influencers. Does the risk outweigh the reward for your company’s reputation and brand?</li>
                            </ol>
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
                                        <img width={110} height={110} className='rounded-circle mb-1' src={'https://api.xircls.com/static/images/website-slide/blog/a4.jpg'} />
                                        <h5 className='fw-bolder text-dark fs-4 font-two'>Peyton Sweeney</h5>
                                        <p className='font-two fs-4 text-dark'>Content Writer, XIRCLS</p>
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
                            <h5 className='font-two fw-light text-dark mb-3 sixth-font-blog'>Peyton is based in the United States and is from Saint Louis, Missouri. She attended Lindenwood University and graduated with a B.A. in International Relations. After college, Peyton accepted a position as a reporter for two newspapers in the Saint Louis area.</h5>
                            <div>
                                <Link to='/blog/author/Peyton-Sweeney/' className="blog-learnmore-btn text-uppercase">Learn More</Link>
                            </div>
                        </Col>
                    </Row>
                <Row className='my-3'>
                    <BlogFoot component='influencer' />
                </Row>
            </Container>
            <Footer />
        </div >
    )
}

export default Blog_full_4