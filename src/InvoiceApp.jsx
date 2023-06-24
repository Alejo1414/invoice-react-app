/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { calculateTotal, getInvoice } from "./services/getInvoice"
import { ClientView } from "./components/ClientView";
import { CompanyView } from "./components/CompanyView";
import { InvoiceView } from "./components/InvoiceView";
import { ProductsView } from "./components/ProductsView";
import { TotalView } from "./components/TotalView";
import { useEffect } from "react";
import { FormItemsView } from "./components/FormsItemsView";

const invoiceInitial = {
    id: 0,
    name: '',
    client: {
        name: '',
        lastName: '',
        address: {
            country: '',
            city: '',
            street: '',
            number: 0
        },
    },
        
    company: {
        name: '',
        fiscalNumber: 0
    },
    items: []
};

export const InvoiceApp = () => {

    const [ activeForm, setActiveForm ] = useState(false);

    const [ total, setTotal ] = useState(0);

    const [counter, setCounter] = useState(4);

    const [invoice, setInvoice] = useState(invoiceInitial);

    const [items, setItems] = useState([]);

    const { id, name, client, company } = invoice;

    useEffect(() => {
        const data = getInvoice();
        console.log(data);
        setInvoice(data);
        setItems(data.items);
    }, []);

    useEffect(() => {
        setTotal(calculateTotal(items));
    }, [ items ]);    

    const handlerAddItems = ({ product, price, quantity}) => {

        setItems([ ...items, { 
            id: counter, 
            product: product.trim(), 
            price: +price.trim(), 
            quantity: +quantity.trim() }])

        setCounter(counter + 1);
    }

    const handlerDeleteItem = (id) => {
        setItems(items.filter( item => item.id !== id ));
    }

    const onActiveForm = () => {
        setActiveForm(!activeForm);
    }

    return (
        <>
            <div className="container">
                <div className="card my-3">
                    <div className="card-header">Invoice Information</div>
                    <div className="card-body">
                        <InvoiceView id={ id } name={ name }></InvoiceView>
                        <div className="row my-3">
                            <div className="col">
                                <ClientView title="Client Information" client={ client }></ClientView>
                            </div>
                            <div className="col">
                                <CompanyView title="Company Information" company={ company }></CompanyView>
                            </div>
                        </div>
                        <ProductsView title="Invoice Products" items={ items } handlerDeleteItem={ id => handlerDeleteItem(id) }></ProductsView>
                        <TotalView total={ total }></TotalView>
                        <button className="btn btn-primary" onClick={ onActiveForm }>{ !activeForm ? 'Add Item' : 'Hide Form' }</button>
                        { !activeForm ? '' : <FormItemsView handler={ (newItem) => handlerAddItems(newItem) }></FormItemsView> }
                    </div>
                </div>
            </div>
        </>
    )
}