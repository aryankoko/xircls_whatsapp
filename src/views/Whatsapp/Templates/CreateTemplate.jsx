/* eslint-disable prefer-const */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { CornerDownLeft, ExternalLink, FileText, Image, MapPin, Phone, PlayCircle, Plus } from 'react-feather'
import toast from 'react-hot-toast'
import Select from 'react-select'
import { Card, CardBody, Col, Container, Input, Label, Row } from 'reactstrap'
import wp_back from './imgs/wp_back.png'
import { selectPhoneList } from '../../../Helper/data'
import { postReq } from '../../../assets/auth/jwtService'
import FrontBaseLoader from '../../Components/Loader/Loader'

export default function CreateTemplate() {
  const [useLoader, setLoader] = useState(false)
  const paramVals = [{ value: 'FirstName', label: "FirstName" }, { value: 'LastName', label: "LastName" }, { value: 'customerName', label: "customerName" }, { value: 'CompanyName', label: "CompanyName" }, { value: 'OrderID', label: "OrderID" }, { value: 'ProductName', label: "ProductName" }]
  const msgTypeList = [
    {
      value: "Text",
      label: "Text"
    },
    {
      value: "Image",
      label: "Image"
    },
    {
      value: "Document",
      label: "Document"
    },
    {
      value: "Video",
      label: "Video"
    },
    {
      value: "None",
      label: "None"
    }
  ]
  const tempCatgList = [
    { value: 'UTILITY', label: 'Utility' },
    { value: 'MARKETING', label: 'Marketing' }
  ]
  const langList = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'ja', label: 'Japanese' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ru', label: 'Russian' },
    { value: 'ar', label: 'Arabic' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'hi', label: 'Hindi' },
    { value: 'ko', label: 'Korean' },
    { value: 'nl', label: 'Dutch' },
    { value: 'tr', label: 'Turkish' },
    { value: 'sv', label: 'Swedish' }
  ]

  const [BasicTemplateData, setBasicTemplateData] = useState({
    templateName: '',
    templateCategory: '',
    language: '',
    footer: ''
  })

  // headrer
  const [Header, setHeader] = useState({
    type: 'Image',
    text: '',
    file: ''
  })

  const [Header_Parameters, setHeader_Parameters] = useState([])


  const Header_text_change = (e) => {
    setHeader({ ...Header, text: e.target.value })
  }

  const addHeaderParam = (e) => {
    const uptstr = `${Header.text}{{1}}`
    setHeader({ ...Header, text: uptstr })
  }

  useEffect(() => {
    // alert("sdfsdf")
    if (Header.text.includes("{{1}}")) {
      // Update header parameters
      if (Header_Parameters.length !== 1) {
        setHeader_Parameters([''])
      }
    } else {
      setHeader_Parameters([])
    }

  }, [Header.text])

  // body data structure ---------------------
  const [Body_Parameters, setBody_Parameters] = useState([])
  const [useMsgBody, setMsgBody] = useState("Hello {{3}}, your code will expire in {{4}} mins.")
  const [displayedMessage, setDisplayedMessage] = useState(useMsgBody)

  const handleBodyDisplay = (message, parameters) => {
    let uptDisplayMsg = message.replace(/{{\s*(\d+)\s*}}/g, (_, n) => {
      const replacement = parameters[n - 1] // n starts from 1
      return (replacement === '' || replacement === undefined) ? `{{${n}}}` : `[${replacement}]`
    })
    uptDisplayMsg = uptDisplayMsg.replace(/~(.*?)~/g, (_, p1) => `<del>${p1}</del>`).replace(/\*(.*?)\*/g, (_, p1) => `<strong>${p1}</strong>`).replace(/_(.*?)_/g, (_, p1) => `<em>${p1}</em>`)
    setDisplayedMessage(uptDisplayMsg)
  }

  const handleMsgBodyChange = () => {
    try {
      let str = useMsgBody
      let sequenceCount = (str.match(/{{\s*(\d+)\s*}}/g) || []).length
      let sequence = Array.from({ length: sequenceCount }, (_, i) => 1 + i)

      // Update Body_Parameters and useMsgBody simultaneously
      let newParam = sequence.map((_, i) => Body_Parameters[i] || '')
      let replacedString = str.replace(/{{\s*(\d+)\s*}}/g, () => `{{${sequence.shift()}}}`)

      setBody_Parameters(newParam)
      setMsgBody(replacedString)
      handleBodyDisplay(replacedString, newParam)
    } catch (error) {
      console.error(error)
      setBody_Parameters([])
      setMsgBody(useMsgBody)
    }
  }

  const handleParameterChange = (index, value) => {
    let updatedParameters = [...Body_Parameters]
    updatedParameters[index] = value
    handleBodyDisplay(useMsgBody, updatedParameters)
    setBody_Parameters(updatedParameters)
  }

  useEffect(() => {
    handleMsgBodyChange()
  }, [useMsgBody])

  // body xxxxxxxxxxxxxxxxxxx ---------------------


  const [useInteractive, setInteractive] = useState([])
  const [useButtons, setButtons] = useState({
    QUICK_REPLY: 3,
    URL: 1,
    PHONE_NUMBER: 1
  })

  // interactive change---------------------------------------------------
  const addInteractiveBtn = (type) => {
    const oldData = [...useInteractive]
    let newData

    if (type === 'QUICK_REPLY') {
      newData = {
        type: 'QUICK_REPLY',
        text: ""
      }
    } else if (type === 'URL') {
      newData = {
        type: 'URL',
        text: "",
        url: ""
      }
    } else if (type === 'PHONE_NUMBER') {
      newData = {
        type: 'PHONE_NUMBER',
        code: '',
        text: "",
        value: ""
      }
    } else {
      setInteractive([])
      uptInteractiveBtnDisplay(oldData)
      // console.log(oldData)
      return // No need to proceed further if type is not recognized
    }

    setInteractive([...oldData, newData])
    uptInteractiveBtnDisplay([...oldData, newData])
  }


  const uptInteractiveBtnDisplay = (data) => {
    let btnList = [...data]
    let btnData = useButtons
    if (btnList.length >= 3) {
      setButtons({
        QUICK_REPLY: 0,
        URL: 0,
        PHONE_NUMBER: 0
      })

    } else {

      btnList.map((ele) => {
        if (btnData[ele.type] === 0) {
        } else {
          btnData[ele.type] -= 1
        }
      })
      setButtons(btnData)
    }
  }
  useEffect(() => {
    uptInteractiveBtnDisplay(useInteractive)
  }, [])

  const handleInputChange = (index, field, value) => {
    let oldData = [...useInteractive]
    oldData[index][field] = value
    setInteractive(oldData)
  }

  const handleDeleteAction = (index, type) => {
    let oldData = [...useInteractive]
    oldData.splice(index, 1)
    setInteractive(oldData)

    // deleted numbers
    const oldBtns = useButtons
    // console.log(oldData.length)
    if (oldData.length === 0) {
      setButtons({
        QUICK_REPLY: 3,
        URL: 1,
        PHONE_NUMBER: 1
      })

    } else {
      if (type === 'QUICK_REPLY') {
        oldBtns[type] += 1

      } else {
        oldBtns['QUICK_REPLY'] += 1
        oldBtns[type] += 1
        setButtons(oldBtns)
      }

    }
  }

  const formValidation = () => {
    const errorMsg = {
      templateName: "Enter Template Name",
      templateCategory: "Select Template Category",
      language: "Select Template Language"
    }

    if (BasicTemplateData.templateName === '') {
      toast.error(errorMsg['templateName'])
      return false
    }
    const pattern = /[^a-z0-9_]/
    if (pattern.test(BasicTemplateData.templateName)) {
      // String contains special characters or whitespace
      toast.error("Only lower case alphabets, numbers and underscore is allowed for Template Name")
      return false
    }
    if (BasicTemplateData.templateCategory === '') {
      toast.error(errorMsg['templateCategory'])
      return false
    }
    if (BasicTemplateData.language === '') {
      toast.error(errorMsg['language'])
      return false
    }
    if (BasicTemplateData.useMsgBody === '') {
      toast.error(errorMsg['useMsgBody'])
      return false
    }
    return true


  }

  const handleTemplateSubmit = () => {
    // console.log("------------------------------------------------")
    // console.log("Body_Parameters :   ", Body_Parameters)
    // console.log("useMsgBody :  ", useMsgBody)
    // console.log("Header :  ", Header)
    // console.log("Header_Parameters :  ", Header_Parameters)
    // console.log("BasicTemplateData :  ", BasicTemplateData)
    // console.log("useInteractive :  ", useInteractive)
    // console.log("useButtons :  ", useButtons)
    // return null
    if (!formValidation()) {
      return false
    }
    setLoader(true)
    const newInteractiveData = useInteractive.map(item => {
      if (item.title === '') {
        return null // Skip items without a title
      }

      if (item.type === "PHONE_NUMBER") {
        return {
          type: item.type,
          text: item.title,
          phone_number: item.code.replace(/\+/g, '') + item.value
        }
      } else if (item.type === "URL") {
        return {
          type: item.type,
          text: item.title,
          url: item.value
        }
      } else if (item.type === "QUICK_REPLY") {
        return {
          type: item.type,
          text: item.title
        }
      } else {
        // Handle unmatched cases
        return null
      }
    }).filter(Boolean) // Remove null entries from the result
    // return null
    const components = [
      Header.type === 'Document' && {
        type: 'HEADER',
        format: Header.type.toUpperCase(),
        example: { header_handle: [''] }
      },
      Header.type === 'Image' && {
        type: 'HEADER',
        format: Header.type.toUpperCase(),
        example: { header_handle: [''] }
      },
      Header.type === 'Video' && {
        type: 'HEADER',
        format: Header.type.toUpperCase(),
        example: { header_handle: [''] }
      },
      Header.type === 'Text' && Header_Parameters.length > 0 && {
        type: 'HEADER',
        format: 'TEXT',
        text: Header.text,
        example: {
          header_text: Header_Parameters
        }
      },
      Header.type === 'Text' && Header_Parameters.length === 0 && {
        type: 'HEADER',
        format: 'TEXT',
        text: Header.text
      },
      Body_Parameters.length > 0 && {
        type: 'BODY',
        text: useMsgBody,
        example: {
          body_text:
            [Body_Parameters]
        }
      },
      Body_Parameters.length === 0 && {
        type: 'BODY',
        text: useMsgBody
      },

      BasicTemplateData.footer !== '' && {
        type: 'FOOTER',
        text: BasicTemplateData.footer
      },

      useInteractive.length !== 0 && {
        type: "BUTTONS",
        buttons: newInteractiveData
      }
    ].filter(Boolean)

    // const payData = JSON.stringify(payload, null, 2)
    const formData = new FormData()

    formData.append('name', BasicTemplateData.templateName)
    formData.append('category', BasicTemplateData.templateCategory)
    formData.append('language', BasicTemplateData.language)
    formData.append('components', JSON.stringify(components))
    formData.append('headerUrl', Header.file)
    function changeData(list) {
      const newPara = []
      list.map((elem) => {
        newPara.push({ type: 'Text', text: elem })
      })
      return newPara
    }
    if (Header_Parameters.length > 0) {
      formData.append('headerVariableList', JSON.stringify(changeData(Header_Parameters)))
    }
    if (Body_Parameters.length > 0) {
      formData.append('bodyVariableList', JSON.stringify(changeData(Body_Parameters)))
    }

    // console.log("Header_Parameters", changeData(Header_Parameters))
    // console.log("Body_Parameters", changeData(Body_Parameters))
    // return null
    // Now you can use formData for your purpose

    // console.log("payload", components)
    // console.log("useInteractive", useInteractive)
    // console.log(BasicTemplateData)
    // console.log(Header.file)

    // return null

    // fetch("https://ae49-2402-e280-3d9c-20d-e6f6-f0ed-542e-baa8.ngrok-free.app/createTemplate/", {
    //   method: 'POST',
    //   body: formData
    // })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`)
    //     }
    //     return response.json()
    //   })
      postReq("createTemplate", formData)
      .then((res) => {
        // console.log(res.data)
        if (res.data.id) {
          toast.success("Template has been created")
        } else if (res.data.code === 100) {
          toast.error(res.data.error_user_msg ?? res.data.message)
        } else {
          toast.error("Something went wrong!")
        }
        setLoader(false)
      }).catch((err) => { console.log(err); setLoader(false); toast.error("Something went wrong!") })

  }
  // massgae body function olny ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  return (
    <Container style={{ marginBottom: "200px" }}>
      {

        useLoader && <FrontBaseLoader />
      }
      <Card>
        <CardBody>
          <h4 className="">New Template Message </h4>
        </CardBody>
      </Card>

      <Card>
        <CardBody>

          <Row>
            <Col md="6">
              <div>
                <h4 className="">Template Category</h4>
                <p className="fs-5  text-secondary">Your template should fall under one of these categories.</p>
                <Select
                  className=''
                  options={tempCatgList}
                  closeMenuOnSelect={true}
                  onChange={(e) => setBasicTemplateData({ ...BasicTemplateData, templateCategory: e.value })}
                />
              </div>
            </Col>
            <Col md="6">
              <div>
                <h4 className="">Template Language</h4>
                <p className="fs-5  text-secondary">You will need to specify the language in which message template is submitted.</p>
                <Select
                  className=''
                  options={langList}
                  closeMenuOnSelect={true}
                  onChange={(e) => setBasicTemplateData({ ...BasicTemplateData, language: e.value })}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <div className='mt-3'>
                <h4 className="">Template Name</h4>
                <p className="fs-5  text-secondary">Name can only be in lowercase alphanumeric characters and underscores. Special characters and white-space are not allowed
                  e.g. - app_verification_code</p>
                <input
                  type="text"
                  className="form-control "
                  placeholder='Template Name'
                  onChange={(e) => setBasicTemplateData({ ...BasicTemplateData, templateName: e.target.value })}
                />

              </div>

              <div className='mt-3'>
                <h4 className="mt-1">Template Type</h4>
                <p className="fs-5  text-secondary">Your template type should fall under one of these categories.</p>
                <Select
                  className=''
                  options={msgTypeList}
                  closeMenuOnSelect={true}
                  defaultValue={{ label: Header.type, value: Header.type }}
                  onChange={(e) => {
                    if (e && e.value !== Header.type.value) {
                      setHeader({ ...Header, type: e.value, file: '' })

                      // setOptOutRespConfig(null)
                    }
                  }}
                />
              </div>
              {/* header */}
              <div>

                <div>
                  {Header.type === 'Text' &&
                    <div className='mt-3'>
                      <h4 className="">Template Header Text </h4>
                      <p className="fs-5  text-secondary">Your message content. Upto 60 characters are allowed.</p>
                      <input
                        type="text"
                        value={Header.text}
                        className="form-control "
                        placeholder='Enter Header text here'
                        maxLength={60}
                        onChange={Header_text_change}
                      />
                      <button className={`btn btn-primary mt-1 ${Header_Parameters.length >= 1 ? 'd-none' : 'd-block'}`} onClick={addHeaderParam}>add parameter</button>
                      <div>
                        {
                          Header_Parameters.map((item) => (
                            <div className="mt-1">
                              <Select options={paramVals}
                                onChange={(e) => { setHeader_Parameters([e.value]) }}
                                closeMenuOnSelect={true} />
                            </div>
                          ))
                        }
                      </div>
                    </div>}
                  {(Header.type === 'Image' || Header.type === 'Video' || Header.type === 'Document') &&

                    <div className='mt-3'>
                      <h4 className="">{Header.type} Media File</h4>
                      <p className="fs-5  text-secondary">Choose your media file</p>
                      <div className='d-flex align-items-center gap-1 mt-1'>
                        <input type="file" className='d-none' name="mediaUrl" id="mediaUrl" onChange={(e) => setHeader({ ...Header, file: e.target.files[0] })} />
                        <label htmlFor="mediaUrl" className='d-flex gap-1 btn btn-secondary rounded-2  justify-content-center  align-items-center  border' style={{ width: "300px", padding: "3px 0" }}><Image /> <p className="m-0">Upload from Media Library</p> </label>
                      </div>
                    </div>}
                </div>
                {/* msg body ---------------------------------------------- */}
                <div className='mt-3'>
                  <div className='mt-3'>
                    <h4 className="">Template Format</h4>
                    <p className="fs-5 text-secondary">
                      Use text formatting - *bold* , _italic_ & ~strikethrough~
                      Your message content. Upto 1024 characters are allowed.
                      e.g. - Hello {`{{1}}`}, your code will expire in {`{{2}}`} mins.
                    </p>
                    <textarea
                      className="form-control"
                      value={useMsgBody}
                      onChange={(e) => setMsgBody(e.target.value)}
                      rows="5"
                      maxLength={1024}
                    ></textarea>
                    <button className='btn btn-primary mt-1' onClick={() => setMsgBody((prev) => `${prev}{{${Body_Parameters.length + 1}}}`)} >Add parameter</button>
                  </div>
                  {/* Sample values for parameters input */}
                  <div className='mt-3'>
                    <h4 className="">Sample Values</h4>
                    <p className="fs-5 text-secondary">
                      Specify sample values for your parameters. These values can be
                      changed at the time of sending. e.g. - {'{{1}}'}: Mohit, {'{{2}}'}: 5.
                    </p>
                    <div className='d-flex flex-column gap-1'>
                      {Body_Parameters?.map((paramData, index) => {
                        return (
                          <div className='d-flex' key={index + 1}>
                            <div className='w-25 d-flex justify-content-center align-items-center '>
                              <h5>{`{{ ${index + 1} }}`}</h5>
                            </div>
                            <div className='w-100'>
                              <Select options={paramVals}
                                value={{ value: paramData, label: paramData }}
                                onChange={(e) => handleParameterChange(index, e.label)}
                                closeMenuOnSelect={true} />

                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                {/* msg body  end---------------------------------------------- */}


              </div>

              <div className='mt-3'>
                <h4 className="">Template Footer <span className='text-secondary'>(Optional)</span></h4>
                <p className="fs-5  text-secondary">Your message content. Upto 60 characters are allowed.</p>
                <input
                  type="text"
                  className="form-control "
                  placeholder='Enter Footer text here'
                  maxLength={60}
                  onChange={(e) => setBasicTemplateData({ ...BasicTemplateData, footer: e.target.value })}
                />
              </div>

            </Col>

            {/* whatsapp ui  -------------------------------------------- */}
            <Col lg="6" className='d-flex align-items-center flex-column   justify-content-center ' >
              <div className=' d-flex flex-column  px-2 pe-4 py-5 ' style={{ width: '400px', whiteSpace: 'pre-wrap', gap: "5px", backgroundImage: `url(${wp_back})` }}>

                <Card className='rounded-3 shadow-lg  position-relative mb-0 whatsapp_template_card' >
                  <CardBody className='p-2'>
                    {/* {Header.type === "None" && <div className='border rounded-3 d-flex justify-content-center  align-items-center ' style={{ height: "170px", background: "#ffddb0" }}>
                      <Image size={45} color='#faad20' />
                      <PlayCircle size={45} color='#5f66cd' />
                      <FileText size={45} color='#f33d79' />
                    </div>} */}
                    {Header.type === "Image" && <div className='border rounded-3 d-flex justify-content-center  align-items-center ' style={{ minHeight: "170px", background: "#ffddb0" }}>
                      {
                        Header.file === '' ? <Image size={45} color='#faad20' /> : <img
                          className='img-fluid border-0 rounded-3 w-100 object-fit-cover'
                          style={{ minHeight: "170px" }}
                          // src={URL.createObjectURL(Header.file) ?? '' }
                          src={Header.file === '' ? '' : URL.createObjectURL(Header.file)}

                          alt=""
                        />

                      }
                    </div>}

                    {Header.type === "Video" && <div className='border rounded-3 d-flex justify-content-center  align-items-center ' style={{ height: "170px", background: "#bbc7ff" }}>

                      {
                        Header.file === '' ? <PlayCircle size={45} color='#5f66cd' /> : <video className='rounded-3  object-fit-cover w-100' controls autoPlay mute style={{ height: "170px" }}>
                          <source
                            src={Header.file === '' ? '' : URL.createObjectURL(Header.file)}
                            type="video/mp4"
                          />
                          Video not supported.
                        </video>
                      }
                    </div>}
                    {Header.type === "Document" && <div className='border rounded-3 d-flex justify-content-center  align-items-center ' style={{ height: "170px", background: "#ffb8cf" }}>
                      <FileText size={45} color='#f33d79' />
                    </div>}
                    {
                      Header.type === "Text" && <h6 className='fs-4 text-black bolder mb-1 '>{Header.text.replace(/\{\{1\}\}/g, Header_Parameters[0] === '' ? '{{1}}' : `[${Header_Parameters[0]}]`)}</h6>
                    }
                    {/* body */}
                    <div className='mt-2'>
                      <h5 dangerouslySetInnerHTML={{ __html: displayedMessage }}></h5>
                    </div>
                    {/* footer */}
                    {
                      BasicTemplateData.footer && <h6 className='text-secondary mt-1'>{BasicTemplateData.footer}</h6>
                    }
                  </CardBody>
                  {
                    useInteractive && useInteractive.map((elem) => {
                      if (elem.type === 'PHONE_NUMBER' && elem.title !== '') {
                        return (
                          <div className="border-top  bg-white  d-flex text-primary justify-content-center  align-items-center   " style={{ padding: "10px", gap: "8px" }} >
                            <Phone size={17} /><h6 className='m-0 text-primary' > {elem.title}</h6>
                          </div>)
                      }
                      if (elem.type === 'URL' && elem.title !== '') {
                        return (
                          <div className="border-top  bg-white  d-flex text-primary justify-content-center  align-items-center   " style={{ padding: "10px", gap: "8px" }} >
                            <ExternalLink size={17} /><h6 className='m-0 text-primary' > {elem.title}</h6>
                          </div>)
                      }
                      if (elem.type === 'QUICK_REPLY' && elem.title !== '') {
                        return (
                          <div className="border-top  bg-white  d-flex text-primary justify-content-center  align-items-center   " style={{ padding: "10px", gap: "8px" }} >
                            <CornerDownLeft size={17} /> <h6 className='m-0 text-primary' > {elem.title}</h6>
                          </div>)
                      }
                    })
                  }
                </Card>
                {/* Buttons */}
              </div>

              <p className='mt-4' style={{ width: '400px' }}>Disclaimer: This is just a graphical representation of the message that will be delivered. Actual message will consist of media selected and may appear different.</p>
            </Col>
          </Row>
          <div>


            <div className='mt-3'>
              <h4 className="">Interactive Actions</h4>
              <p className="fs-5  text-secondary">In addition to your message, you can send actions with your message.<br />
                Maximum 25 characters are allowed in CTA button title & Quick Replies.
              </p>
              <div className=''>

                {/* UI Interactive */}
                <div className='mt-2 px-lg-1'>
                  {useInteractive?.length > 0 &&
                    <div className='gap-1 d-flex flex-column  '>
                      {useInteractive?.map((ele, index) => {

                        if (ele.type === 'QUICK_REPLY') {
                          return (
                            <Row key={index}>
                              <Col lg="2" className='d-flex justify-content-center  align-items-center '><p className='m-0'>Quick Reply {index + 1} :</p></Col>

                              <Col lg="4">
                                <input
                                  type="text"
                                  className="form-control "
                                  placeholder='Button Title'
                                  maxLength={25}
                                  value={ele.title}
                                  onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                                />
                              </Col>
                              <Col lg="1" className=' d-flex  justify-content-center  align-items-center fs-4'>
                                <div className='cursor-pointer' onClick={() => handleDeleteAction(index, ele.type)}>X</div>
                              </Col>
                            </Row>)
                        }
                        if (ele.type === 'URL') {
                          return (
                            <Row key={index}>
                              <Col lg="2" className='d-flex justify-content-center  align-items-center '><p className='m-0'>Call to Action {index + 1} :</p></Col>
                              <Col lg="3">
                                <input
                                  type="text"
                                  className="form-control "
                                  placeholder='Button Title'
                                  maxLength={25}
                                  value={ele.type}
                                  disabled
                                />
                              </Col>

                              <Col lg="3">
                                <input
                                  type="text"
                                  className="form-control "
                                  placeholder='Button Title'
                                  maxLength={25}
                                  value={ele.title}
                                  onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                                />
                              </Col>
                              <Col >
                                <input
                                  type="text"
                                  className="form-control "
                                  placeholder='Button Value'
                                  value={ele.value}
                                  onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                                />
                              </Col>

                              <Col lg="1" className=' d-flex  justify-content-center  align-items-center fs-4'>
                                <div className='cursor-pointer' onClick={() => handleDeleteAction(index, ele.type)}>X</div>
                              </Col>
                            </Row>
                          )
                        }
                        if (ele.type === 'PHONE_NUMBER') {
                          return (
                            <Row key={index}>
                              <Col lg="2" className='d-flex justify-content-center  align-items-center '><p className='m-0'>Call to Action {index + 1} :</p></Col>
                              <Col lg="3">
                                <input
                                  type="text"
                                  className="form-control "
                                  placeholder='Button Title'
                                  maxLength={25}
                                  value={ele.type}
                                  disabled
                                />
                              </Col>

                              <Col lg="3">
                                <input
                                  type="text"
                                  className="form-control "
                                  placeholder='Button Title'
                                  maxLength={25}
                                  value={ele.title}
                                  onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                                />
                              </Col>
                              <Col lg="1">
                                <Select options={selectPhoneList}
                                  onChange={(e) => handleInputChange(index, 'code', e.value)}
                                  closeMenuOnSelect={true} />
                              </Col>
                              <Col >
                                <input
                                  type="text"
                                  className="form-control "
                                  placeholder='Button Value'
                                  value={ele.value}
                                  onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                                />
                              </Col>

                              <Col lg="1" className=' d-flex  justify-content-center  align-items-center fs-4'>
                                <div className='cursor-pointer' onClick={() => handleDeleteAction(index, ele.type)}>X</div>
                              </Col>
                            </Row>
                          )
                        }
                      })}

                    </div>}
                  <div className='d-flex gap-2 mt-1'>
                    <div className={`btn btn-primary btn-sm d-flex justify-content-center  align-items-center   gap-1 ${useButtons.QUICK_REPLY === 0 ? 'disabled' : ''}`} onClick={() => addInteractiveBtn("QUICK_REPLY")} >
                      <Plus size={18} /> <p className='m-0'>Quick Reply</p> <div className='border d-flex justify-content-center  align-items-center rounded-5 m-0' style={{ background: "#b9b9b9", color: "#fff", height: "20px", width: "20px" }}><p className="m-0 font-small-3">{useButtons.QUICK_REPLY}</p></div>
                    </div>
                    <div className={`btn btn-primary btn-sm d-flex justify-content-center  align-items-center  gap-1 ${(useButtons.URL === 0) ? 'disabled' : ''}`} onClick={() => addInteractiveBtn("URL")}>
                      <Plus size={18} /> <p className='m-0'>URL</p> <div className='border d-flex justify-content-center  align-items-center rounded-5 m-0' style={{ background: "#b9b9b9", color: "#fff", height: "20px", width: "20px" }}><p className="m-0 font-small-3">{useButtons.URL}</p></div>
                    </div>
                    <div className={`btn btn-primary btn-sm d-flex justify-content-center  align-items-center  gap-1 ${(useButtons.PHONE_NUMBER === 0) ? 'disabled' : ''}`} onClick={() => addInteractiveBtn("PHONE_NUMBER")}>
                      <Plus size={18} /> <p className='m-0'>Phone Number</p> <div className='border d-flex justify-content-center  align-items-center rounded-5 m-0' style={{ background: "#b9b9b9", color: "#fff", height: "20px", width: "20px" }}><p className="m-0 font-small-3">{useButtons.PHONE_NUMBER}</p></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button className='btn btn-primary mt-3' onClick={handleTemplateSubmit}> submit</button>
            </div>
          </div>
        </CardBody>
      </Card>
    </Container>
  )
}