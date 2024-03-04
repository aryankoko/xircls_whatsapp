import toast from "react-hot-toast"
import $ from "jquery"
import { PermissionProvider } from "../../Helper/Context"
import { useContext } from "react"
import { SuperLeadzBaseURL, baseURL } from "../../assets/auth/jwtService"

export const imageValidation = (e) => {
    const maxSizeKB = 100 //Size in KB
    const maxSize = maxSizeKB * 1024 //File size is returned in Bytes
    const file_name = e.target.files[0].name.split('.').slice(0, -1).join('.')

    if (e.target.files[0].size > maxSize) {
        toast.error("File size is above 100KB")
        return false
    } else if (file_name.includes('.')) {
        toast.error("File name should not contain dot")
        return false
    } else if (file_name.includes(' ')) {
        toast.error("File name should not contain space.")
        return false
    } else {
        return true
    }
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0')
}

export function formatDate(date) {
    return `${date.getFullYear()}-${padTo2Digits(date.getMonth() + 1)}-${padTo2Digits(date.getDate())} ${padTo2Digits(date.getHours())}:${padTo2Digits(date.getMinutes())}:${padTo2Digits(date.getSeconds())}`
}

export const validateEmail = (email) => {

    const emailCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (emailCheck.test(email)) {
        return true
        // this is a valid email address
    } else {
        return false
        // invalid email
    }

}

export const xircls_url = "https://api.xircls.com/static"
export const ownUrl = "https://api.xircls.com/static"

export const formatNumberWithCommas = (number) => {
    let data
    try {
        data = Number(number).toLocaleString()
    } catch (error) {
        data = 0
    }
    return data
}

export const pageNo = [{ label: 10, value: 10 }, { label: 25, value: 25 }, { label: 50, value: 50 }, { label: 100, value: 100 }]

export const timelineName = {
    infiniti: {
        dashboard: "/merchant/dashboard/",
        is_plugin_installed: "/merchant/apps/",
        is_plan_purchased: "/plan_pricing/1/",
        is_company_created: "/merchant/company/profile/",
        is_outlet_created: "/merchant/campaign/outlet_profiling/",
        is_ret_offer_created: "/merchant/create_offers/?purpose=RET",
        is_acq_offer_created: "/merchant/create_offers/?purpose=ACQ",
        is_ret_offer_synced: "/merchant/offers/",
        is_acq_offer_synced: "/merchant/offers/"
    },
    superleadz: {
        dashboard: "/merchant/SuperLeadz/",
        is_plugin_installed: "/merchant/apps/",
        is_plan_purchased: "/merchant/SuperLeadz/joinus/",
        is_company_created: "/merchant/company/profile/",
        is_outlet_created: "/merchant/campaign/outlet_profiling/",
        is_offer_created: "/merchant/SuperLeadz/create_offers/",
        is_offer_synced: "/merchant/SuperLeadz/offers/",
        is_campaign_started: "/merchant/SuperLeadz/Themes/",
        is_campaign_completed: "/merchant/campaign/"
    },
    whatsapp: {
        is_business: "/merchant/whatsapp/business_creation/",
        // is_business: "/merchant/whatsapp/is_business/",
        is_project: "/merchant/whatsapp/is_business/",
        is_fb_verified: "/merchant/whatsapp/is_business/",
        is_campaign_started: "/merchant/whatsapp/is_template/"
    }
}

export const CompleteTimelineName = {
    infiniti: {
        dashboard: "/merchant/dashboard/",
        is_plugin_installed: "/merchant/apps/",
        is_plan_purchased: "/plan_pricing/1/",
        is_company_created: "/merchant/company/profile/",
        is_outlet_created: "/merchant/campaign/outlet_profiling/",
        is_ret_offer_created: "/merchant/create_offers/?purpose=RET",
        is_acq_offer_created: "/merchant/create_offers/?purpose=ACQ",
        is_ret_offer_synced: "/merchant/offers/",
        is_acq_offer_synced: "/merchant/offers/"
    },
    superleadz: {
        is_plugin_installed: "/merchant/SuperLeadz/",
        is_plan_purchased: "/merchant/SuperLeadz/billing/",
        is_campaign_started: "/merchant/SuperLeadz/all_campaigns/"
    // },
    // whatsapp: {
    //     is_plugin_installed: "/merchant/whatsapp/",
    //     is_plan_purchased: "/merchant/whatsapp/billing/",
    //     is_company_created: "/merchant/whatsapp/is_company_created/",
    //     is_outlet_created: "/merchant/whatsapp/is_outlet_created/",
    //     is_offer_created: "/merchant/whatsapp/is_offer_created/",
    //     is_offer_synced: "/merchant/whatsapp/is_offer_synced/",
    //     is_ret_offer_created: "/merchant/whatsapp/is_ret_offer_created/",
    //     is_acq_offer_created: "/merchant/whatsapp/is_acq_offer_created/",
    //     is_ret_offer_synced: "/merchant/whatsapp/is_ret_offer_synced/",
    //     is_acq_offer_synced: "/merchant/whatsapp/is_acq_offer_synced/",
    //     is_business: "/merchant/whatsapp/is_business/",
    //     is_project: "/merchant/whatsapp/is_project/",
    //     is_fb_verified: "/merchant/whatsapp/is_fb_verified/",
    //     is_template: "/merchant/whatsapp/is_template/",
    //     is_campaign_started: "/merchant/whatsapp/is_campaign_started/"
    }
}

export function validForm(validator, value) {
    console.log(validator.length)
    let isValid = true
    for (let i = 0; i < validator.length; i++) {
        const currentObject = validator[i]
        const fieldValue = value[currentObject.name]
        console.log(`${currentObject.id}_val`)

        const valueType = Array.isArray(fieldValue)
        console.log(valueType, "isArray")
        if (valueType) {
            if (fieldValue.length === 0) {
                $(`#${currentObject.id}_val`).html(currentObject.message)
                $(`input[name="${currentObject.id}"]`).focus()
                isValid = false
                break
            } else {
                $(`#${currentObject.id}_val`).html('')

                if (currentObject.type === "email") {
                    if (validateEmail(fieldValue)) {
                        console.log("validateEmail is true")
                    } else {
                        console.log("validateEmail is false")

                        $(`#${currentObject.id}_val`).html("Enter Valid Email id")
                        $(`input[name="${currentObject.id}"]`).focus()
                        isValid = false
                        break
                    }
                }
            }
        } else {

            if (!fieldValue) {
                $(`#${currentObject.id}_val`).html(currentObject.message)
                $(`input[name="${currentObject.id}"]`).focus()
                isValid = false
                // if (currentObject.type === "email") {
                //     if (validateEmail(fieldValue)) {
                //         console.log("validateEmail is true")
                //     } else {
                //         console.log("validateEmail is false")

                //         $(`#${currentObject.id}_val`).html(currentObject.message)
                //         $(`input[name="${currentObject.id}"]`).focus()
                //     }
                // }
                break
            } else {
                $(`#${currentObject.id}_val`).html('')
                console.log(currentObject.type, "typeof Object")

                if (currentObject.type === "email") {
                    if (validateEmail(fieldValue)) {
                        console.log("validateEmail is true")
                    } else {
                        console.log("validateEmail is false")

                        $(`#${currentObject.id}_val`).html("Please enter valid email ID")
                        $(`input[name="${currentObject.id}"]`).focus()
                        isValid = false
                        break
                    }
                }

                // console.log('Some fields are empty')
            }
        }

        // (empty string, empty array, false, null, undefined) covered ths all
    }


    return isValid
}

// $('.make_capitail').on('keyup', function() {
//     const $this = $(this)
//     const val = $this.val()

//     val = val.substr(0, 1).toUpperCase() + val.substr(1)
//     $this.val(val)
// });

export function getCurrentOutlet() {
    const { userPermission } = useContext(PermissionProvider)

    const campaignData = userPermission?.multipleDomain?.filter((cur) => cur?.api_key === userPermission?.apiKey)

    return campaignData
}

export const dashboardURL = {
    infiniti: "/merchant/dashboard/",
    superleadz: "/merchant/SuperLeadz/",
    referral: "/merchant/Referral/",
    flash_accounts: "/merchant/Flash_Accounts/",
    product_review: "/merchant/product-review/",
    oh_my_customer: "/merchant/oh-my-customer/",
    otp_verification: "/merchant/apps/",
    crm: "/merchant/customers/",
    whatsapp: "/merchant/whatsapp/"
}

export function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' // Letters
    const numbers = '0123456789' // Numbers

    const randomLetter = () => characters.charAt(Math.floor(Math.random() * characters.length))
    const randomNumber = () => numbers.charAt(Math.floor(Math.random() * numbers.length))

    const randomString = randomNumber() + randomLetter() + randomLetter()
    return randomString
}

export const purpose = [
    { label: 'Increase brand recall', value: 'Increase brand recall', id: "1" },
    { label: 'Increase sales', value: 'Increase sales', id: "2" },
    { label: 'Increase registered users', value: 'Increase registered users', id: "3" },
    { label: 'Build high-quality email lists', value: 'Build high-quality email lists', id: "4" }
]

export const strategy = [
    { label: 'Newsletter Subscription', value: 'Newsletter Subscription', purpose_id: ["1", "3"], id: "1" },
    { label: 'Birthday Incentives', value: 'Birthday Incentives', purpose_id: ["1", "2", "3", "4"], id: "2" },
    { label: 'Sign-up Only', value: 'Sign-up Only', purpose_id: ["3"], id: "3" },
    { label: 'Membership', value: 'Membership', purpose_id: ["3"], id: "4" },
    { label: 'Gender Classification', value: 'Gender Classification', purpose_id: ["3", "4"], id: "5" }
]

export const Tone = [
    { label: 'Direct', value: 'Direct', strategy_id: ["3", "5"], id: "1" },
    { label: 'Casual/Chatty', value: 'Casual/Chatty', strategy_id: ["3", "5"], id: "2" },
    { label: 'Sophisticated', value: 'Sophisticated', strategy_id: ["3", "1"], id: "3" },
    { label: 'Urgent', value: 'Urgent', strategy_id: ["3", "4", "1"], id: "4" },
    { label: 'Incentivizing', value: 'Incentivizing', strategy_id: ["4"], id: "5" },
    { label: 'Enticing', value: 'Enticing', strategy_id: ["4", "5", "1"], id: "6" },
    { label: 'Enthusiastic', value: 'Enthusiastic', strategy_id: ["4", "2", "5", "1"], id: "7" },
    { label: 'Mysterious', value: 'Mysterious', strategy_id: ["4", "2"], id: "8" },
    { label: 'Warm', value: 'Warm', strategy_id: ["2", "1"], id: "9" },
    { label: 'Complimentary', value: 'Complimentary', strategy_id: ["2"], id: "10" },
    { label: 'Astrological', value: 'Astrological', strategy_id: ["2"], id: "11" },
    { label: 'Privacy-Focused', value: 'Privacy-Focused', strategy_id: ["5"], id: "12" }
]

export const affiliateTracking = (aft_no) => {

    fetch(`${SuperLeadzBaseURL}/protein`)
        .then((data) => data.json())
        .then((resp) => {
            console.log(resp)
            const form_data = new FormData()
            form_data.append("aft_no", aft_no)
            form_data.append("ip_address", resp?.ip_address)
            form_data.append("link", location.pathname)

            fetch(`${baseURL}/affiliate/create_affiliate_click/`, {
                method: "POST",
                body: form_data
            })
                .then((result) => {
                    console.log(result)
                })
                .catch((error) => {
                    console.log(error)
                })

        })
        .catch((error) => {
            console.log(error)
        })

}