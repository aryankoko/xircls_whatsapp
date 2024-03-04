import React, { useState } from "react"
import { Grid, List, Plus } from "react-feather"
import { Container, Row, Col } from "reactstrap"
import { templates } from "./FormBuilder(components)/util"
// import "./NewFrontBase.css"
import FormEditor from "./FormBuilder(components)/FormEditor"
import FormCard from "./FormBuilder(components)/FormCard"
import FormList from "./FormBuilder(components)/FormList"

const FormBuilder = () => {  
  const [openEditor, setOpenEditor] = useState(false)
  const [templateView, setTemplateView] = useState('grid')
  return (
    <>
      {openEditor ? <FormEditor setOpenEditor={setOpenEditor} /> : (
        <Container fluid className="px-0 form-builder">
          <Row>
            <Col className="col-8">
              <Row>
                <div className="text-black fw-bold fs-2">My Forms</div>
              </Row>
              <Row>
                <div className="fs-5">
                  Customise & Manage your forms in one place
                </div>
              </Row>
            </Col>
            <Col className="col-4 d-flex gap-1 justify-content-end align-items-center mt-1">
              {templateView === 'grid' && <button className="border-none btn cursor-pointer" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Grid View" onClick={() => setTemplateView('list')}><Grid size={22}/></button>}
              {templateView === 'list' && <button className="border-none btn cursor-pointer" data-bs-toggle="tooltip" data-bs-placement="bottom" title="List View" onClick={() => setTemplateView('grid')}><List size={22}/></button>}             
              <button
                onClick={() => setOpenEditor(true)}
                className="btn d-flex justify-content-center align-items-center fw-bolder fs-5"
                style={{ backgroundColor: "#020202", color: "#ffffff" }}
              >
                <Plus size={18} style={{ marginRight: "0.25rem" }} />
                Create Form
              </button>
            </Col>
          </Row>
          {templateView === 'grid' && (
            <Row className="mt-2">
              {
                  templates.map(({id, formName, description, creationDate, coverImage}) => (                    
                        <FormCard key={id} formName={formName} description={description} creationDate={creationDate} coverImage={coverImage} /> 
                  )
              )}
            </Row>
          )} 
          {templateView === 'list' && (
            <Row className="mt-2">
              {
                  templates.map(({id, formName, description, creationDate}) => (
                    <FormList key={id} formName={formName} description={description} creationDate={creationDate} />
                  )
              )}
            </Row>
          )}
        </Container>
      )}    
    </>
  )
}

export default FormBuilder
