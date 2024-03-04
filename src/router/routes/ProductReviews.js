import ProductReview from '@src/views/ProductReviews/Product_Review/ProductReview.js'
import Analytics from '@src/views/ProductReviews/analytics/Analytics.js'
import Reviews from '@src/views/ProductReviews/Manage_Reviews/Reviews.js'

export const ProductReview_Routes = [
    {
        path: '/merchant/product-review/',
        element: <ProductReview />
    },
    {
        path: '/merchant/analytics',
        element: <Analytics />
    },
    {
        path: '/merchant/reviews',
        element: <Reviews />
    }
]