import Appbar from "../components/Appbar";
import React, { useEffect, useState } from "react";
import { getUser } from "../features/getUser";
// import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productsSlice";
import { Box, Card, CardContent, Button, CardMedia, Grid, Typography } from "@mui/material";

const Home = () => {
    const [user, setUser] = useState(getUser());
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.list)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])


    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
    }

    return (
        <>
            {user ? (
                <Box sx={{ display: "flex" }}>
                    <Appbar handleLogout={handleLogout} user={user} />
                    <div className="mt-32 flex p-4 h-full w-full">
                    <Grid className="py-7 px-5 h-full w-full" container spacing={6} >
                            {products.map(Element => (
                                <Grid item key={Element.id} className="h-full w-80 relative hover:opacity-75 cursor-pointer">
                                <Card className="flex">
                                    <CardMedia className="h-56 w-80" image={Element.image ? Element.image : "https://source.unsplash.com/random"} />
                                </Card>
                                   <Typography variant="h6">{Element.name}</Typography>
                                   <Typography className="absolute top-20 right-0 text-white bg-blue-500 px-2 rounded-sm" variant="h6">₹{Element.price}</Typography>
                                </Grid>
                                
                            ))}
                            </Grid>
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

export default Home;
