import React from "react"
import logo2 from "../base/assets/logo12.jpg"

export default function Carousel() {
  return (
    <div className="container">
      <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="3000">
            <svg
              className="bd-placeholder-img"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <rect width="100%" height="100%" fill="#fff" />
            </svg>

            <div className="container">
              <div className="carousel-caption text-start text-dark">
                <div className="main-content">
                  <div>
                    <h1 className="mb-3">
                      The{" "}
                      <span className="color-blue">
                        World's First Decentralized, Collaborating
                      </span>{" "}
                      Marketing Network.
                    </h1>
                    <p>
                      <i>Building the Web3 of Marketing</i>
                    </p>
                    <div className="d-flex justify-content-start me-3 mb-3 percent">
                      <div>
                        <h4>100%</h4>
                        <small>Verified Customer Engagement</small>
                      </div>
                      <div>
                        <h4>3%</h4>
                        <small>Average click through</small>
                      </div>
                      <div>
                        <h4>13%</h4>
                        <small>Conversion Rate</small>
                      </div>
                    </div>
                  </div>
                  <img src={logo2} alt="logo" className="img-fluid" />
                </div>
                <div className="mt-4 d-flex justify-content-between instant">
                  <p><span className="ps-1">Instant Marketing Collaborations.</span></p>
                  <p><span className="ps-1">Ledger-based Verification.</span></p>
                  <p><span className="ps-1">Real-Time Customer Reach.</span></p>
                  <p><span className="ps-1">Instant Customer Gratification.</span></p>
                  <p><span className="ps-1">No Data Sharing.</span></p>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <svg
              className="bd-placeholder-img"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <rect width="100%" height="100%" fill="#fff" />
            </svg>

            <div className="container">
              <div className="carousel-caption text-start text-dark">
                <div className="main-content">
                  <div className="div">
                    <h1 className="mb-3">
                      Your{" "}
                      <span className="color-blue">
                        Customers Stay Yours And Yours Alone.
                      </span>{" "}
                    </h1>
                    <p>
                      <i>Explore a world beyond Aggregators!</i>
                    </p>
                  </div>
                  <img src={logo2} alt="logo" className="img-fluid" />
                </div>
                <div className="mt-4 d-flex justify-content-between instant">
                  <p>Stop driving customers to your competition.</p>
                  <p><span className="ps-1">Adopt a sustainable alternative to harmful discounting.</span></p>
                  <p><span className="ps-1">Cultivate loyalty for your business, not third-party marketplaces.</span></p>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <svg
              className="bd-placeholder-img"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <rect width="100%" height="100%" fill="#fff" />
            </svg>

            <div className="container">
            <div className="carousel-caption text-start text-dark">
                <div className="main-content">
                  <div className="div">
                    <h1 className="mb-3">
                      Say Hello To Always-On{" "}
                      <span className="color-blue">
                        Marketing!
                      </span>{" "}
                    </h1>
                    <p>
                      <i>Because Customers Shop When They Want They Want To. Not When You Want Them To.</i>
                    </p>
                    <p>Stop-Start Marketing Campaigns Lose You Customer Buying Right Now.</p>
                  </div>
                  <img src={logo2} alt="logo" className="img-fluid" />
                </div>
                <div className="mt-4 d-flex justify-content-between instant">
                  <p>Run a perpetual marketing campaign.</p>
                  <p><span className="ps-1">Reach customers when they're most likely to buy from you.</span></p>
                  <p><span className="ps-1">Lock your competition out!.</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}
