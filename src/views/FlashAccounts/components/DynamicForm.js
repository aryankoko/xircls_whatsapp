import React from 'react'
import { Card, CardBody } from 'reactstrap'
import BasicEditor from '../../Components/Editor/BaseEditor'

const DynamicForm = ({data}) => {
  return (
    <div style={{ width: '630px', margin: '30px auto 0px', scale: '0.7' }}>
        <div className="cursor-pointer">
            <>
                
                <div className="previewSection">
                    <div
                        style={{
                        padding: "40px",
                        border: "solid 1px rgb(239, 239, 239)",
                        boxShadow: "1px 1px 13px 3px rgba(0,0,0,0.05)",
                        background: "white",
                        borderRadius: "10px",
                        width: "500px",
                        margin: "auto",
                        wordBreak: "break-word"
                        }}
                    >
                        <div>
                        <div
                            style={{
                            color: data?.["page_1"]?.heading_color,
                            marginTop: "0px",
                            fontSize: data?.["page_1"]?.heading_font_size,
                            fontWeight: "600",
                            lineHeight: "auto",
                            fontFamily: data?.["page_1"]?.primary_font
                            }}
                            className="cursor-pointer"
                        >
                            {data?.["page_1"]?.heading}
                        </div>
                        <div
                            style={{
                            fontSize: data?.["page_1"]?.sub_heading_font_size,
                            fontWeight: "300",
                            marginTop: 10,
                            color: data?.["page_1"]?.sub_heading_color,
                            lineHeight: "auto",
                            fontFamily: data?.["page_1"]?.secondary_font
                            }}
                            className="cursor-pointer"
                        >
                            {data?.["page_1"]?.sub_heading}
                        </div>
                        <div style={{ marginTop: 30, padding: "0 0px 0 0" }}
                            className="cursor-pointer">
                            <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "start",
                                fontFamily: data?.["page_1"]?.secondary_font
                            }}
                            >
                            <div htmlFor="" style={{ fontSize: 15, color: "rgb(91, 91, 91)" }}>
                                {data?.["page_1"]?.password}
                            </div>
                            <input
                                type="password"
                                placeholder={data?.["page_1"]?.password_placeHolder}
                                style={{
                                width: "100%",
                                border: "solid 1px rgb(185, 185, 185)",
                                borderRadius: 5,
                                fontSize: 14,
                                padding: "10px 20px",
                                marginTop: 5,
                                outline: "none",
                                color: "rgb(67, 67, 67)",
                                letterSpacing: 1,
                                cursor: "pointer"
                                }}
                                readOnly
                            />
                            </div>
                            {
                            data?.page_1?.reEnter ? <>
                                <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "start",
                                    marginTop: 20,
                                    fontFamily: data?.["page_1"]?.secondary_font
                                }}
                                >
                                <div htmlFor="" style={{ fontSize: 15, color: "rgb(91, 91, 91)" }}>
                                    {data?.["page_1"]?.confirm_password}
                                </div>
                                <input
                                    type="password"
                                    placeholder={data?.["page_1"]?.confirm_password_placeHolder}
                                    style={{
                                    width: "100%",
                                    border: "solid 1px rgb(185, 185, 185)",
                                    borderRadius: 5,
                                    fontSize: 14,
                                    padding: "10px 20px",
                                    marginTop: 5,
                                    outline: "none",
                                    color: "rgb(67, 67, 67)",
                                    letterSpacing: 1,
                                    cursor: "pointer"
                                    }}
                                    readOnly
                                />
                                </div>
                            </> : ''
                            }

                        </div>

                        {
                            data?.page_1?.opt_in_email === "email" && (
                            <>
                                <div
                                style={{
                                    fontFamily: data?.["page_1"]?.secondary_font,
                                    display: "flex",
                                    gap: "10px",
                                    alignItems: "center",
                                    justifyContent: "start",
                                    marginTop: "10px"
                                }}
                                className="cursor-pointer"
                                >
                                <input type="checkbox" id="preview_opt_in_checkbox" checked={data?.page_1?.email_check} />
                                <label htmlFor="preview_opt_in_checkbox">{data?.page_1?.label_text_email}</label>
                                </div>

                            </>
                            )
                        }

                        {
                            data?.page_1?.opt_in_sms === "sms" && (
                            <>
                                <div
                                style={{
                                    fontFamily: data?.["page_1"]?.secondary_font,
                                    display: "flex",
                                    gap: "10px",
                                    alignItems: "center",
                                    justifyContent: "start",
                                    marginTop: "10px"
                                }}
                                className="cursor-pointer"
                                >
                                <input type="checkbox" id="preview_opt_in_checkbox" checked={data?.page_1?.sms_check} />
                                <label htmlFor="preview_opt_in_checkbox">{data?.page_1?.label_text_sms}</label>
                                </div>
                            </>
                            )
                        }

                        {
                            data?.page_1?.opt_in_both === "both" && (
                            <>
                                <div
                                style={{
                                    fontFamily: data?.["page_1"]?.secondary_font,
                                    display: "flex",
                                    gap: "10px",
                                    alignItems: "center",
                                    justifyContent: "start",
                                    marginTop: "10px"
                                }}
                                className="cursor-pointer"
                                >
                                <input type="checkbox" id="preview_opt_in_checkbox" checked={data?.page_1?.both_check} />
                                <label htmlFor="preview_opt_in_checkbox">{data?.page_1?.label_text_both}</label>
                                </div>
                            </>
                            )
                        }

                        <div
                            style={{
                            display: "grid",
                            placeContent: "center",
                            padding: "10px 30px",
                            border: `solid 1px ${data?.["page_1"]?.button_color}`,
                            backgroundColor: data?.["page_1"]?.button_bg_color,
                            color: data?.["page_1"]?.button_color,
                            fontSize: "15px",
                            borderRadius: "5px",
                            margin: "auto",
                            marginTop: "25px",
                            cursor: "pointer",
                            fontFamily: data?.["page_1"]?.secondary_font
                            }}
                            className="cursor-pointer"
                        >
                            {data?.["page_1"]?.button_text}
                        </div>
                        <div
                            style={{
                            color: data?.["page_1"]?.heading_colorAf,
                            marginTop: "0px",
                            fontSize: data?.["page_1"]?.heading_font_sizeAf,
                            fontWeight: "600",
                            lineHeight: "auto",
                            fontFamily: data?.["page_1"]?.primary_fontAf,
                            marginTop: '20px'
                            }}
                        >
                            {data?.["page_1"]?.headingAf}
                        </div>
                        <div
                            style={{
                            fontSize: data?.["page_1"]?.sub_heading_font_sizeAf,
                            fontWeight: "300",
                            marginTop: 10,
                            color: data?.["page_1"]?.sub_heading_colorAf,
                            lineHeight: "auto",
                            fontFamily: data?.["page_1"]?.secondary_fontAf
                            }}
                        >
                            {data?.["page_1"]?.sub_headingAf}
                        </div>
                        </div>
                    </div>
                </div>
            </>

        </div>
    </div>
  )
}

export default DynamicForm