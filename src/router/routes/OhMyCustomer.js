import Customization from "../../views/OhMyCustomer/jsx/Customization"
import Dashboard from "../../views/OhMyCustomer/jsx/Dashboard"

export const OhMyCustomer_Routes = [
    {
        path: '/merchant/oh-my-customer/',
        element: <Dashboard />
    },
    {
        path: '/merchant/oh-my-customer/customization/',
        element: <Customization />,
        meta: {
            layout: "fullWidthLayout"
        }
    }
]