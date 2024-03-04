import { useEffect, useState } from 'react'
import { Card, CardBody } from 'reactstrap'
import DataTable from 'react-data-table-component'

import apiData from '@src/@core/auth/api/api.json';

const RatingBasedList = () => {
    const [productsData, setProductsData] = useState([])

    const columns = [
        {
            name: 'Product Image',
            selector: 'productImage',
            center: true,
            cell: (row) => <div className=' p-1 '>
                <img src={row.productImage} alt={row.productName} width="30" />
            </div>,
        },
        {
            name: 'Product Name',
            selector: 'productName',
            center: true,
            sortable: true,
        },
        {
            name: 'Total Reviews',
            selector: 'totalReviews',
            center: true,
            sortable: true,
        },
        {
            name: 'Avg Rating',
            selector: 'avgRating',
            center: true,
            sortable: true,
        },
    ]

    // const productsData2 = [
    //     {
    //         productImage: 'https://e1.pngegg.com/pngimages/629/981/png-clipart-shop-shapes-flowers-black-5-leaf-clover.png',
    //         productName: 'Product 1',
    //         totalReviews: 50,
    //         avgRating: 4.5
    //     },
    //     {
    //         productImage: 'https://e1.pngegg.com/pngimages/629/981/png-clipart-shop-shapes-flowers-black-5-leaf-clover.png',
    //         productName: 'Product 2',
    //         totalReviews: 30,
    //         avgRating: 4.0
    //     },
    //     {
    //         productImage: 'https://e1.pngegg.com/pngimages/629/981/png-clipart-shop-shapes-flowers-black-5-leaf-clover.png',
    //         productName: 'Product 1',
    //         totalReviews: 50,
    //         avgRating: 4.5
    //     },
    //     {
    //         productImage: 'https://e1.pngegg.com/pngimages/629/981/png-clipart-shop-shapes-flowers-black-5-leaf-clover.png',
    //         productName: 'Product 2',
    //         totalReviews: 30,
    //         avgRating: 4.0
    //     },
    //     {
    //         productImage: 'https://e1.pngegg.com/pngimages/629/981/png-clipart-shop-shapes-flowers-black-5-leaf-clover.png',
    //         productName: 'Product 1',
    //         totalReviews: 50,
    //         avgRating: 4.5
    //     },
    //     {
    //         productImage: 'https://e1.pngegg.com/pngimages/629/981/png-clipart-shop-shapes-flowers-black-5-leaf-clover.png',
    //         productName: 'Product 2',
    //         totalReviews: 30,
    //         avgRating: 4.0
    //     },
    //     {
    //         productImage: 'https://e1.pngegg.com/pngimages/629/981/png-clipart-shop-shapes-flowers-black-5-leaf-clover.png',
    //         productName: 'Product 1',
    //         totalReviews: 50,
    //         avgRating: 4.5
    //     },
    //     {
    //         productImage: 'https://e1.pngegg.com/pngimages/629/981/png-clipart-shop-shapes-flowers-black-5-leaf-clover.png',
    //         productName: 'Product 2',
    //         totalReviews: 30,
    //         avgRating: 4.0
    //     },
    //     {
    //         productImage: 'https://e1.pngegg.com/pngimages/629/981/png-clipart-shop-shapes-flowers-black-5-leaf-clover.png',
    //         productName: 'Product 1',
    //         totalReviews: 50,
    //         avgRating: 4.5
    //     },
    //     {
    //         productImage: 'https://e1.pngegg.com/pngimages/629/981/png-clipart-shop-shapes-flowers-black-5-leaf-clover.png',
    //         productName: 'Product 2',
    //         totalReviews: 30,
    //         avgRating: 4.0
    //     },
    //     {
    //         productImage: 'https://e1.pngegg.com/pngimages/629/981/png-clipart-shop-shapes-flowers-black-5-leaf-clover.png',
    //         productName: 'Product 1',
    //         totalReviews: 50,
    //         avgRating: 4.5
    //     },
    //     {
    //         productImage: 'https://e1.pngegg.com/pngimages/629/981/png-clipart-shop-shapes-flowers-black-5-leaf-clover.png',
    //         productName: 'Product 2',
    //         totalReviews: 30,
    //         avgRating: 4.0
    //     },
    //     {
    //         productImage: 'https://e1.pngegg.com/pngimages/629/981/png-clipart-shop-shapes-flowers-black-5-leaf-clover.png',
    //         productName: 'Product 1',
    //         totalReviews: 50,
    //         avgRating: 4.5
    //     },
    //     {
    //         productImage: 'https://e1.pngegg.com/pngimages/629/981/png-clipart-shop-shapes-flowers-black-5-leaf-clover.png',
    //         productName: 'Product 2',
    //         totalReviews: 30,
    //         avgRating: 4.0
    //     },
    // ]

    const customStyles = {
        headRow: {
            style: {
                fontSize: "16px",
                color: "rgba(0,0,0,0.5)"
            }
        }
    }


    useEffect(() => {
        fetch(`${apiData.d_ngrok}/router/top-products/`,
            {
                method: "GET",
                headers: {
                    'ngrok-skip-browser-warning': true,
                }
            }
        )
            .then(resp => {
                if (!resp.ok) {
                    console.log("error")
                }
                return resp.json()
            }).then(data => {
                const productList = data.top_products.map(item => (
                    {
                        productImage: item.image,
                        productName: item.name,
                        totalReviews: item.count,
                        avgRating: item.average
                    }
                ))
                setProductsData(productList)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <>
            <Card>
                <CardBody>
                    <h4>Rating Based Product List</h4>
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                    <div >
                        <DataTable
                            columns={columns}
                            data={productsData}
                            pagination
                            customStyles={customStyles}
                        />
                    </div>
                </CardBody>
            </Card>
        </>
    )
}

export default RatingBasedList