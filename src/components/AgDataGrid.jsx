import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from "../features/productsSlice";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const AgDataGrid = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const data = useSelector(state => state.products.list);

    const loading = useSelector(state => state.auth.loading);
    const cellStyle = {
        fontSize: '10px', // Adjust font size
        height: '40px',  // Adjust cell height
        justifyContent: "center",
        alignItems: "center",
    };
    const [columnDefs] = useState([
        { field: 'name', cellStyle, filter: true },
        { field: 'price', cellStyle, filter: true },
        { field: 'stock_quantity', cellStyle, filter: true },
        { field: 'description', cellStyle, filter: true },
        // { field: 'image', cellStyle, filter: true },
    ]);


    return (
        <div id='agDataGrid' className="ag-theme-alpine h-full w-full" >
            {loading ? <p>Loading...</p> : (

                <AgGridReact
                    rowData={data}
                    columnDefs={columnDefs}>
                </AgGridReact>

            )}

        </div>
    );
}

export default AgDataGrid;