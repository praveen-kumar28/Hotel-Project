import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Switch,
  Box,
  CssBaseline,
  createTheme,
  ThemeProvider
} from '@mui/material';

const theme = createTheme();

function App() {
    const [dishes, setDishes] = useState([]);
    useEffect(() => {
        fetchDishes();
        const interval = setInterval(fetchDishes, 5000); 
        return () => clearInterval(interval);
    }, []);

    const fetchDishes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/dishes');
            setDishes(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const togglePublished = async (dishId) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/dishes/toggle/${dishId}`);
            setDishes((prevDishes) =>
                prevDishes.map((dish) => (dish.dishId === dishId ? response.data : dish))
            );
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Dish Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography variant="h2" align="center" color="text.primary" gutterBottom>
                            Dish Dashboard
                        </Typography>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        {dishes.map((dish) => (
                            <Grid item key={dish.dishId} xs={12} sm={6} md={4}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CardMedia
                                        component="img"
                                        image={dish.imageUrl}
                                        alt={dish.dishName}
                                        height="200"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {dish.dishName}
                                        </Typography>
                                        <Typography>
                                            {dish.isPublished ? 'Published' : 'Unpublished'}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={() => togglePublished(dish.dishId)}>
                                            {dish.isPublished ? 'Unpublish' : 'Publish'}
                                        </Button>
                                        <Switch
                                            checked={dish.isPublished}
                                            onChange={() => togglePublished(dish.dishId)}
                                            color="primary"
                                        />
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </ThemeProvider>
    );
}

export default App;
