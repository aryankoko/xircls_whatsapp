import React, { useContext, useEffect, useState } from "react"
import { Container, Row } from "reactstrap"
import { PluginHeader } from "../PluginContext"
import { getReq, postReq } from "../../../assets/auth/jwtService"
import toast from 'react-hot-toast'

const Campaign = () => {
  const { setHeader } = useContext(PluginHeader)
  const [userData, setUserData] = useState({
    issue_offer: null,
    campaign: null
  })

  console.log(userData)

  const changeOfferSetting = (e) => {
    setUserData({ ...userData, issue_offer: Number(e.target.value) })
  }

  const changeCampaignSetting = (e) => {
    setUserData({ ...userData, campaign: e.target.checked ? 1 : 2 })
  }

  const sendData = (e) => {
    e.preventDefault()
    const form_data = new FormData()
    
    form_data.append('issue_offer', userData.issue_offer)
    form_data.append('campaign', userData.campaign)
    postReq("campaign", form_data)
      .then((response) => {
        console.log(response)
        toast.success("Your campaign settings has been saved")
      })
      .catch((error) => console.log(error))
      
  }

  useEffect(() => {
    setHeader("Target Customer Profiling - Infiniti")
    getReq("campaign")
      .then((response) => response.data.data)
      .then((data) => {
        const offer_setting = data.offer_setting?.product_settings
        let issue_offer = null
        let campaign = null

        if (Number(offer_setting.allow_host_offer) === 1) {
          issue_offer = 1
        } else if (Number(offer_setting.allow_partner_offer) === 1) {
          issue_offer = 2
        } else if (Number(offer_setting.allow_host_and_partner_offer) === 1) {
          issue_offer = 3
        }

        const campaign_setting = data.campaign_setting
        console.log(campaign_setting, "p")
        if (campaign_setting.is_active === false) {
          campaign = 1
        } else if (campaign_setting.is_active === true) {
          campaign = 2
        }
        console.log(issue_offer, campaign)
        setUserData({ ...userData, issue_offer, campaign })
        
      })
      .catch((error) => console.log(error))
  }, [])

  
  return (
    <Container fluid className="px-0 plugin">
      <div className="p-2 rounded border mb-2">
        <Row>
          <div className="mb-2">
            <h4>Offer Settings:</h4>
          </div>
        </Row>
        <Row>
          <div className="form-group">
            <div className="form-check mb-1">
              <input
                className="form-check-input"
                id="issue_my_offer_loyalty"
                type="radio"
                name="issue_offer"
                value="1"
                style={{ marginRight: "5px" }}
                checked={userData.issue_offer === 1}
                onChange={changeOfferSetting}
              />
              <label
                className="form-check-label"
                htmlFor="issue_my_offer_loyalty"
              >
                Issue only my Loyalty Offer
              </label>
            </div>
            <div className="form-check mb-1">
              <input
                className="form-check-input"
                id="issue_my_offer_partner"
                type="radio"
                name="issue_offer"
                value="2"
                style={{ marginRight: "5px" }}
                checked={userData.issue_offer === 2}
                onChange={changeOfferSetting}
              />
              <label
                className="form-check-label"
                htmlFor="issue_my_offer_partner"
              >
                Issue only Partner Offers
              </label>
            </div>
            <div className="form-check mb-1">
              <input
                className="form-check-input"
                id="issue_my_offer_both"
                type="radio"
                name="issue_offer"
                value="3"
                style={{ marginRight: "5px" }}
                checked={userData.issue_offer === 3}
                onChange={changeOfferSetting}
              />
              <label className="form-check-label" htmlFor="issue_my_offer_both">
                Issue Both
              </label>
            </div>
          </div>
        </Row>
      </div>
      <div className="border p-2 rounded mb-2">
        <Row>
          <div className="form-group">
            <div className="mb-2">
              <h4>Stop Campaign</h4>
            </div>
            <div className="form-check mb-1 mt-1">
              <input
                className="form-check-input"
                type="checkbox"
                name="stop_campaign"
                id="stop_campaign_entire_id"
                value="1"
                style={{ marginRight: "5px" }}
                checked={userData.campaign === 1}
                onChange={changeCampaignSetting}
              />
              <label
                className="form-check-label"
                htmlFor="stop_campaign_entire_id"
              >
                Stop Campaign Entirely
              </label>
            </div>
            <p>By stopping the Campaign, you will:</p>
            <p>
              Stop distribution of your Acquisition Offers to customers of
              partner outlets
            </p>
            <p>
              Stop distribution of Retention Offers to your customers when they
              shop at your Outlet and at partner outlets
            </p>
            <p>
              Stop matching customer spend at your Outlet with partner rewards
            </p>
          </div>
        </Row>
      </div>
      <Row>
        <div className="d-flex justify-content-between">
          <div>
            <button className="btn btn-primary mx-1">Back</button>
          </div>
          <div>
            <button className="btn btn-primary" onClick={sendData}>
              Save
            </button>
            <button
              className="btn btn-primary"
              onClick={sendData}
              style={{ marginRight: "13px", marginLeft: "5px" }}
            >
              Save & Close
            </button>
          </div>
        </div>
      </Row>
    </Container>
  )
}

export default Campaign
