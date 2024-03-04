import { lazy } from 'react'
const ProductView = lazy(() => import('../../views/Products/ProductView'))
const ProductDetailView = lazy(() => import('../../views/Products/ProductDetailView'))


const Product_Routes = [
  {
    path: '/products/get-products-details/',
    element: <ProductView />
  },
  {
    path: '/products/view-products/:id/',
    element: <ProductDetailView />
  }
]

export default Product_Routes