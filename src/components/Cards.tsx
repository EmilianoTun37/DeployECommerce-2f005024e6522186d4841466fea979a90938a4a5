import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import { Dispatch, useEffect, useState } from 'react';
import * as productServices from '../services/productService';
import { Product } from '../interfaces';
import { Button } from '@mui/material';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const AddToShoppingCart = (producto) => {
  const list = [];
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    if (!carrito) { list.push(producto);localStorage.setItem('carrito', JSON.stringify(list)); return;};
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

export default function CardsProducts() {
    const [products, setProducts]: [Product[], Dispatch<Product[]>] = useState(
        []
    );

    const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('user') ? true : false);

    const functon = () => {
        setLoggedIn(false)
    }

    console.log(functon)

    useEffect(() => {
        async function getData() {
            const results = await productServices.getProducts();

            setProducts(results);
            return;
        }

        getData();
    }, []);

  return (
    <div className='d-flex gap-5 align-items-center justify-content-center flex-wrap mt-5'>
      {products?.map((product, index) => (
        <Card sx={{ maxWidth: 345 }} key={index}>
        <CardMedia
          sx={{ height: 180, width: 300 }}
          image={product.imageProduct}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" color="black">
            {product.nameProduct}
          </Typography>
          <Typography variant="h6" color="text.primary">
            {product.descriptionProduct}
          </Typography>
          <Typography variant="body2">${product.price}</Typography>
        </CardContent>
        {
          isLoggedIn && <CardActions>
          <Button size="medium" style={{left:"112px"}} onClick={() => AddToShoppingCart(product)}><AddShoppingCartIcon/></Button>
        </CardActions>
        }
      </Card>
      ))}
      
    </div>
  );
}
