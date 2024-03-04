export default () => {
    self.addEventListener('message', (e) => {
        // eslint-disable-line no-restricted-globals
        if (!e) return

        const { data } = e.data

        const subArray = new Array()
        const refArray = new Array()

        data?.status?.map((ele) => {
            try {
                if (!refArray.includes(ele.ip_address)) {
                    subArray.push({ ip_address: ele.ip_address, visitor_type: ele.visitor_type, browser_details: JSON.parse(JSON.stringify(ele.browser_details)), activities: [{ created_at: ele.created_at, current_page: ele.current_page }], source: ele?.source })
                    refArray.push(ele.ip_address)
                } else {
                    subArray[refArray.indexOf(ele.ip_address)].activities.push({ created_at: ele.created_at, current_page: ele.current_page })
                }
            } catch (error) {
                console.log(error, "Error in browser Details", ele?.id)
            }
        })
        const activity = subArray[0]?.activities
        // setSideBarData([...subArray[0]?.activities])
        // setShowData(subArray)

        const sideBarData = [...subArray[0]?.activities]

        const dataByDate = sideBarData.reduce((acc, item) => {
            const date = item.created_at.split('T')[0] // Extract date from the created_at property
            if (!acc[date]) {
                acc[date] = []
            }
            acc[date].push(item)
            return acc
        }, {})

        postMessage({ subArray, activity, dataByDate })
    })

}