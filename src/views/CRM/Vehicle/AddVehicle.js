/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from "reactstrap"
import { crmURL } from '@src/assets/auth/jwtService'
// import { createPortal } from 'react-dom'
import { useNavigate, useParams } from 'react-router-dom'
import toast from "react-hot-toast"
import VehicleForm from './VehicleForm'
import { postReq } from '../../../assets/auth/jwtService'
import moment from 'moment'


const AddVehicle = () => {
   const { id } = useParams()
   const urlParams = new URLSearchParams(location.search)
   const navigate = useNavigate()
   const [editData, setEditData] = useState({
      // customer_name: "",
      xircls_customer_id: urlParams.get("type") === "customer" ? id : "",
      registration_number: "",
      sales_person: "",
      vehicle_number: "",
      engine_no: "",
      vehicle_type: "",
      brand: "",
      car_model: "",
      variant: "",
      manufacture_year: "",
      delivery_date: "",
      registeration_date: ""

   })

   let PageTitle = 'Add Vehicle'

   console.log(editData.customer_id, "customer_id")

   useEffect(() => {
      // fetchVehicleData()
      // if (location.pathname.startsWith('/merchant/customers/edit-vehicle/')) {
      //    getUser('edit')
      //    PageTitle = 'Edit Vehicle'
      // } else if (location.pathname.startsWith('/merchant/customers/view-vehicle/')) {
      //    setViewPage(true)
      //    getUser('edit')
      //    PageTitle = 'View Vehicle'
      // } else {
      //    getUser()
      // }

      if (id) {
         const form_data = new FormData()
         if (urlParams.get("type") === "edit") {
            form_data.append("id", id)
            form_data.append("edit_type", "is_vehicle")
            PageTitle = 'Edit Vehicle'
         }

         if (urlParams.get("type") === "customer") {
            form_data.append("customer_id", id)
            form_data.append("tab_type", "vehicle_data")
            PageTitle = 'Add Vehicle'
         }

         postReq('get_customer_vehicle', form_data, crmURL)
            .then((resp) => {
               console.log(resp.data.success, "get_customer_vehicle")
               const data = resp?.data?.success[0]

               console.log(data, "manufacture_year")
               console.log(editData.manufacture_year, 'manufacture_year')
               let updatedData
               if (urlParams.get("type") === "edit") {
                  updatedData = {
                     // customer_name: data?.xircls_customer,
                     xircls_customer_id: data?.xircls_customer,
                     registration_number: data?.registration_number,
                     sales_person: data?.sales_person,
                     vehicle_number: data?.vehicle_number,
                     engine_no: data?.engine_no,
                     vehicle_type: data?.vehicle_type,
                     brand: data?.brand,
                     car_model: data?.car_model,
                     variant: data?.variant,
                     manufacture_year: data?.manufacture_year,
                     delivery_date: data?.delivery_date ? moment(data?.delivery_date).format("YYYY-MM-DD") : "",
                     registeration_date: data?.registeration_date ? moment(data?.registeration_date).format("YYYY-MM-DD") : ""
                  }

               }

               if (urlParams.get("type") === "customer") {
                  updatedData = {
                     xircls_customer_id: id,
                  }
               }

               setEditData(updatedData)
            })
            .catch((error) => {
               console.log(error)
            })

      }

   }, [])

   const apiCall = (btn) => {
      const form_data = new FormData()
      Object.entries(editData).map(([key, value]) => {

         if (value !== "Invalid date") {
            form_data.append(key, value)
         }
      })

      if (urlParams.get("type") === "edit") {
         form_data.append("vehicle_id", id)
      }

      form_data.append("press_btn", 'SAVE')
      // form_data.append("customer_id", id)
      console.log(form_data, "gg")

      postReq('add_vehicle', form_data, crmURL)
         .then((resp) => {
            console.log("Response:", resp)
            toast.success('Vehicle saved successfully')
            if (btn === "SAVE&Close") {
               navigate("/merchant/customers/vehicle/")
            } else {
               navigate(`/merchant/customers/edit-vehicle/${resp?.data?.vehicle_id}?type=edit`)
            }
         })
         .catch((error) => {
            console.error("Error:", error)
            toast.error('Failed to save Vehicle')
         })
   }

   const startYear = 2000;
   const endYear = 2050;
   const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index)
   return (
      <>
         <Container fluid className="px-0 pb-1">
            <Row>
               <Col md={12} className="">
                  <h4 className="mb-0">Vehicle Details</h4>
               </Col>
            </Row>
         </Container>

         <form id='formId'>
            <VehicleForm isView={false} isCustomer={urlParams.get("type") === "customer"} defaultData={editData} setData={setEditData} apiCall={apiCall} formId={"formId"} />
         </form>
      </>
   )
}

export default AddVehicle