import { Box, Button, CardMedia, Grid, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import Appbar from "../components/Appbar";
import { Link } from "react-router-dom";
import { getUser } from "../features/getUser";
import AgDataGrid from "../components/AgDataGrid";
import { useDispatch } from "react-redux";
import { editUser } from "../features/authSlice";
import { Card, CardContent, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';


const Dashboard = () => {
    const [user, setUser] = useState(getUser());
    const [open, setOpen] = useState(false);

    const [name, setName] = useState((user && user.name) || "");
    const [email, setEmail] = useState((user && user.email) || "");
    const [image, setImage] = useState((user && user.image) || "");
    const [id] = useState((user && user.id) || 0);

    const dispatch = useDispatch();

    const handleSubmit = () => {
        // event.preventDefault();
        const updatedUser = {
            name: name,
            email: email,
            image: image
        }
        const userData = {
            id,
            updatedUser,
        }
        try {
            dispatch(editUser(userData));
        } catch (error) {
            console.log("error in updating the user: ", error)
        }
        setOpen(false);
    }

    useEffect(() => {

    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
    }
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <>
            {user ? (
                <Box sx={{ display: "flex", height: "100vh", position: "fixed", width: "100%", overflow: "scroll",...(isSmallScreen && {
                        overflow: "scroll",
                        height: "90vh",
                        paddingBottom: "0px",
                        scrollPaddingRight: "100vw",
                    }), }}>
                    <Appbar handleLogout={handleLogout} user={user} />
                    <div className="mt-20 flex flex-col p-4 h-full w-full justify-start items-center">
                        <div className="flex w-3/4">
                            <Grid container spacing={4}>
                                <Grid item className="space-y-2 h-fit">

                                    <CardMedia className={isSmallScreen? "h-48 w-48 rounded-full":"h-64 w-64 rounded-full"} image={user.image ? user.image : "https://i.pinimg.com/564x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg"} />
                                    <Button variant="contained" sx={{
                                        backgroundColor: "#4E4FEB",
                                        '&:hover': {
                                            backgroundColor: "#3A3BBA", // Set the desired on-hover background color
                                        },
                                    }} size="small"
                                        onClick={() => setOpen(true)}
                                    >Edit profile</Button>
                                </Grid>
                                <Grid item className="h-64 w-96">
                                    <div className="h-full w-full justify-center items-center flex flex-col">
                                        <div className="h-fit w-full justify-center items-start flex flex-col space-y-6">
                                            <TextField className="w-full" size={isSmallScreen && "small"} id="outlined-multiline-static" InputProps={{readOnly: true,}} label="Name" defaultValue={user.name} />
                                            <TextField className="w-full" size={isSmallScreen && "small"} id="outlined-multiline-static" InputProps={{readOnly: true,}} label="Email" defaultValue={user.email} />
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        {user.role === 'admin' &&
                            <Grid container className="h-full w-fit">
                                <div className="flex w-full justify-center overflow-scroll">
                                    <Grid item className="w-4/5">
                                        <AgDataGrid />
                                    </Grid>
                                </div>

                            </Grid>}
                        {open &&
                            <Grid className="fixed justify-center items-center h-screen w-screen top-0 left-0 bg-opacity-30 bg-black" container>
                                <div className="flex flex-col relative w-1/2">
                                    <span onClick={() => setOpen(false)} className="absolute m-2 right-0 bg-red-500 rounded-full h-4 w-4 cursor-pointer hover:scale-105"></span>
                                    <Grid item className="border bg-white rounded-md p-4">
                                        <form className=" flex flex-col p-4 space-y-2">
                                            <TextField value={name} required onChange={(e => setName(e.target.value))} id="outlined-basic" label="Name" variant="outlined" />
                                            <TextField value={email} required onChange={(e => setEmail(e.target.value))} id="outlined-basic" label="Email" variant="outlined" />
                                            <TextField value={image} onChange={(e => setImage(e.target.value))} id="outlined-basic" label="Profile Photo URL" variant="outlined" />
                                            <Button variant="contained" color="success" type="button" onClick={handleSubmit}>Submit</Button>
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
}

export default Dashboard;