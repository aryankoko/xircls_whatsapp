import Carousel from 'react-bootstrap/Carousel'
import logo1 from "../base/assets/logo12.jpg"


function UncontrolledExample() {

  const hero_list = [
    {
      id: 1,
      name: 'Instant Marketing Collaborations'
    },
    {
      id: 2,
      name: 'Ledger-based Verification'
    },
    {
      id: 3,
      name: 'Real-Time Customer Reach'
    },
    {
      id: 4,
      name: 'Instant Customer Gratification'
    },
    {
      id: 5,
      name: 'No Data Sharing'
    }
  ]
  
  const hero_list_2 = ['Stop driving customers to your competition.', 'Create sustainable options to harmful discounting.', 'Cultivate loyalty for your business, not third-party platforms.']

  const hero_list_3 = ['Run a perpetual marketing campaign.', "Reach customers when they're most likely to buy from you.", 'Lock your competition out.']

  return (
    <Carousel>
      <Carousel.Item>
        
        <Carousel.Caption>
          <div className="row align-items-start flex-md-row-reverse main-heading">
              <div className="col-lg-3 text-left mb-4 flex-shrink-0">
                <img className="box-img" src={logo1} alt="Image" width="260px" />
              </div>
              <div className="col-lg-9  mb-md-0" style={{ textAlign: `left` }}>
                <h1>The <span className="colorb"> World's First Decentralized,<br /> Collaborative</span> Marketing Network.</h1>
                
                <div className="row  text-left py-1">
                  <h3 style={{ fontStyle: 'italic' }}>Building the Web3 of Marketing</h3>
                </div>
                <div className="row  text-left">
                  <div className="col-lg-3 text-left" >
                      <div>
                        <div className="counter fw-bold text-left ">
                          <h1 style={{ fontSize: `42px`, fontWeight: `700` }}>100%</h1>
                        <h6>Verified Customer<br /> Engagement </h6></div>
                      </div>
                  </div>
                  <div className="col-lg-3 text-left">
                      <div>
                        <div className="counter fw-bold text-left">
                          <h1 style={{ fontSize: `42px`, fontWeight: `700` }}>3%</h1>
                          <h6>Average click through</h6></div>
                      </div>
                  </div>
                  <div className="col-lg-3 text-left">
                      <div>
                        <div className="counter fw-bold text-left">
                          <h1 style={{ fontSize: `42px`, fontWeight: `700` }}>13%</h1>
                        <h6>Conversion rate</h6></div>
                      </div>
                  </div>
                </div>

              </div>
          </div>
          <strong>
            <div className="row align-items-stretch grid-border clearfix my-2">
              {
                hero_list.map((curElem, index) => {
                  return (<div className="col-lg-2 col-md-6" key={index}>
                        <div className="feature-box fbox-dark fbox-plain">
                          
                          <div className="fbox-content ">
                              <h5 style={{ textAlign: `left`}} className="lb mb-0">{curElem.name}</h5>
                          </div>
                        </div>
                    </div>)
                })
              }
               

            </div>
         </strong>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Carousel.Caption>
          <div  className="content  pt-5">
            <div className="container justify-content-around">
      
              <div className="row align-items-start flex-md-row-reverse main-heading">
                  <div className="col-lg-3 text-left mb-4 flex-shrink-0">
                    <img className="box-img" src={logo1} alt="Image" width="260px" />
                  </div>
                  <div className="col-lg-9  mb-md-0" style={{ textAlign: `left` }}>
                    <h1>Your <span className="colorb"> Customers Stay Yours<br /> And Yours Alone.</span></h1>
                    <div className="row  text-left pt-3 pb-5">
                        <h3 style={{ fontStyle: 'italic' }}>Explore a world beyond Aggregators!</h3>
                    </div>
                    <strong>
                      <div className="row align-items-stretch grid-border clearfix">
                        {
                          hero_list_2.map((curElem, index) => {
                              return <div className="col-lg-3 col-md-6" key={index}>
                                  <div className="feature-box fbox-dark fbox-plain">
                                    <div className="fbox-content ">
                                      <h5 style={{ textAlign: `left`}} className="lb mb-0">{curElem} <br /></h5>
                                    </div>
                                  </div>
                              </div>
                          })
                        }
                          
                      </div>
                    </strong>
                  </div>
              </div>
            </div>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        

        <Carousel.Caption>
          <div className="row align-items-start flex-md-row-reverse main-heading">
            <div className="col-lg-3 mb-4 flex-shrink-0">
              <img className="box-img" src={logo1} alt="Image" width="260px" />
            </div>
            <div className="col-lg-9  mb-md-0" style={{ textAlign: `left` }}>
              <h1>Say Hello To Always-On <span className="colorb"> Marketing!</span></h1>
              <div className="row py-1">
                  <h3 style={{ fontStyle: 'italic' }}>Because Customers shop when they want to. <br /> Not when you want them to. <br /></h3>
              
                  <h4>Stop-Start Marketing Campaigns Lose You Customers Buying Right Now.</h4>
                
              </div>
              
            </div>
          </div>
          <strong>
            <div className="row align-items-stretch grid-border clearfix">
              {
                hero_list_3.map((curElem, index) => {
                  return <div className="col-lg-3 col-md-6" key={index}>
                      <div className="feature-box fbox-dark fbox-plain">
                        <div className="fbox-content ">
                            <h5 style={{ textAlign: `left`}} className="lb mb-0">{curElem}</h5>
                        </div>
                      </div>
                  </div>
                })
              }
              
            </div>
        </strong>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default UncontrolledExample