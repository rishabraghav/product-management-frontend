import Appbar from "../components/Appbar";
import React, { useEffect, useState } from "react";
import { getUser } from "../features/getUser";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productsSlice";
import {
  Box,
  Card,
  CardContent,
  Button,
  CardMedia,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Home = () => {
  const [user, setUser] = useState(getUser());
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.list);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = products.slice(startIndex, endIndex);

  return (
    <>
      {user ? (
        <Box
          sx={{
            display: "flex",
            position: "fixed",
            overflow: "scroll",
            height: "100vh",
            ...(isSmallScreen && {
              overflow: "scroll",
              height: "90vh",
              paddingBottom: "0px",
            }),
          }}
        >
          <Appbar handleLogout={handleLogout} user={user} />
          <div className="mt-32 flex flex-col justify-between pl-1 ml-1 mb-4 pb-4 h-fit w-full">
            <Grid
              className="flex py-7 pl-1 pb-4 mb-4 h-fit w-full"
              container
              spacing={6}
            >
              {itemsToShow.map((Element) => (
                <Grid
                  item
                  key={Element.id}
                  className="h-full w-80 relative hover:opacity-75 cursor-pointer"
                >
                  <Card className="flex">
                    <CardMedia
                      className="h-56 w-80"
                      image={
                        Element.image
                          ? Element.image
                          : "https://source.unsplash.com/random"
                      }
                    />
                  </Card>
                  <Typography variant="h6">{Element.name}</Typography>
                  <Typography
                    className="absolute top-20 right-0 text-white bg-blue-500 px-2 rounded-sm"
                    variant="h6"
                  >
                    ₹{Element.price}
                  </Typography>
                </Grid>
              ))}
            </Grid>
            <div className={isSmallScreen? "flex bottom-1 w-full items-center justify-start mt-4":"flex bottom-1 w-full items-center justify-center mt-4"}>
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-primary active:opacity-70 text-white rounded-md mr-2 w-24"
              >
                Previous
              </button>
              <span className="text-lg font-semibold">
                Page {currentPage} of{" "}
                {Math.ceil(products.length / itemsPerPage)}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={endIndex >= products.length}
                className="px-4 py-2 bg-primary active:opacity-70 text-white rounded-md ml-2 w-24"
              >
                Next
              </button>
            </div>
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
