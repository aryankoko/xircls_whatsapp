// ** Router imports
import { useRoutes } from 'react-router-dom'

const Router = ({ allRoutes }) => {
  // console.log(allRoutes, "allRoutes")
  const routes = useRoutes([...allRoutes])

  return routes
}

export default Router
