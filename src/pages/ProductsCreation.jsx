import Appbar from "../components/Appbar";
import React, { useEffect, useState } from "react";
import { getUser } from "../features/getUser";
// import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, createProduct, deleteProduct, editProduct } from "../features/productsSlice";
import { Box, Card, CardContent, CardMedia, Grid, Typography, Button, TextField } from "@mui/material";
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';


const ProductsCreation = () => {
    const [user, setUser] = useState(getUser());
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");



    const dispatch = useDispatch();
    const products = useSelector(state => state.products.list);

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch, openEdit])

    const handleEdit = (id, name, description, imageUrl, price, quantity) => {
        setId(id);
        setName(name);
        setDescription(description);
        setImageUrl(imageUrl);
        setPrice(price);
        setQuantity(quantity);
        setOpenEdit(true);
    }

    const handleSubmit = (event) => {
        // console.log(products);
        event.preventDefault();
        const newProduct = {
            name: name,
            description: description,
            image: imageUrl,
            price: price,
            stock_quantity: quantity
        };
        try {
            dispatch(createProduct(newProduct));
        } catch (error) {
            console.log("error sendingthe data: ", error)
        }
        setName("");
        setDescription("");
        setImageUrl("");
        setPrice("");
        setQuantity("");
        setOpen(false);
    }

    const handleUpdate = () => {
        // event.preventDefault();
        const updatedProduct = {
            name: name,
            description: description,
            image: imageUrl,
            price: price,
            stock_quantity: quantity
        };
        try {
            dispatch(editProduct({ id, updatedProduct }));
        } catch (error) {
            console.log("error sendingthe data: ", error)
        }
        setName("");
        setDescription("");
        setImageUrl("");
        setPrice("");
        setQuantity("");
        setOpenEdit(false);
    }

    const handleDelete = (id) => {
        // event.preventDefault();
        console.log(id);
        const confirm = window.confirm("Are you sure want to delete this product?");

        if (confirm) {
            try {
                dispatch(deleteProduct(id));
            } catch (error) {
                console.error("error in deleting the product: ", error);
            }
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
    }
    const handleExport = () => {
        const csvContent = products.map(row => {
            const values = Object.values(row); 
            return values.map(value => `"${value}"`).join(','); 
        }).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'products.csv';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    return (
        <>
            {user ? (
                <Box sx={{ display: "flex", width: "98%" }}>
                    <Appbar handleLogout={handleLogout} user={user} />
                    <div className="mt-32 flex flex-col pl-7 h-screen w-full items-center" >
                        <div className="w-full flex justify-end space-x-4 mb-5 place-self-start">
                            <Button variant="contained"
                                sx={{
                                    backgroundColor: "#4E4FEB",
                                    '&:hover': {
                                        backgroundColor: "#3A3BBA",
                                    },
                                }}
                                onClick={() => setOpen(true)}
                                size="small">
                                <AddCircleRoundedIcon />
                                Add
                            </Button>
                            <Button variant="contained"
                                sx={{
                                    backgroundColor: "#4E4FEB",
                                    '&:hover': {
                                        backgroundColor: "#3A3BBA",
                                    },
                                }}
                                onClick={handleExport}
                                size="small">
                                <FileUploadRoundedIcon />
                                Export
                            </Button>
                        </div>




                        <Grid container spacing={4}>
                            <div className="flex flex-wrap-reverse w-full">
                                {products.map(Element => (

                                    <div key={Element.id} className="p-5 rounded w-fit">


                                        <Grid item className="flex space-x-5 justify-between items-start h-36 w-72 hover:opacity-95 cursor-pointer">
                                            <div className="flex space-x-3">
                                                <Card className="flex">
                                                    <CardMedia className="h-28 w-28" image={Element.image ? Element.image : "https://source.unsplash.com/random"} />
                                                </Card>
                                                <div item className="flex flex-col items-start">
                                                    <Typography variant="h5">{Element.name}</Typography>
                                                    <Typography variant="subtitle2">{Element.description}</Typography>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <Typography variant="h6">₹{Element.price}</Typography>
                                                <Typography variant="subtitle2">Quantity:<span className="font-semibold text-base">{Element.stock_quantity}</span></Typography>
                                            </div>
                                        </Grid>
                                        <Grid item className="w-72">
                                            <div className="flex flex-col justify-evenly w-full space-y-3">
                                                <Button variant="contained"
                                                    onClick={() => handleEdit(Element.id, Element.name, Element.description, Element.image, Element.price, Element.stock_quantity)}
                                                    sx={{
                                                        backgroundColor: "#4E4FEB",
                                                        '&:hover': {
                                                            backgroundColor: "#3A3BBA", // Set the desired on-hover background color
                                                        },
                                                    }} size="small">Edit</Button>
                                                <Button onClick={() => handleDelete(Element.id)} variant="outlined" color="error">Delete</Button>
                                            </div>
                                        </Grid>
                                    </div>

                                ))}
                            </div>
                        </Grid>

                        {open &&
                            <Grid className="fixed justify-center items-center h-screen w-screen top-0 left-0 bg-opacity-20 bg-black" container>
                                <div className="flex flex-col relative w-1/2">
                                    <span onClick={() => setOpen(false)} className="absolute m-2 right-0 bg-red-500 rounded-full h-4 w-4 cursor-pointer hover:scale-105"></span>
                                    <Grid item className="border bg-white rounded-md p-4">
                                        <form onSubmit={handleSubmit} className=" flex flex-col p-4 space-y-2">
                                            <TextField value={name} required onChange={(e => setName(e.target.value))} id="outlined-basic" label="Name" variant="outlined" inputProps={{ maxLength: 20 }}/>
                                            <TextField value={description} onChange={(e => setDescription(e.target.value))} id="outlined-basic" label="Description" variant="outlined" multiline rows={3} inputProps={{ maxLength: 50 }}/>
                                            <TextField value={imageUrl} onChange={(e => setImageUrl(e.target.value))} id="outlined-basic" label="Image URL" variant="outlined" />
                                            <TextField value={price} required type="number" onChange={(e => setPrice(e.target.value))} id="outlined-basic" label="Price" variant="outlined" />
                                            <TextField value={quantity} required type="number" onChange={(e => setQuantity(e.target.value))} id="outlined-basic" label="Quantity" variant="outlined" />
                                            <Button variant="contained" color="success" type="submit">Submit</Button>
                                        </form>
                                    </Grid>
                                </div>
                            </Grid>}
                        {openEdit && <Grid className="fixed justify-center items-center h-screen w-screen top-0 left-0 bg-opacity-20 bg-black" container>
                            <div className="flex flex-col relative w-1/2">
                                <span onClick={() => setOpenEdit(false)} className="absolute m-2 right-0 bg-red-500 rounded-full h-4 w-4 cursor-pointer hover:scale-105"></span>
                                <Grid item className="border bg-white rounded-md p-4">
                                    <form onSubmit={handleUpdate} className=" flex flex-col p-4 space-y-2">
                                        <TextField value={name} required onChange={(e => setName(e.target.value))} id="outlined-basic" label="Name" variant="outlined" inputProps={{ maxLength: 20 }} />
                                        <TextField value={description} onChange={(e => setDescription(e.target.value))} id="outlined-basic" label="Description" variant="outlined" multiline rows={3} inputProps={{ maxLength: 50 }}/>
                                        <TextField value={imageUrl} onChange={(e => setImageUrl(e.target.value))} id="outlined-basic" label="Image URL" variant="outlined" />
                                        <TextField value={price} required type="number" onChange={(e => setPrice(e.target.value))} id="outlined-basic" label="Price" variant="outlined" />
                                        <TextField value={quantity} required type="number" onChange={(e => setQuantity(e.target.value))} id="outlined-basic" label="Quantity" variant="outlined" />
                                        <Button variant="contained" color="success" type="submit">Update</Button>
                                    </form>
                                </Grid>
                            </div>
                        </Grid>}
                    </div>
                </Box>
            ) : (
                <Card className="h-screen w-screen flex justify-center items-center">
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            You need to log in
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Please log in to access the dashboard.
                        </Typography>
                        <Button component={Link} to="/login" variant="contained" 
                        sx={{
                                    backgroundColor: "#4E4FEB",
                                    '&:hover': {
                                        backgroundColor: "#3A3BBA",
                                    },
                                }}>
                            Log In
                        </Button>
                    </CardContent>
                </Card>
            )}
        </>
    );
};

export default ProductsCreation;
