import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import Footer from '@src/views/main/utilities/footer/Footer'

export default function TermsPage() {

  const policyData = [
    {
      title: "Record of Revisions",
      desc: (
        <>
          1st Revision: 07/09/2018
          <br />
          2nd Revision: 30/12/2019
          <br />
          3rd Revision: 31/07/2022
        </>
      )
    },
    {
      title: "Terms of Use",
      desc: (
        <>
          Welcome to XIRCLS. The XIRCLS.com website, mobile app, services and network are operated by ALTISSADVANCE TECH PVT. LTD. (collectively, "XIRCLS") and its corporate affiliates (collectively, "us", "we").
          <br />
          <br />
          By accessing or using XIRCLS, you (the "User") signify that you have read, understood and agreed to be bound by these Terms of Use ("Terms of Use" or "Agreement" or "Terms & Conditions"), whether or not you are a registered member of XIRCLS. We reserve the right at our sole discretion, to change, modify, add, or delete portions of these Terms of Use at any time without further notice. We will post the changes to these Terms of Use on this page and will indicate at the top of this page the date these terms were last revised. Your continued use of the Service or the Site or the App after any such changes constitutes your acceptance of the new Terms of Use. If you do not agree to abide by these, or any future Terms of Use, do not use or access (or continue to use or access) the Service or the Site or the App. It is your responsibility to regularly check the Site or the App to determine if there have been changes to these Terms of Use and to review such changes.
          <br />
          <br />
          Please read these terms of use carefully as they contain important information regarding your legal rights, remedies and obligations. These include various limitations and exclusions, and a dispute resolution clause that governs how disputes will be resolved.
        </>
      )
    },
    {
      title: "Use of the XIRCLS Software",
      desc: (
        <>You may use XIRCLS software solely for the purposes of enabling you to use the XIRCLS Services as provided by XIRCLS, and as permitted by the Conditions of Use, these XIRCLS Software Terms and any Terms. You may not incorporate any portion of the XIRCLS Software into your own programs or compile any portion of it in combination with your own programs, transfer it for use with another service, or sell, rent, lease, lend, loan, distribute or sub-license the XIRCLS Software or otherwise assign any rights to the XIRCLS Software in whole or in part. You may not use the XIRCLS Software for any illegal purpose. We may cease providing any XIRCLS Software and we may terminate your right to use any XIRCLS Software at any time. Your rights to use the XIRCLS Software will automatically terminate without notice from us if you fail to comply with any of these XIRCLS Software Terms, the Conditions of Use or any other Terms. Additional third party terms contained within or distributed with certain XIRCLS Software that are specifically identified in related documentation may apply to that XIRCLS Software (or software incorporated with the XIRCLS Software) and will govern the use of such software in the event of a conflict with these Conditions of Use. All software used in any XIRCLS Service is the property of XIRCLS and/or its affiliates or its software suppliers and protected by laws of India including but not limited to any other applicable copyright laws.</>
      )
    },
    {
      title: "Use of Third Party Services",
      desc: (
        <>When you use XIRCLS Software, you may also be using the services of one or more third parties, such as a wireless carrier or a mobile platform provider. Your use of these third party services may be subject to separate policies, terms of use, and fees of these third parties.</>
      )
    },
    {
      title: "Sign Up/Registration/Account",
      desc: (
        <>
          You will need to register with us to use XIRCLS. In return for allowing you to use XIRCLS and benefiting from our services, you agree that any information you provide us about yourself at any time will be true, accurate, current and complete and that you will ensure that this information is kept accurate and up to date. If incorrect information is supplied, any contractual obligation XIRCLS has is immediately null and void. It must be noted that XIRCLS is a platform for businesses and you can register your business/organization/society/community with XIRCLS only if it is registered with and under the laws of the Government of India.
          <br />
          <br />
          If you use the website, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer to prevent unauthorised access to your account. You agree to accept responsibility for all activities that occur under your account or password. You should take all necessary steps to ensure that the password is kept confidential and secure and should inform us immediately if you have any reason to believe that your password has become known to anyone else, or if the password is being, or is likely to be, used in an unauthorised manner. Please ensure that the details you provide us with are correct and complete and inform us immediately of any changes to the information that you provided while registering. You can access and update much of the information you provided us within the 'Login' area of the website. You agree and acknowledge that you will use your account on the website to purchase products only for your business purposes. XIRCLS reserves the right to refuse access to the website, terminate accounts, remove or edit content at any time without notice to you.</>
      )
    },
    {
      title: "Conditions of Registration",
      desc: (
        <>
          By registering for or using the Services, you represent and warrant that:
          <ul>
            <li>You are eighteen (18) years of age or older. The Services are intended solely for Users who are eighteen (18) years of age or older. Any registration, use of, or access to the Services, by anyone under eighteen (18) is unauthorized and is a violation of this Agreement.</li>
            <li>If you use the Services on behalf of another party, you agree that you are authorized to bind such other party to this Agreement and to act on such other party’s behalf with respect to any actions you take in connection with the Services.</li>
            <li>It is your responsibility to provide accurate, current, and complete information on the registration forms, including a valid email address. If there is ever an abuse issue or we need to contact you, we will use the primary email address we have on file. It is your responsibility to ensure that the contact information for your account is accurate, correct, and complete at all times. We are not responsible for any lapse in the Services, including without limitation, any lapsed services due to outdated contact information. If you need to verify or change your contact information, please contact our sales team via email or update your contact information through our support system. Providing false contact information of any kind may result in the termination of your account.</li>
            <li>You agree to be fully responsible for all use of your account and for any actions that take place through your account. It is your responsibility to maintain the confidentiality of your password and other information related to the security of your account.</li>
          </ul>
        </>
      )
    },
    {
      title: "Company Content",
      desc: (
        <>Except for User Content (as defined below), all content available through the Services, including designs, text, graphics, images, video, information, software, audio and other files, and their selection and arrangement, and all software used to provide the Services (collectively, “Company Content”), are the proprietary property of the Company or the Company’s licensors. Company Content may not be modified, copied, distributed, framed, reproduced, republished, downloaded, scraped, displayed, posted, transmitted, sold or exploited for any purpose in any form or by any means, in whole or in part, other than as expressly permitted in this Agreement. You may not, directly or indirectly, reverse engineer, decompile, disassemble or otherwise attempt to derive source code or other trade secrets from any Company Content. Any use of Company Content, other than as specifically authorized herein, is prohibited and will automatically terminate your rights to use the Services and any Company Content. All rights to use Company Content that are not expressly granted in this Agreement are reserved by the Company and the Company’s licensors.        </>
      )
    },
    {
      title: "E-Platform for Communication",
      desc: (
        <>
          You agree, understand and acknowledge that the website is an online platform that enables you to purchase products listed on the website at the price indicated therein at any time from any location. You further agree and acknowledge that XIRCLS is only a facilitator and is not and cannot be a party to or control in any manner any offers/messages on the website. Accordingly, communication on the website between you and other businesses/merchants on XIRCLS shall be a strictly bipartite contract between you and other merchants.</>
      )
    },
    {
      title: "Your Conduct",
      desc: (
        <>
          You must not use the website in any way that causes, or is intended or likely to cause, the website or access to it to be interrupted, damaged, or impaired in any way. You understand that you, and not XIRCLS, are responsible for all electronic communications and content sent from your computer to us, and you must use the website for lawful purposes only. You must not use the website for any of the following:
          <ul>
            <li>For fraudulent purposes, or in connection with a criminal offense or other unlawful activity.</li>
            <li>To send, use, or reuse any material that does not belong to you; or is illegal, offensive (including but not limited to material that is sexually explicit content or which promotes racism, bigotry, hatred, or physical harm), deceptive, misleading, abusive, indecent, harassing, blasphemous, defamatory, libelous, obscene, pornographic, paedophilic, or menacing; ethnically objectionable, disparaging, or in breach of copyright, trademark, confidentiality, privacy, or any other proprietary information or right; or is otherwise injurious to third parties; or relates to or promotes money laundering or gambling; or is harmful to minors in any way; or impersonates another person; or threatens the unity, integrity, security, or sovereignty of India or friendly relations with foreign States; or objectionable or otherwise unlawful in any manner whatsoever; or which consists of or contains software viruses, political campaigning, commercial solicitation, chain letters, mass mailings or any "spam."</li>
            <li>To intend to and/or cause annoyance, inconvenience, or needless anxiety.</li>
          </ul>
        </>
      )
    },
    {
      title: "No Reverse Engineering",
      desc: (
        <>
          You may not, and you will not encourage, assist, or authorize any other person to copy, modify, reverse engineer, decompile or disassemble, or otherwise tamper with the XIRCLS Software, whether in whole or in part, or create any derivative works from or of the XIRCLS Software.
        </>
      )
    },
    {
      title: "Updates",
      desc: (
        <>
          In order to keep the XIRCLS Software up-to-date, we may offer automatic or manual updates at any time and without notice to you.
        </>
      )
    },
    {
      title: "Subscriptions & Payments",
      desc: (
        <>
          The purchased Service Subscription start date will be the day after the expiry of the 14-Day Free Trial period for all subscriptions made during the Trial Period.
        </>
      )
    },
    {
      title: "Payments & Billing",
      desc: (
        <>All our plans have to be purchased in advance, before the selected period begins. We reserve full right to suspend Services to you in case any amount owed by you for our services is 30 or more days overdue.</>
      )
    },
    {
      title: "Taxes",
      desc: (
        <>
          You shall be responsible for the payment of all fees/costs/charges associated with the purchase of products from us, and you agree to bear any and all applicable taxes, including but not limited to GST, VAT, duties, and cesses, etc.
          <br />
          <br />
          Our primary fees do not include any taxes, levies, duties. Goods and Services Tax of India (GST) will be charged separately at the prevalent rate at the time of collecting payment/generating invoice. We mention Central and State GST separately on our invoice.
          <br />
          <br />
          You are responsible for paying all taxes associated with your purchases hereunder. We have a legal obligation to pay or collect Taxes for which you are responsible, and thus, we will invoice you both our primary fees and taxes mentioned, separately, and we will collect that amount that is due to the Government of India and to the State of Maharashtra or to any other state that we have our primary office in and are responsible for paying taxes in that state.
        </>
      )
    },
    {
      title: "Refund / Cancellation Policy",
      desc: (
        <ol className='d-flex flex-column  gap-2'>
          <li>XIRCLS charges and collects in advance for the use of its collaborative marketing SaaS. All services rendered are non-refundable.</li>
          <li>To request a refund of unutilized funds in your XIRCLS wallet, stop any active XIRCLS campaigns and email a notice to support@xircls.com or inform your XIRCLS representative.<br /> note: we do not refund funds from promotional offers.</li>
          <li>We'll initiate a refund to your bank account or credit card associated with your XIRCLS account.</li>
          <li><strong>Processing time:</strong> Refunds take 2 weeks for XIRCLS to process, and additional time for your credit card company to process.</li>
          <li>Refunds can take up to 10 weeks if you paid by a bank account outside India, and an additional 10 business days for your bank or credit card company to credit the refund to your account, depending on their own processes.<br />(Please contact us on support@xircls.com if it takes longer than 12 weeks)</li>
          <li>If you paid by money transfer, we'll ask for your bank account details to process the refund.
            Even after you receive your refund, your outlet will remain live on the XIRCLS network for companies to consider you for future marketing collaborations. To take your outlet off the network, please deactivate your outlet. To cancel your account completely, please email support@xircls.com or contact your XIRCLS representative.
            <br />
            In rare instances and only within 7 days of your purchase of a XIRCLS plan, if due to technical difficulties, platform incompatibilities, or other unforeseen circumstances, XIRCLS does not function in/for your organization, we may issue a full or partial refund. However, such decisions will be at our discretion only, and we have every right to refuse such requests.
            <br />
            If we do consider providing you a refund, we require that you provide all the necessary information and reasons for asking for a refund. We will verify these reasons by asking you further questions, or by trying to simulate the issues on our systems/networks, before making a final decision to provide a refund partially or in full.</li>
          <li>If we agree that your request for a refund is reasonable, and if your request is made within 7 days of purchase, we will require you to send us an email from the email address that is associated with your XIRCLS account.</li>
          <li>It is your sole responsibility to ensure that all refund-related communication from your company reaches us within 7 days of purchase. XIRCLS will not be responsible for any lost, delayed, or misdirected mail or email, or other communication system delays that prevent us from receiving your communication, and therefore prevent us from processing your refund request.</li>
          <li>We don't offer refunds in these cases:
            <ul>
              <li>You have money left over in your account from a promotional code</li>
              <li>Your campaign is still active</li>
              <li>You have an outstanding balance that you still need to pay</li>
            </ul>
          </li>
          <li>There is no cancellation policy.</li>
        </ol>
      )
    },
    {
      title: "Our Responsibilities",
      desc: (
        <ul className='d-flex flex-column  gap-2'>
          <li>
            <strong className='main-heading'>Service:</strong><br />
            We will provide the Services as confirmed in the plan you purchase. XIRCLS is committed to providing standard support for the Purchased Services to you at no additional charge, and/or upgraded support if purchased. We will make commercially reasonable efforts to make our Purchased Services available 24 hours a day, 7 days a week, except for planned downtime and any unavailability caused by circumstances beyond our reasonable control, including, for example, an act of God, act of government, flood, fire, earthquake, civil unrest, act of terror, strike, or other labour problem, Internet service provider failure or delay, or denial of service attack.
          </li>
          <li>
            <strong className='main-heading'>Protection of Your Data:</strong><br />
            We will maintain administrative, physical, and technical safeguards for protection of the security, confidentiality, and integrity of your data. The safeguards will include measures for preventing access, use, modification, or disclosure of your data by our personnel except to provide the Purchased Services and prevent or address service or technical problems, and as compelled by law.
          </li>
          <li>
            <strong className='main-heading'>Our Employees:</strong><br />
            We will be responsible for the performance of our employees and their compliance with our obligations.
          </li>
        </ul>
      )
    },
    {
      title: "Beta Services",
      desc: (
        <>
          From time to time, we may make Beta Services available to you at no charge. You may choose to try such Beta Services or not at your sole discretion. Beta Services are intended for evaluation purposes and not for production use. These Services are not supported and may be stopped or withdrawn altogether without any notice or explanation.
        </>
      )
    },
    {
      title: "Eligibility",
      desc: (
        <>
          XIRCLS reserves the right to change any and all content, software, and other items used or contained on the Site and any Services and Platform Applications offered through the Site at any time without notice. Reference to any products, services, processes, or other information, by trade name, trademark, manufacturer, supplier, or otherwise, does not constitute or imply endorsement, sponsorship, or recommendation thereof, or any affiliation therewith, by XIRCLS.
        </>
      )
    },
    {
      title: "Copyright",
      desc: (
        <>
          All content included on XIRCLS, including but not limited to the XIRCLS logo, logos of XIRCLS Software Services, website design, text, graphics, audio clips, visual clips, logos, button icons, and the selection and arrangement thereof, is the property of XIRCLS or its content suppliers and is protected by Indian and international copyright laws. All software used on this website is the property of XIRCLS and is protected by Indian and international copyright laws. ALL RIGHTS ARE RESERVED. Permission is granted to electronically copy and print in hard copy portions of this website and app for the purposes of understanding or using this website as a resource. Any other use of materials on this website, including but not limited to reproduction for purposes other than those noted above, modification, distribution, transmission, broadcasting, republication, downloading or uploading without the prior written permission of XIRCLS is strictly prohibited.
        </>
      )
    },
    {
      title: "Trademarks",
      desc: (
        <>
          XIRCLS, the XIRCLS logo, logos of XIRCLS Software Services, and all page headers, custom graphics, and button icons are service marks, trademarks, and/or trade dress of XIRCLS. All other trademarks, product names, and company names or logos cited herein are the property of their respective owners. You are not permitted to use the XIRCLS Trademarks or Third-Party Trademarks without the prior written consent of XIRCLS or such third parties that may own the Trademarks.
        </>
      )
    },
    {
      title: "Content Supplied by Users",
      desc: (
        <>
          This provision does not relate to any personal data that you submit which will be dealt with in accordance with the provisions of our ‘Privacy Policy’ which is part of these Terms and Conditions.
          <br />
          <br />
          If you send communications or materials to this website by electronic mail or otherwise, concerning any comments, questions, suggestions, or the like, all such communications are, and will be treated as non-confidential and non-proprietary. Thus, you give up any claim that any use of such material infringes any of your rights, including without limitation moral rights, proprietary rights, or any other right, including the right to approve the way in which XIRCLS uses such material. Any material submitted to this website or app may be adapted, broadcast, changed, copied, disclosed, licensed, performed, posted, published, sold, transmitted, or used by XIRCLS anywhere in the world, in any medium, in perpetuity.
        </>
      )
    },
    {
      title: "Privacy Policy",
      desc: (
        <>
          We strive to ensure that personal information collected by XIRCLS is secure and is maintained in conformity with current industry standards. Such personal information resides on a secure server that only selected Company representatives have access to via password, thereby preventing unauthorized parties from viewing such information when transmitted to us. Further, credit card transactions and order/service fulfillment are handled by established third-party banking, processing agents, and distribution institutions, and XIRCLS, nor its authorized distributor, store any information with respect to your credit/debit card/net banking details. Such third parties shall receive the information needed to verify and authorize your credit card or other payment information and to process and ship your order.
        </>
      )
    },

    {
      title: "Use of XIRCLS",
      desc: (
        <>You agree that you will only use XIRCLS in a way which is consistent with the Terms and Conditions and which complies with applicable laws and regulations. In particular, you agree that you will not use XIRCLS to upload or send any material which contains software viruses or other codes, files or programs designed or intended to interrupt, destroy or limit the functionality of any computer software, hardware or telecommunications equipment or in any other manner which would interfere with or disrupt XIRCLS or any other business, organisation or personal entity anywhere.</>
      )
    },
    {
      title: "Termination",
      desc: (
        <>
          XIRCLS may terminate your account, delete your profile, and any content or information that you have posted on XIRCLS or through any Platform Application and/or prohibit you from using or accessing the Service or the Site and the App or any Platform Application (or any portion, aspect, or feature of the Service or the Site or any Platform Application) for any reason, or no reason, at any time in its sole discretion.
          <br /><br />
          XIRCLS reserves the right to delete or disable users for any inappropriate activity or content without any notice. XIRCLS does not take any responsibility for the content uploaded by the users. The users of XIRCLS will be responsible for their content. If anyone has any objections to any content, they should contact support@xircls.com with a description of the content and their concerns, and if required, XIRCLS reserves the right to change the terms and conditions at any time without prior notice.
          <br /><br />
          We reserve the right to modify or discontinue XIRCLS for any reason and without notice, as required.
        </>
      )
    },
    {
      title: "Availability",
      desc: (
        <>
          XIRCLS will use all reasonable endeavors to ensure that its services are fully operational at all times. However, we cannot guarantee that the medium of discharging the services (e.g., website, app) will be fault-free. In particular, access to XIRCLS may be interrupted or restricted to allow for emergency or routine repairs or maintenance to be carried out or for the introduction of new facilities or services.
          <br /><br />
          Further, by using XIRCLS, you acknowledge and agree that the Internet uses elements and relies upon services, input, and facilities that are not within the control of XIRCLS. If XIRCLS is totally or partially prevented or delayed in the performance of any of its obligations in providing a particular service, such a situation will constitute a ‘force majeure,’ and XIRCLS shall be excused from performance for as long as such a situation endures.
          <br /><br />
          For the purposes of these Terms and Conditions, the term ‘force majeure’ shall be deemed to include any cause affecting the performance by XIRCLS of its obligations arising from or attributable to acts, events, omissions, or accidents beyond the reasonable control of XIRCLS. In particular, but not by way of limitation, shall include strikes, lock-outs, other industrial action, actual or threatened terrorist action, civil commotion, riot, crowd disorder, invasion, war, threat or preparation for war, fire, technical or power failure, software, hardware or telecommunication or other network failures, interruptions, disruptions or malfunctions, explosions, storm, flood, earthquake, subsidence, structural damage, epidemic, or other natural or physical disaster, any legislation, regulation, rule or ruling of government, court, or any competent authority.
        </>
      )
    },
    {
      title: "Indemnification",
      desc: (
        <>You agree to indemnify, defend and hold XIRCLS and all of their associate companies, their directors, employees, information providers, licensors and licensees, officers and partners, (collectively, the "Indemnified Parties") harmless from and against any and all liability and costs (including, without limitation, legal fees and costs), incurred by the Indemnified Parties in connection with any claim arising out of any breach by you of these Terms and Conditions. You will co-operate as fully and as reasonably required by XIRCLS as the case may be, in defense of any claim. XIRCLS reserves the right to assume the exclusive defense and control of any matter and you shall not in any event settle any matter without the written consent of XIRCLS.</>
      )
    },
    {
      title: "Alterations",
      desc: (
        <>We may amend our website, our software code, applications and our services in any way and at any time with or without notice to you.        </>
      )
    },
    {
      title: "Miscellaneous",
      desc: (
        <>The Terms of Use together with our Privacy Policy contain the full and complete understanding between XIRCLS and you. No advice or information, whether oral or written, obtained by you through or from the website or from any conversations with our staff will operate to vary these terms of use. The Terms of Use together with our Privacy Policy and all contracts made under them shall also continue for the benefit of any successors and assignees of XIRCLS.
        </>
      )
    },
    {
      title: "Email Service",
      desc: (
        <>In situations where XIRCLS gives you the option to subscribe to its email service which will update you with news or information which it considers to be of interest to you, your use of the content received through the email service will be subject to these Terms and Conditions.
        </>
      )
    },
    {
      title: "Warranties",
      desc: (
        <>
          XIRCLS makes no warranties or representations about the accuracy or completeness of XIRCLS’ content or the content of any site, app, or external sites. XIRCLS and the materials, information, services, and products on XIRCLS, including, without limitation, text, graphics, and links, are provided "as is" and without warranties of any kind, whether express or implied. To the fullest extent permissible pursuant to applicable law, XIRCLS disclaims all warranties, express or implied, including, but not limited to, implied warranties of merchantability and fitness for a particular purpose, non-infringement, freedom from computer virus, and warranties arising from the course of dealing or course of performance.
          <br /><br />
          XIRCLS does not represent or warrant that the functions contained in XIRCLS will be uninterrupted or error-free, that defects will be corrected, or that XIRCLS or the server/s that make the XIRCLS Software available are free of viruses or other harmful components. XIRCLS does not make any warranties or representations regarding the use of the materials on XIRCLS in terms of their completeness, correctness, accuracy, adequacy, usefulness, timeliness, reliability, or otherwise.
        </>
      )
    },
    {
      title: "Limitation of Liability",
      desc: (
        <>In no event shall XIRCLS be liable for any direct, indirect, special, punitive, incidental, exemplary or consequential damages, or any damages whatsoever, even if XIRCLS has been previously advised of the possibility of such damages, whether in an action under contract, negligence, or any other theory, arising out of or in connection with the use, inability to use, or performance of the information, services, products, and materials available from XIRCLS. These limitations shall apply notwithstanding any failure of essential purpose of any limited remedy. Because some jurisdictions do not allow limitations on how long an implied warranty lasts, or the exclusion or limitation of liability for consequential or incidental damages, the above limitations may not apply to you.</>
      )
    },
    {
      title: "Losses",
      desc: (
        <>We will not be responsible for any business loss (including loss of profits, revenue, contracts, anticipated savings, data, goodwill or wasted expenditure) or any other indirect or consequential loss that is not reasonably foreseeable to both you and us when you commenced using the website.
        </>
      )
    },
    {
      title: "Disclaimer",
      desc: (
        <>
          You acknowledge and undertake that you are accessing the services on the XIRCLS website and transacting at your own risk, using your best and prudent judgment before entering into any transactions through the website. We shall neither be liable nor responsible for any actions or inactions of sellers nor any breach of conditions, representations, or warranties by businesses/merchants and hereby expressly disclaim any and all responsibility and liability in that regard. We shall not mediate or resolve any dispute or disagreement between you and other businesses/merchants.
          <br /><br />
          We further expressly disclaim any warranties or representations (express or implied) in respect of quality, suitability, accuracy, reliability, completeness, timeliness, performance, safety, merchantability, fitness for a particular purpose, or legality of the products listed or displayed or transacted or the content (including product or pricing information and/or specifications) on the XIRCLS website. While we have taken precautions to avoid inaccuracies in content, this website, all content, information (including the price of products), software, products, services, and related graphics are provided as is, without warranty of any kind. We do not implicitly or explicitly support or endorse the sale or purchase of any products or product information on the website by other businesses/merchants. At no time shall any right, title, or interest in the communication or products sold through or displayed through XIRCLS vest with XIRCLS, nor shall XIRCLS have any obligations or liabilities in respect of any transactions on the websites of businesses/merchants listed on XIRCLS.
        </>
      )
    },
    {
      title: "Waiver",
      desc: (
        <>If you breach these conditions and we take no action, we will still be entitled to use our rights and remedies in that same situation at any other time deemed appropriate by us or any other situation where you breach these conditions.
        </>
      )
    },
    {
      title: "Governing Law",
      desc: (
        <>These Terms and Conditions and any contracts made under them are governed by and shall be governed and construed in accordance with the laws of India whose courts shall be courts of Mumbai Jurisdiction. We make no representation that materials on XIRCLS are appropriate or available for use in other locations, and that accessing them from territories where their contents are illegal or prohibited. Customers who access XIRCLS from locations outside India do so at their own risk and on their own initiative and are responsible for compliance with local laws, to the extent that any local laws are applicable. Nothing in these Terms shall in any way be deemed to restrict or affect your statutory rights under Indian law.
        </>
      )
    }
  ]

  return (
    <div style={{ background: "#fff" }} >
      {/* <Navbar /> */}

      {/* section 1 */}
      <div className=' text-center  justify-content-center mt240'>
        <h1 className='display-1 text-center main-heading fw-bolder  '>
          Terms Of Use</h1>
      </div >

      <Row className='mt100 justify-content-center '>
        <Col xs="10" md="10" xl="10"  >
          <div className='  px-0  d-flex flex-column  gap-5 '>
            {
              policyData.map((data, index) => (
                <div className='justify-content-start  ' key={index}>
                  <div className=''>
                    <h1 className='main-heading display-6 fw-bolder  mb-0'>{data.title}</h1>
                    <h2 className='text-black lh-32 mt-1'>{data.desc}</h2>
                  </div>
                </div>
              ))}
          </div>
        </Col >
      </Row >

      <hr className='mt180' />

      {/* footer */}
      < Footer />
    </div >
  )
}

