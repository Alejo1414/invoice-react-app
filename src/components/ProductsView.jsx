import { RowItemView } from "./RowItemView";
import PropTypes from 'prop-types';

/* eslint-disable react/prop-types */
export const ProductsView = ( { title, items, handlerDeleteItem }) => {

    return (
        <>
            <h4>{ title }</h4>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(({ id, product, price, quantity }) =>  
                         <RowItemView 
                         key={ id }
                         id={ id } 
                         product={ product } 
                         price={ price } 
                         quantity={ quantity }
                         handlerDeleteItem={ id => handlerDeleteItem(id) }>
                         </RowItemView>
                    )}
                </tbody>
            </table>
        </>
    )
}

ProductsView.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
}