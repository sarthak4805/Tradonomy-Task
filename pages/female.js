import React, { useMemo, useState } from 'react'
import {client} from '../lib/client'
import { AllProducts } from '../components'

const PRODUCT_FILTERS = ['All', 'Dress', 'Sweater', 'Pants', 'Jackets']

const female = ({AllFemaleProducts}) => {
    const [activeFilter, setActiveFilter] = useState('All')

    const filteredProducts = useMemo(() => {
        if (!AllFemaleProducts) return []
        if (activeFilter === 'All') return AllFemaleProducts

        return AllFemaleProducts.filter(
            (prod) => prod?.tags?.toLowerCase() === activeFilter.toLowerCase()
        )
    }, [AllFemaleProducts, activeFilter])

    return (
        <div>
            <div className='Allproducts-filter'>
                {PRODUCT_FILTERS.map((filter) => (
                    <button
                        key={filter}
                        type='button'
                        className={filter === activeFilter ? 'active' : ''}
                        onClick={() => setActiveFilter(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            <div className='Allproducts-container'>
                {filteredProducts?.map(prod => (
                    <AllProducts key={prod._id} allproducts={prod} />
                ))}
            </div>

            {!filteredProducts?.length && (
                <p className='Allproducts-empty'>No products match this filter.</p>
            )}
        </div>
      )
}

export const getServerSideProps = async () => {
    const query = '*[category == "Female"]';
    const AllFemaleProducts = await client.fetch(query);

    return {
      props: { AllFemaleProducts }
    }
}

export default female
