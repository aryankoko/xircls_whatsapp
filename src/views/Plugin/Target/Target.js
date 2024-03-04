import React, { useContext, useEffect, useState } from "react"
import { Container, Row, Col } from "reactstrap"
import { PluginHeader } from "../PluginContext"
import { getReq } from "../../../assets/auth/jwtService"
// import { useForm } from "react-hook-form"

const Target = () => {

    // const { handleSubmit } = useForm()

    const [resData, setResData] = useState({})

    const [checkedMain, setCheckedMain] = useState([])
    const [checkedSub, setCheckedSub] = useState([])
    const [checkedSubType, setCheckedSubType] = useState([])

    console.log(checkedMain, checkedSub, checkedSubType)


    // const onSubmit = (data) => {
    //     const dataValue = {
    //         parent_categories: `${Object.entries(data.target).map(([key, value]) => {
    //             console.log(key, value)
    //             const divided = key.split('-')
    //             if (value) {
    //                 if ((divided[0] === 'main' && divided[1] !== undefined)) {
    //                     return divided[1]
    //                 }
    //             }
    //         })}`
    //     }
    //     console.log(dataValue)
    // }

    // const onSubmit = (e) => {
    //     console.log(e)
        // const categories = (type) => Object.entries(data.target).map(([key, value]) => {
        //     const divided = key.split('-')
        //     if (value && divided[0] === type) {
        //         return divided[1]
        //     }
        // }).filter(Boolean).join(',')

        // const dataValue = {
        //     parent_categories: categories('main'),
        //     sub_categories: categories('sub'),
        //     sub_type_categories: categories('subType')
        // }

        // const formData = new FormData

        // Object.entries(dataValue).map(([key, value]) => {
        //     formData.append(key, value)
        // })

        // console.log(formData)
    // }

    const handleChecked = (e, type, object) => {
        if (type === 'main') {
            if (e.target.checked) {
                setCheckedMain([...checkedMain, object])
            } else {
                setCheckedMain(checkedMain.filter(item => item.id !== object.id))
                const filteredSub = checkedSub.filter(item => item.parent_id !== object.id)
                setCheckedSub(filteredSub)
                setCheckedSubType(checkedSubType.filter(item => filteredSub.some(ele => ele.id === item.parent_id)))
            }
        }

        if (type === 'sub') {
            if (e.target.checked) {
                setCheckedSub([...checkedSub, object])
            } else {
                setCheckedSub(checkedSub.filter(item => item.id !== object.id))
                setCheckedSubType(checkedSubType.filter(item => item.parent_id !== object.id))
            }
        }

        if (type === 'subType') {
            if (e.target.checked) {
                setCheckedSubType([...checkedSubType, object])
            } else {
                setCheckedSubType(checkedSubType.filter(item => item.id !== object.id))
            }
        }
    }

    // const  [selectedCategories, setSelectedCategories] = useState([])
    // const  [subCategories, setSubCategories] = useState(resData?.categories?.sub_categories)
    // const  [subTypeCategories, setSubTypeCategories] = useState(resData?.categories?.sub_type_categories)
    // const [childRender, setChildRender] = useState({})
    // const [grandChildRender, setGrandChildRender] = useState({})

    // const handleCheckboxChange = (category) => {
    //     const categoryIndex = selectedCategories.indexOf(category.id)
    //     let  updatedSelectedCategories = []
    //     if (categoryIndex === -1) {
    //         updatedSelectedCategories = [...selectedCategories, category.id]
    //     } else {
    //         updatedSelectedCategories = selectedCategories.filter((item) => item !== category.id)
    //     }

    //     setSelectedCategories(updatedSelectedCategories)

    //     const updatedSubCategories = resData?.categories?.sub_categories.map((sub_category) => {
    //         if (sub_category.parent_id === category.id) {
    //             return {...sub_category, checked: updatedSubCategories.includes(sub_category.id)}
    //         }
    //         return sub_category
    //     })

    //     const updatedSubTypeCategories = resData?.categories?.sub_type_categories.map((sub_type_category) => {
    //         if (sub_type_category.parent_id === category.id) {
    //             return {...sub_type_category, checked: updatedSelectedCategories.includes(sub_type_category.id)}
    //         }
    //         return sub_type_category
    //     })

    //     setSubCategories(updatedSubCategories)
    //     setSubTypeCategories(updatedSubTypeCategories)
    // }

    // const handleSubCheckboxChange = (subCategory) => {
    //     const subCategoryIndex = updatedSubCategories.indexOf(subCategory)
    // }

    const { setHeader } = useContext(PluginHeader)
    useEffect(() => {
        setHeader('Target Customer Profiling - Infiniti')
        getReq('target').then(response => { 
            console.log(response.data.data)
            setResData(response.data.data) 
        }).catch(error => console.log(error))
    }, [])
    return (
        <>
            <form onSubmit={e => {
                e.preventDefault()
                console.log(e)
                }}>
                <Container fluid className="plugin">
                    <Row>
                        <div className="mb-2">
                            <h4>Profile your ideal customer. Improve offer targeting.</h4>
                        </div>
                    </Row>
                    <br />
                    <Row>
                        <h4><span style={{ borderBottom: "1px solid #7367f0", paddingBottom: "0.5rem", color: '#7367f0' }}>My Target Customers Are</span></h4>
                    </Row>
                    <Row>
                        <Col className="my-2 form-check d-flex gap-5" md={12}>
                            <div><input type='checkbox' id={'outlet-men'} className='form-check-input cursor-pointer' /><label htmlFor={'outlet-men'} className='form-check-label'>Men</label></div>
                            <div><input type='checkbox' id={'outlet-women'} className='form-check-input cursor-pointer' /><label htmlFor={'outlet-women'} className='form-check-label'>Women</label></div>
                            <div><input type='checkbox' id={'outlet-kids'} className='form-check-input cursor-pointer' /><label htmlFor={'outlet-kids'} className='form-check-label'>Kids</label></div>
                        </Col>
                        <Col className="my-2" md={12}>
                            <Container fluid className="border rounded-3 pt-1 px-1 custom-table">
                                <Row className="px-1">
                                    <Col md={12} className='d-flex pb-1'>
                                        <div className="d-flex align-items-center border-end px-2 fw-bold" style={{ width: '20%' }}>
                                            For
                                        </div>
                                        <div className="d-flex align-items-center border-end px-2 fw-bold" style={{ width: '40%' }}>
                                            From Age
                                        </div>
                                        <div className="d-flex align-items-center border-end px-2 fw-bold" style={{ width: '40%' }}>
                                            To Age
                                        </div>
                                    </Col>
                                </Row>
                                {<Row className="px-1 d-none" id={'men-row'}>
                                    <hr />
                                    <Col md={12} className='d-flex pb-1'>
                                        <div className="d-flex align-items-center border-end px-2" style={{ width: '20%' }}>
                                            Men
                                        </div>
                                        <div className="d-flex align-items-center border-end px-2" style={{ width: '40%' }}>
                                            <input type={'text'} className='form-control' placeholder="18" />
                                        </div>
                                        <div className="d-flex align-items-center border-end px-2" style={{ width: '40%' }}>
                                            <input type={'text'} className='form-control' placeholder="50" />
                                        </div>
                                    </Col>
                                </Row>}
                                {<Row className="px-1 d-none" id={'women-row'}>
                                    <hr />
                                    <Col md={12} className='d-flex pb-1'>
                                        <div className="d-flex align-items-center border-end px-2" style={{ width: '20%' }}>
                                            Women
                                        </div>
                                        <div className="d-flex align-items-center border-end px-2" style={{ width: '40%' }}>
                                            <input type={'text'} className='form-control' placeholder="18" />
                                        </div>
                                        <div className="d-flex align-items-center border-end px-2" style={{ width: '40%' }}>
                                            <input type={'text'} className='form-control' placeholder="50" />
                                        </div>
                                    </Col>
                                </Row>}
                                {<Row className="px-1 d-none" id={'kid-row'}>
                                    <hr />
                                    <Col md={12} className='d-flex pb-1'>
                                        <div className="d-flex align-items-center border-end px-2" style={{ width: '20%' }}>
                                            Kids
                                        </div>
                                        <div className="d-flex align-items-center border-end px-2" style={{ width: '40%' }}>
                                            <input type={'text'} className='form-control' placeholder="17" />
                                        </div>
                                        <div className="d-flex align-items-center border-end px-2" style={{ width: '40%' }}>
                                            <input type={'text'} className='form-control' placeholder="18" />
                                        </div>
                                    </Col>
                                </Row>}
                                <Row className="px-1">
                                    <hr />
                                    <Col md={12} className='d-flex pb-1'>
                                        <div className="d-flex align-items-center border-end px-2" style={{ width: '20%' }}>
                                        </div>
                                        <div className="d-flex align-items-center border-end px-2" style={{ width: '40%' }}>
                                            Total
                                        </div>
                                        <div className="d-flex align-items-center border-end px-2" style={{ width: '40%' }}>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                    <br />
                    <Row className="mb-2">
                        <Col xs={12} className="mb-2">
                            <h4><span style={{ borderBottom: "1px solid #7367f0", paddingBottom: "0.5rem", color: '#7367f0' }}>They commonly shop in these categories *</span></h4>
                        </Col>
                        {resData?.categories?.main_categories.map((main, mainKey) => {
                            return (
                                <Col key={mainKey} md={6}>
                                    <div className={`form-check mb-2 bg-${checkedMain.some(ele => ele.id === main.id) ? 'light-secondary' : 'white'}`}>
                                        <label htmlFor={`main-${main.id}`} className="form-check-label text-dark w-100 p-1">
                                            <input
                                                // {...register(`target.main-${main.id}`)} 
                                                onChange={e => handleChecked(e, 'main', main)} type="checkbox" id={`main-${main.id}`} className="form-check-input" /> {main.name}
                                        </label>
                                        <Row className="border-top border-bottom">
                                            {resData?.categories?.sub_categories.map((sub, subKey) => {
                                                if (sub.parent_id === main.id && checkedMain.some(ele => ele.id === sub.parent_id)) {
                                                    return (
                                                        <Col md={6} key={subKey} className="form-check border-start">
                                                            <label htmlFor={`sub-${sub.id}`} className="form-check-label text-dark w-100 p-1">
                                                                <input
                                                                    // {...register(`target.sub-${sub.id}`)}
                                                                    onChange={e => handleChecked(e, 'sub', sub)} type="checkbox" id={`sub-${sub.id}`} className="form-check-input" /> {sub.name}
                                                            </label>
                                                            <Row className="border-top border-bottom">
                                                                {resData.categories?.sub_type_categories.map((subType, subTypeKey) => {
                                                                    if (subType.parent_id === sub.id && checkedSub.some(ele => ele.id === subType.parent_id)) {
                                                                        return (
                                                                            <Col md={12} key={subTypeKey} className="form-check">
                                                                                <label htmlFor={`subType-${subType.id}`} className="form-check-label text-dark w-100 p-1">
                                                                                    <input
                                                                                        // {...register(`target.subType-${subType.id}`)}
                                                                                        onChange={e => handleChecked(e, 'subType', subType)} type="checkbox" id={`subType-${subType.id}`} className="form-check-input" /> {subType.name}
                                                                                </label>
                                                                            </Col>
                                                                        )
                                                                    }
                                                                })}
                                                            </Row>
                                                        </Col>
                                                    )
                                                }
                                            })}
                                        </Row>
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
                    {/* <Row>
                        {resData?.categories?.main_categories.map((parent, parentKey) => {
                            const children = { ...childRender }
                            const grandChildren = { ...grandChildRender }
                            return (
                                <Col key={parentKey} md={6} className="form-check mb-2" >
                                    <label htmlFor={`${parent.id}`} className="form-check-label p-1 w-100">
                                        <input onChange={e => {
                                            if (e.target.checked) {
                                                children[`parent-${parent.id}`] = resData?.categories?.sub_categories.filter(item => item.parent_id === parent.id)
                                            } else {
                                                delete children[`parent-${parent.id}`]
                                                delete grandChildRender[`child-${parent.id}`]
                                            }
                                            setChildRender(children)
                                            setGrandChildRender(grandChildRender)
                                        }} type="checkbox" id={`${parent.id}`} className="form-check-input" /> {parent.name}
                                    </label>
                                    <div className="border-start">
                                        {childRender[`parent-${parent.id}`]?.map((child, childKey) => {
                                            return (
                                                <div key={childKey} className="form-check">
                                                    <label htmlFor={`${child.id}`} className={`form-check-label p-2 w-100`}>
                                                        <input onChange={e => {
                                                            if (e.target.checked) {
                                                                grandChildren[`parent-${child.parent_id}`] = {...grandChildren[`parent-${child.parent_id}`]}
                                                                grandChildren[`parent-${child.parent_id}`][`child-${child.id}`] = resData?.categories?.sub_type_categories.filter(item => item.parent_id === child.id)
                                                            } else {
                                                                delete grandChildren[`parent-${child.parent_id}`][`child-${child.id}`]
                                                            }
                                                            setGrandChildRender(grandChildren)
                                                        }} type="checkbox" id={`${child.id}`} className="form-check-input" /> {child.name}
                                                    </label>
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                </Col>
                            )
                        })}
                    </Row> */}
                    <Row>
                        <Col xs={12} className="text-end">
                            <button className="btn btn-primary" type="submit">Next</button>
                        </Col>
                    </Row>
                </Container >
            </form>
        </>
    )
}

export default Target

