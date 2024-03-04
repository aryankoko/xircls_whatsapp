import React from 'react'
import FaqComponent from '@src/views/main/components/Faq/FaqComponent'
import Footer from '@src/views/main/utilities/footer/Footer'

export default function FaqFlash() {
    // faq data
    const faqData = [
        {
            q: "Are there any deposits or fees that I have to pay?",
            a: "There is no deposit, fee or investment of any kind. You can simply sign up and get going!"
        },
        {
            q: "Do I need to relocate? / Where is this opportunity based?",
            a: "There is no fixed location! You can be a XIRCLS Partner right where you are, ANYWHERE in the world."
        },
        {
            q: "Will I have to commit a fixed number of hours or meet any minimum sales targets?",
            a: "There is no time commitment. You decide the number of hours you want to put in! There are no minimum sales targets to be met. However, if there is no activity from your end for 60 days, your partner account access will be revoked."
        },
        {
            q: "Will you give me qualified leads to follow up on?",
            a: "We expect our partners to tap into their own network to identify & convert leads into sales."
        },
        {
            q: "Will I receive any training and/or support?",
            a: "Absolutely. All partners will be given online training & documentation. Our team will also offer assistance with sales queries, onboarding & integration issues during the first few months."
        },
        {
            q: "How are referrals tracked?",
            a: "Once you become a XIRCLS partner, you will receive access to our partner dashboard where you can manage your affiliate referral links and track performance. Our tracking cookie window is 30 days."
        },
        {
            q: "What information can I track about my referrals?",
            a: "You can track your total referrals and those who have successfully purchased a paid plan. For privacy reasons, you cannot track the revenue of a specific merchant."
        },
        {
            q: "What is the commission process?",
            a: "Your affiliate link has a 30-day cookie window, which is activated after someone clicks your link. If that person signs up, and ultimately becomes a paying subscriber, you'll earn a 20% commission in the month following the month where they subscribed. No commissions are given for referrals that don't purchase, request a refund, or have their payment rejected or charged back."
        },
        {
            q: "How will payouts work?",
            a: "Payouts happen on the 1st of the month, and will happen NET-45 i.e. you'll receive a payout on the 1st of the month 30-day refund policy. There is a minimum payout of $50 to receive your commissions. after at least 45 days have passed since your referral became a paying customer.This delay is to account for our"
        }
    ]
    return (
        <div style={{ background: "#fff" }} >

            {/* <Navbar position={'notFixed'} /> */}
            {/* <SubNavbar navTitle={'partners'} /> */}

            <div className='mt160'>

                <FaqComponent data={faqData} name='partner' theme="theme-white" />
            </div>

            <hr className='mt100' />
            <Footer />

        </div>
    )
}
