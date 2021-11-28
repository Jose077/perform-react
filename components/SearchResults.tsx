import { useMemo } from 'react'
import { ProductItem } from "./ProductItem"
import { List, ListRowRenderer } from 'react-virtualized'

interface SearchResultsProps {
    results: Array<{
        id: number;
        price: number;
        title: string;
    }>

    onAddToWishlist: (id: number) => void

}


export function SearchResults({ results, onAddToWishlist }: SearchResultsProps) {

    const totalPrice = useMemo(() => {
        return results.reduce((total, product) => {
            return total + product.price
        }, 0)
    }, [results]);

    const rowRender: ListRowRenderer = ({ index, key, style }) => {
        return (
            <div key={key}>
                <ProductItem
                    product={results[index]}
                    onAddToWishlist={onAddToWishlist}
                /> 
            </div>
        )
    }
    

    return (
        <div>
            <h2>{ totalPrice }</h2>

            <List
                height={300}
                rowHeight={30}
                width={900}
                overscanRowCount={5}
                rowCount={results.length}
                rowRenderer={rowRender}

            />

        </div>
    )
}