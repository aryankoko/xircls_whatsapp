import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import $ from "jquery"

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // console.log(pathname)
    $('body').animate({
      scrollTop: $('body').offset().top
    }, 100)
    if (pathname === '/contactus/') {
      $("#schedule").css({ display: `none` })
    } else {
      $("#schedule").css({ display: `` })
    }
    
  }, [pathname])

  return null
}