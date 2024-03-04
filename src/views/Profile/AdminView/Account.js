// import React, { useEffect, useState } from 'react'
// import ComTable from '../../Components/DataTable/ComTable'
// import { useEffect, useState } from 'react'
// import moment from 'moment/moment'
// import { Input, Col } from 'reactstrap'
import OutletDetails from '../../Outlet/OutletDetails'

const Account = () => {
    // const [data, setdata] = useState([])
    // const [searchValue, setSearchValue] = useState('')
    // const [filteredData, setFilteredData] = useState([])

    // const handleFilter = e => {
    //     const value = e.target.value
    //     let updatedData = []
    //     setSearchValue(value)
    
    //     if (value.length) {
    //         updatedData = data.filter(item => {
    //         const startsWith =
    //             item.email_id.toLowerCase().startsWith(value.toLowerCase())
    
    //         const includes =
    //             item.email_id.toLowerCase().includes(value.toLowerCase())
    
    //         if (startsWith) {
    //             return startsWith
    //         } else if (!startsWith && includes) {
    //             return includes
    //         } else return null
    //         })
    //         setFilteredData(updatedData)
    //         setSearchValue(value)
    //     }
    // }

    // const calculateProgressPercentage = (item) => {
    //     const progressValue = item.progress
    //     return `${progressValue}%`  // We'll return the progress value as a percentage
    //   }
    //    const getProgressBarColor = (item) => {
    //     const progressValue = item.progress
    //     if (progressValue > 75) {
    //       return 'bg-success'
    //     } else if (progressValue > 50) {
    //       return 'bg-primary'
    //     } else if (progressValue > 25) {
    //       return 'bg-warning'
    //     } else {
    //       return 'bg-danger'
    //     }
    //   } 
  
      // const CustomCheckbox = ({ checked }) => {
      //   return (
      //     <div className="form-check">
      //       <input type="checkbox" className="form-check-input" checked={checked} readOnly />
      //     </div>
      //   )
      // } 
  
      // const ProgressBarCell = (props) => {
      //   const { row } = props
      //   const progressBarColor = getProgressBarColor(row)
    
      //   return (
      //     <div className="progress" style={{ height: '5px'}}>
      //       <div
      //         className={`progress-bar ${progressBarColor}`}
      //         role="progressbar"
      //         style={{ width: `${row.progress}%`, fontSize: '1px'}}
      //         aria-valuenow={row.progress}
      //         aria-valuemin="0"
      //         aria-valuemax="100"
      //       >
      //         &nbsp;{/* Add a non-breaking space to ensure the progress bar has some content */}
      //       </div>
      //     </div>
      //   )
      // }
    
      // Component for Progress Percentage Text
      // const ProgressTextCell = (props) => {
      //   const { row } = props
      //   const progressPercentage = calculateProgressPercentage(row)
    
      //   return (
      //     <div>
      //       {progressPercentage}
      //     </div>
      //   )
      // }

    //   const columns = [
    //     {
    //         name: 'Outlet Name',
    //         minWidth: '200px',
    //         selector: (row) => row.name,
    //         cell: (row) => (
    //             <div className="d-flex align-items-start">
    //               {row.avatar && (
    //                 <img
    //                   src={row.avatar}
    //                   alt="Avatar"
    //                   className="avatar-image me-1 rounded-circle"
    //                   style={{ maxWidth: '30px', maxHeight: '30px' }}
    //                 />
    //               )}
    //               <div className='flex-column'>
    //                     <div className="fw-bold">{row.name}</div>
    //                     <div className="text-muted small">{row.text}</div>
    //                 </div>
    //             </div>
    //         )
    //     },
    //     {
    //         name: 'Created at',
    //         width: ' 150px',
    //         selector: row => row.date
    //     },
    //     {
    //         name: 'Progress',
    //         width: '200px',
    //         selector: (row) => row.progress,
    //         cell: (row) => (
    //             <div className='flex-column w-100'>
    //             <ProgressTextCell row={row} />
    //             <ProgressBarCell row={row} />
    //           </div>
    //         )
    //       },
    //       {
    //         name: 'Tasks',
    //         width: '100px',
    //         cell: (row) => <CustomCheckbox checked={row.checked} />
    //       }

    // ]

    // useEffect(() => {
    //     setdata([
    //         {
    //             progress: 80,
    //             date: '12-04-2021',
    //             name: 'bfddf avasvds',
    //             avatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAA+VBMVEX/7uz/cmKiWf/yTh4Kz4MavP75fmP97uzCi/hd2qY5w/xYyvpxr8Lsc2Wk2vP/nJDB4PHy7O3/6uf/4+D/1dAR0Ib/eWmh2vP27ej+0cid4cJ23bIs05Ii0o32dlLzUyWnYP6mXv6Smfq7gPqok/nOoPbUqPXrzfDe5+7d5+723u7T6dn/3tjE59Jk2qpM159B15v6rZn/k4b/c2P0ZDr0Wy+zdPuzc/vZsfPYsPPp6+Ln6+GVw8ub18T/ycN8vML8x7ncs7e/qrT/u7O+pa//tKv/raPcoaH/ppz1ppoX0YnxjYj4lnv/iHvugnb/fm/3iGr3hGP0YTfsgWsHAAABW0lEQVRYw+3U526DMBDA8UuA0pCWkgQIIQS6m7TZo3vvvd7/YUpEoVgt/nC4Eor8f4CfbJ19wOPxeLwZqDxwJ0LQXC7IfLmtoL3aOMBCMDSvsJ4nkGDUDe6+YyEJHOkYcCCQYLwhBnQp4AgzmAkFzNUQoEcDTxHgJw3ETOWdApplBHhOAe8B00ci+Ib7fRU3ATR17G549v4Ch21A1354XQx6Wpp2d315oQO+rbV82DyAXFUkP0WVsd6mD/2ApaL0XbGE8w7ycVD2vUhEnXF7hQCrUiwVA27kCVCJgwoG3CXAdYmohQCXCXCVBLUsgHu0KzezMBTmzwb2KQ87G1/v13JQo+WA7ujkbCHoGKa1NK0J+Ky6IYYVIH1WXxSZggWRLdgRGYNd1mCDNWj87wnr6cEeAdrpQTvuGYfpQdmh3BjVzmPk9WVgIjrhiC1gk2z3GobT7QCPx+PxZrEvM4ogL9NmJ9MAAAAASUVORK5CYII=',
    //             text: 'yo'
    //           },
    //           {
    //             progress: 15,
    //             date: '12-04-2021',
    //             name: 'bfbd dsfv',
    //             avatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAwFBMVEXq+v/o+v9h2vtl4v9i3P1j3v9m5f9n3Pxk4P/k+f/P9P+W6P7d9/9y3vzg+P/D8f514P3m+f/i+P/M8/+O5f3I8v5u3fxq3fzY9v9p3/6A4f257/627v6b6P6f6P1n5/+87/6y7f6S5/2J5P1t3/174PzT9P6i6v554f3a9v9o4v+v7P7F8v++8P595v525f5v4v5n3v6p6/2D4/1+4/6H4/3V9f+M6v+H6f9s5P9r4f9q5/+m6v5y5P7R9P/A8P7oQCwMAAAEN0lEQVRYw+2X15aiQBCGgY5kVDKSk4KO2VmdsO//Vtsm5uyVI3O1e/y9oAH9uqq6uqrlnnrqqaee+g/EjzK1rCWe+9Lgc12q5mzQizcICsBETP2GHIzkJWAy0mEf+6QClFFYruKVvD8/mdZL3EzkyG9e5vzjQDHEpcIueo7wJGETWDva+IHGcZJJQuVxoFK+tRdysMDOepgYQF2fOXy7fB318NjxrOuwMunKLxp/dn33++Vl/jhwJtj7240WrahndrfWr8X4caCO1GkXz8CjXijebkevvYCwAw70JbDJ8p3/EdAS1OqW4AbeSBH9SK/vZr8WwePAT4dYl5G7AaXLuTKa6N2i/O6RNsZbcOZNZerVM11vDbq57MPxx6/R48Bh/hZVybtZqgKEAqUIsqs9yaNkFHmy+7jLromIg+OYInZVVdWwbUdAFMeAEJgxUx+SqMsqhJAYu8ympeUqiqYpriWjIjcNcjI1m2sP1JnEhzG1SbNWxGC1TL52z/YgD7R14TlN3Gxm4jd5VY5iYiZV/hbye/Ug819xHXuL8bAmmZWYBT7K1bccnxcxkSVmZ0rVaQ2MPRtKkRn+Zga5MtjNXou1yImjsAFb/RtGJit8yTe+sr1QPayZYe0RAOCxmjWwjI98cclCMTXARL9bvF0b75SrgxmF0GcUnSBBEOCy5jmlhoJwSxprg/O7XmfAULotDOExZbUmA8JJ0N+zbTihanozS5+Q9N5iE1B3Y82nJfu+sqUX4EJnNzXKR106mKuJfgdogOwrt1VoVIyxuQJfLBaSjG47hrZbZdIdYEpXyW3+FqEm4rnh+8XlFQuumDiI1MPrjOuP4m5LFXfYGd88BjZUJY7fbwFbCmSwmfZmY6+upUF7X6Lofrea+hjK1bkiEhJs3jKelTKTILKZM2PHZLFmDYA/bZv8iLLvFAlNhtiJJE6sgS8GsJifc3ImaSeIf5BdmYSaKEUGPtbK9wpNsgUx2bXl25rTzMb/+pVS063Et8U2zAsMdvq3DxBa6gsxhtAMRnP7EHXxnS+XURWYDgL46LfDh+qXFaoQ4ViwCXTCdhwEwbiNJkiwHYyRoMq69vhRBJSm4SAMEKWYiQ0QxZRM8hLK0x5nmw0LoVjpaWQzSMk+DjxmqS6JXLvs01Om6mF+7fKOV58CaBzkS9iSPl2P/7TJ1YzhO/LagTVpcvcnfdkS7KrLTFDUG+BL3cnhI+0DVN3beGpCiLaz2zuJAfk+wH1XpiwHFRH3M+CIOFIH3yKI1Fb80XFuahzmt163xEZr0uOt9Cd9DpycmMfy2V3JRNgfcdPQw+V4eF5171V6HDgYIyfQlJlcxKtweuKkBm426ed0/OK99/lfoeSxoNowbvyEv6YmgwNie/TcVXpEMfMAcnbjzppTdzcI9bITrxdSktcu//cjTZpVQ+6pp5566ql/X38AmYlpr95+tigAAAAASUVORK5CYII=',
    //             text: 'yo'
    //           },
    //           {
    //             progress: 65,
    //             date: '12-04-2021',
    //             name: 'fvds kldfdafnl',
    //             text: 'yo',
    //             avatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAABL1BMVEXj//NBuIM0SV5BuYNBuoQ0R15DuYRDvYbf/vFCvIU0S19AtIHe/fA2TWDc/O5TwpBGwYpFv4hAt4I6gXAzRV3h/vLa++zX++tHu4dFu4XP9+XF8t9ix5tJvIlBvIRAsIA/q388j3U1WmPS+OjN9uS879iy6tKg4sWd4MOY376F1rF60altzKJlyZxdxZZYw5ROwY5Qvo0/p30+nXo8lHY4cGo2ZWc1X2Q5UGM0VmI0U2Hd+e7V8ujJ9OG37dWp5syxzMiU3byQ27qXsbJlfog+o3w6inM5em43amk0UGDN6eHC8Nyu6c+q5cum5ciJ2LWB1K9yz6Vpyp5xipFedoI/sIBYb3w+oHtRZ3VFWms8U2ba9uvU+OjF4tqpxcGM2beL2beQqa1yzqaFnqNnyZ49BA2OAAACmUlEQVRYw+3UV1vqQBAG4AlLZElCAEMvigJSRBAUsffe27GdXv7/bzjy7Ew43khCcnN88t4Bu8O3yeyAx+PxeP5PN2PkyCeE7tYA8e0QfrnawVUsvwXvyuaZJBRWZbF5eRvQ+r0PGSquitY5vIvvBnHp+KGMu+8/i9+0PQwoTxdwkT9cgiGKLazIJnsxjLgHffHTJ5+gTI1jwUhVgyH4ZVBCiz5Z7H86hVdrv5cx4PGkHw88V4ShErMRjKgeUcS7/oG3nxXxceWR0YE3wYJy2I/rD6Yx4vM3gPV9eoLGuCjIIt91sIDvBCRE7yW0v76296KIeksd+sPcGViycRvAHYVjPPTLz68PIqCsTGE9Fq3EwZqtID6kiUVFFhEfzAMv0RsJ5DJgUXKOIqpLMWoVrLd6OIG/5WtgWSXvp4h0X0hXZRiwkQTL9F/UjKz7tt7KAgVsn4MNG2brdETroJCB9VjqCmzZTVPzGsqgotKbZFiwmQFbkk3a+annM51Qy0jpKti0laaps6iYAY9parE/OtjEGxJSu2bARwmlNsG2bIphxIMTLHhEAQPXGtjGfwQooiFeizlWWXgDRpAJUzMWpmNvx2pNgxHwChVUp2S5f4nZkEs8fNRGqXW6sdc7Qo00PwOjiZfnaVItrMQMlcZqPQEj0nYpomr0DrB4sHkGI8vSHGOdBXoj0SqH0V3SqDUFcyVw4EsOIxJ/agccqeKoJcFGERxJNEQzIta+AIfO2/9GTM9q4JB2lWaDgK0SOBUvtQYFUzVwTquMSWQuAS5I3ppPcAbcwDdTOGVmdXBF4lp0dzgL7ohn2/1mjOzo4BK99hox0MyAW+LFm+gYjlV38Jn5SD0JLkrWW2VwEy9f6OAqroHH4/F4Ppi/HW8/FvOjUkYAAAAASUVORK5CYII='
    //           },
    //           {
    //             progress: 47,
    //             date: '12-04-2021',
    //             name: 'fds vfvdsf',
    //             text: 'yo',
    //             avatar: 'https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-1/assets/xamarin-d2086975.png'

    //         }
    //       ])
    // }, [])
    
    // const timelineData = [
    //   {
    //     bgColor: 'bg-danger',
    //     title: '12 Invoices have been paid',
    //     description: 'Invoices have been paid to the company',
    //     icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRsDJXepIB40Ex5p8pi2IC9LVAMiprrzOmgnxYyTSLsDq3B7Ai4fqhrQ&s=0',
    //     fileName: 'Invoices.pdf'
    //   },
    //   {
    //     bgColor: 'bg-primary',
    //     title: 'Meeting with john',
    //     description: 'React Project meeting with john @10:15am',
    //     icon: 'https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-1/assets/avatar-2-11d6be6e.png',
    //     fileName: 'John Doe (Client)'
    //   },
    //   {
    //     bgColor: 'bg-success',
    //     title: 'Create a new react project for client',
    //     description: 'Add files to new design folder'
    //   },
    //   {
    //     bgColor: 'bg-success',
    //     title: '12 Create invoices for client',
    //     description: 'Weekly review of freshly prepared design for our new app.'
    //   }
    // ]

    // const defferContent = <>
    //   <Col className='d-flex align-items-center justify-content-center' md='4' sm='12'>
    //     <h4 className='m-0'>Details</h4>
    //   </Col>
    //   <Col className='d-flex align-items-center justify-content-end' md='4' sm='12'>
    //     <Input
    //       className='dataTable-filter form-control ms-1'
    //       style={{ width: `180px`, height: `2.714rem` }}
    //       type='text'
    //       bsSize='sm'
    //       id='search-input-1'
    //       placeholder='Search...'
    //       value={searchValue}
    //       onChange={handleFilter}
    //     />
    //   </Col>
    // </>

  return (
    <>
      <div className='row'>
        <div className='col-12'>
          <OutletDetails />
          {/* <div className='card'>
            <div className='card-body'>
                <div className="d-flex justify-content-start align-items center py-1">
                    <h5>User Activity Timeline</h5>
                </div>
                <div className='row'>
                  {timelineData.map((item, index) => (
                    <div className='mx-1' key={index}>
                      <div className={`position-relative px-3 pb-3`} style={{ borderLeft: '0.5px dotted black' }}>
                        {item.bgColor && <span className={`position-absolute rounded-pill ${item.bgColor}`} style={{ width: 14, height: 14, top: 0, left: 0, transform: 'translate(-7px, 2.5px)' }}></span>}
                        <h5 className="d-flex justify-content-between">{item.title}<span className="fw-normal text-secondary" style={{ fontSize: '0.95rem' }}>{moment(new Date()).format('YYYY/MM/DD, hh:mm')}</span></h5>
                        <p>{item.description}</p>
                        {item.icon && (
                          <div className="d-flex align-items-center">
                            <a href={'#'}><img src={item.icon} className="rounded-pill me-1" width={20} style={{ aspectRatio: '1' }} alt="logo" /></a>
                            <p className="mb-0 ">{item.fileName}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
            </div>
          </div> */}
          {/* <div className='card'>
            <div className='my-1'>
              <ComTable
                content={defferContent}
                tableCol={columns}
                data={data}
                searchValue={searchValue}
                filteredData={filteredData}
                handleFilter={handleFilter}
                />
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default Account