/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export const FormItemsView = ({ handler }) => {

    const [invoiceItemsState, setInvoiceItemsState] = useState({
        product: '',
        price: '',
        quantity: ''
    });

    const { product, price, quantity } = invoiceItemsState;

    useEffect(() => {

    }, [ price ]);

    useEffect(() => {

    }, [ invoiceItemsState ]);

    const onInputChange = ({ target: { name, value } }) => {
        setInvoiceItemsState({
            ...invoiceItemsState,
            [name]: value
        });
    };

    const onInvoiceItemsSubmit = (event) => {
        event.preventDefault();

        if (product.trim().length <= 1) return;
        if (price.trim().length < 1) return;
        if (isNaN(price.trim())) {
            alert('Price must be a number');
            return;
        } 
        if (quantity.trim().length < 1) return;
        if (isNaN(quantity.trim())) {
            alert('Quantity must be a number');
            return;
        }

        handler(invoiceItemsState);

        setInvoiceItemsState({
            product: '',
            price: '',
            quantity: '',
        });
    };

    return (
        <>
            <form className="w-50" onSubmit={ onInvoiceItemsSubmit }>
                <input 
                    type="text" 
                    name="product"
                    value={ product } 
                    placeholder="Product" 
                    className="form-control m-3"
                    onChange={ onInputChange }/>
                <input 
                    type="text" 
                    name="price" 
                    value={ price }
                    placeholder="Price" 
                    className="form-control m-3"
                    onChange={ event => onInputChange(event) }/>
                <input 
                    type="text" 
                    name="quantity" 
                    value={ quantity }
                    placeholder="Quantity" 
                    className="form-control m-3"
                    onChange={ onInputChange }/>
                <button 
                    type="submit" 
                    className="btn btn-primary m-3">
                    Create Item
                </button>    
            </form>
        </>
    )
}