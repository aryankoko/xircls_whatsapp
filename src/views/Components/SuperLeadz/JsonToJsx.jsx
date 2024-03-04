import React from 'react'
import { Download, X } from 'react-feather'
import ReturnOfferHtml from '../../NewCustomizationFlow/ReturnOfferHtml'

const JsonToJsx = ({ renderObj, isMobile, scale, index = 0 }) => {
    const findObj = renderObj[`${isMobile ? "mobile_" : ""}pages`]
    // console.log(findObj, "findObj")
    return (
        <div className='setDefault'>
            <style>{`
                p {
                    margin: 0px !important;
                }
                .setDefault {
                    all: initial;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    scale: ${scale ? scale : "1"};
                }
            `}</style>
            <div style={{ position: "relative", width: renderObj?.backgroundStyles?.[`${isMobile ? "mobile_" : ""}main`].width, maxWidth: isMobile ? renderObj?.backgroundStyles?.[`${isMobile ? "mobile_" : ""}main`].maxWidth : renderObj?.backgroundStyles?.[`${isMobile ? "mobile_" : ""}main`].width, maxHeight: "100%", minHeight: renderObj?.backgroundStyles?.[`${isMobile ? "mobile_" : ""}main`].minHeight, marginTop: renderObj?.backgroundStyles?.[`${isMobile ? "mobile_" : ""}main`].marginTop, marginRight: renderObj?.backgroundStyles?.[`${isMobile ? "mobile_" : ""}main`].marginRight, marginBottom: renderObj?.backgroundStyles?.[`${isMobile ? "mobile_" : ""}main`].marginBottom, marginLeft: renderObj?.backgroundStyles?.[`${isMobile ? "mobile_" : ""}main`].marginLeft }}>
                <X size={renderObj?.crossButtons?.[`${isMobile ? "mobile_" : ""}main`]?.width} height={renderObj?.crossButtons?.[`${isMobile ? "mobile_" : ""}main`]?.height} color={renderObj?.crossButtons?.[`${isMobile ? "mobile_" : ""}main`]?.color} style={{ position: "absolute", inset: "0px 0px auto auto", zIndex: "350", backgroundColor: renderObj?.crossButtons?.[`${isMobile ? "mobile_" : ""}main`]?.backgroundColor, borderRadius: renderObj?.crossButtons?.[`${isMobile ? "mobile_" : ""}main`]?.borderRadius, padding: `3px`, marginBottom: renderObj?.crossButtons?.[`${isMobile ? "mobile_" : ""}main`]?.marginBottom, transform: `translateX(${renderObj?.crossButtons?.[`${isMobile ? "mobile_" : ""}main`]?.translateX}) translateY(${renderObj?.crossButtons?.[`${isMobile ? "mobile_" : ""}main`]?.translateY})` }} onClick={(e) => {
                    e.stopPropagation()
                }} />
                <div id="dropZoneParent" className="pop-up" style={{ position: 'relative', zIndex: '300', overflow: "visible", ...renderObj?.backgroundStyles?.[`${isMobile ? "mobile_" : ""}main`], backgroundColor: renderObj?.backgroundStyles?.[`${isMobile ? "mobile_" : ""}main`]?.backgroundColor, backgroundImage: renderObj?.backgroundStyles?.[`${isMobile ? "mobile_" : ""}main`]?.backgroundImage, width: "100%", maxWidth: isMobile ? "100%" : renderObj?.backgroundStyles?.[`${isMobile ? "mobile_" : ""}main`]?.width, marginTop: "0px", marginRight: "0px", marginBottom: "0px", marginLeft: "0px" }}>
                    {findObj && findObj[index]?.values?.map((cur, key) => {
                        return <div style={{ ...cur?.style, display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} key={key}
                            id={`${"main"}-${key}-parent-grandparent`}
                        >
                            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "center", alignItems: "stretch", position: "relative", width: "100%", zIndex: "1" }}
                            >
                                {
                                    cur?.elements?.map((curElem, i) => {
                                        return (
                                            <div style={{ ...curElem?.style, position: "relative", width: isMobile ? "100%" : curElem?.style?.width }}
                                                id={`${"main"}-${key}-${curElem.positionType}-parent`}>
                                                {curElem?.element?.map((subElem, j) => {
                                                    switch (subElem?.type) {
                                                        case 'text':
                                                            // return <span contentEditable="true" className="text-secondary p-1 rounded-2 " style={{ fontSize: '14.4px', border: '1px solid black' }} onClick={(e) => makActive(e, cur)} >Text Element</span>
                                                            return (
                                                                <div id={`${"main"}-${key}-${curElem?.positionType}-${j}`} style={{ ...subElem?.style, width: "100%", position: "relative", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: subElem?.isInitialFont ? renderObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily }}>
                                                                    <div style={{ width: "100%" }} id={`textField-${key}-${curElem?.positionType}-${j}`} className="text-field" dangerouslySetInnerHTML={{ __html: subElem?.textValue }} />
                                                                    {/* <ReactQuill
                                                                                                                id={`textField-${key}-${curElem.positionType}-${j}`}
                                                                                                                style={{ width: '100%', color: "black", zIndex: "5" }}
                                                                                                                theme='bubble'
                                                                                                                // defaultValue={"Enter Text"}
                                                                                                                value={subElem.textValue}
                                                                                                                onChange={e => {
                                                                                                                    const dupText = [...colWise]
                                                                                                                    dupText[key].elements[i].element[j].textValue = e
                                                                                                                    setcolWise(dupText)
                                                                                                                }}
                                                                                                                modules={{
                                                                                                                    toolbar: [
                                                                                                                        [{ header: [1, 2, 3, 4, false] }],
                                                                                                                        ['bold', 'italic', 'underline'],
                                                                                                                        [{ size: [] }],
                                                                                                                        ['align', 'strike'],
                                                                                                                        [{ color: [] }],
                                                                                                                        [{ list: 'ordered' }, { list: 'bullet' }]
                                                                                                                    ]
                                                                                                                }}
                                                                                                                formats={[
                                                                                                                    'header',
                                                                                                                    'bold',
                                                                                                                    'italic',
                                                                                                                    'underline',
                                                                                                                    'size',
                                                                                                                    'align',
                                                                                                                    'strike',
                                                                                                                    'blockquote',
                                                                                                                    'color',
                                                                                                                    'list',
                                                                                                                    'bullet'
                                                                                                                ]} /> */}
                                                                    {/* <SunEditor
                                                                                                                setOptions={SunEditorConfig}
                                                                                                                id={`textField-${key}-${curElem.positionType}-${j}`}
                                                                                                                value={subElem.textValue || ''}
                                                                                                                onChange={(content) => {
                                                                                                                    const dupText = [...colWise]
                                                                                                                    dupText[key].elements[i].element[j].textValue = content
                                                                                                                    setcolWise(dupText)
                                                                                                                }}
                                                                                                            /> */}
                                                                </div>
                                                            )
                                                        case 'image':
                                                            // const imageSelector = document.getElementById("hidden-image-input")
                                                            if (subElem.src !== "") {
                                                                return (
                                                                    <div id={`${"main"}-${key}-${curElem?.positionType}-${j}`} draggable style={{ width: "100%", ...subElem?.style, position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>                                                                        
                                                                        <img
                                                                            className="img-fluid"
                                                                            src={subElem.src}
                                                                            alt={`Selected Image ${i}`}
                                                                            style={{ width: "100%" }}
                                                                        />
                                                                    </div>
                                                                )
                                                            // } else {
                                                            //     setCurrPosition({ ...currPosition, j })
                                                            //     // imageSelector.click()
                                                            //     triggerImage()
                                                            //     const dupArray = [...colWise]
                                                            //     dupArray[key].elements[i].element[j].src = "http://www.palmares.lemondeduchiffre.fr/images/joomlart/demo/default.jpg"
                                                            //     setcolWise([...dupArray])
                                                            }
                                                        case 'button':
                                                            return (
                                                                <div id={`${"main"}-${key}-${curElem?.positionType}-${j}`} draggable style={{ width: "100%", display: "flex", justifyContent: subElem?.style?.alignType, position: "relative", display: "flex", alignItems: "center" }}>
                                                                    
                                                                    <div style={{ ...subElem?.style, height: Number(subElem?.style?.height) === 0 ? "auto" : `${subElem?.style?.height}px`, display: "inline-flex", justifyContent: "center", alignItems: "center", fontFamily: subElem?.isInitialFont ? renderObj?.fontFamilies?.[subElem.textType] : subElem?.style?.fontFamily }} >
                                                                        <span onDragStart={e => e.stopPropagation()} id={`textField-${key}-${curElem?.positionType}-${j}`}>
                                                                            {/* <ReactQuill
                                                                                                                id={`textField-${key}-${curElem.positionType}-${j}`}
                                                                                                                style={{ width: '100%', color: "black", zIndex: "5" }}
                                                                                                                theme='bubble'
                                                                                                                // defaultValue={"Enter Text"}
                                                                                                                value={subElem.textValue}
                                                                                                                onChange={e => {
                                                                                                                    const dupText = [...colWise]
                                                                                                                    dupText[key].elements[i].element[j].textValue = e
                                                                                                                    setcolWise(dupText)
                                                                                                                }}
                                                                                                                modules={{
                                                                                                                    toolbar: [
                                                                                                                        [{ header: [1, 2, 3, 4, false] }],
                                                                                                                        ['bold', 'italic', 'underline'],
                                                                                                                        [{ size: [] }],
                                                                                                                        ['align', 'strike'],
                                                                                                                        [{ color: [] }],
                                                                                                                        [{ list: 'ordered' }, { list: 'bullet' }]
                                                                                                                    ]
                                                                                                                }}
                                                                                                                formats={[
                                                                                                                    'header',
                                                                                                                    'bold',
                                                                                                                    'italic',
                                                                                                                    'underline',
                                                                                                                    'size',
                                                                                                                    'align',
                                                                                                                    'strike',
                                                                                                                    'blockquote',
                                                                                                                    'color',
                                                                                                                    'list',
                                                                                                                    'bullet'
                                                                                                                ]} /> */}
                                                                            {/* <SunEditor
                                                                                                                    setOptions={SunEditorConfig}
                                                                                                                    
                                                                                                                    value={subElem.textValue || ''}
                                                                                                                    onChange={(content) => {
                                                                                                                        const dupText = [...colWise]
                                                                                                                        dupText[key].elements[i].element[j].textValue = content
                                                                                                                        setcolWise(dupText)
                                                                                                                    }}
                                                                                                                /> */}
                                                                            <div className="text-field" dangerouslySetInnerHTML={{ __html: subElem?.textValue }} />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        case 'input':
                                                            return (
                                                                <div id={`${"main"}-${key}-${curElem?.positionType}-${j}`} draggable style={{ width: "100%", display: "flex", justifyContent: subElem?.style?.alignType, position: "relative", alignItems: "center" }}>
                                                                    
                                                                    <div style={{ width: subElem?.style?.width }}>
                                                                        {subElem?.hasLabel && (<label style={{ color: subElem?.style?.color, fontFamily: subElem?.style?.fontFamily }}>{subElem?.labelText}</label>)}
                                                                        <input placeholder={subElem?.placeholder} type="text" style={{ ...subElem?.style, width: "100%" }} disabled />
                                                                    </div>
                                                                </div>
                                                            )
                                                        case 'offer': 
                                                        // console.log(renderObj?.selectedOffers, "offers")
                                                            return (
                                                                <>
                                                                    {
                                                                        renderObj?.selectedOffers?.map((ele, key) => {
                                                                            return (
                                                                                <>
                                                                                    <ReturnOfferHtml details={ele} key={key} theme={renderObj?.offerTheme} colors={renderObj?.offerProperties?.colors} />
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </>
                                                            )
                                                                
                                                    }
                                                })}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default JsonToJsx