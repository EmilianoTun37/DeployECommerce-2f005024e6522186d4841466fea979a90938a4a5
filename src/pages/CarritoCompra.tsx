import { Dispatch, SetStateAction, useState } from 'react';
import '../assets/css/CarritoCompras.css';
import { Product } from '../interfaces/product';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from 'react-router';

const CarritoCompra = () => {
  const carrito: Product[] = JSON.parse(localStorage.getItem('carrito'));

  const navigate = useNavigate();

  let sub = 0;
  
  for (const prod of carrito) {
      prod.quantity = 1;
      prod.total = +prod.price * 1;
      sub += +prod.total;
    }
    
    const [subtotal, setSub] = useState(sub);


  const [list, setList]: [Product[], Dispatch<SetStateAction<Product[]>>] = useState(carrito);


  function add(index) {
    const newArray = [...list];
    newArray[index].quantity++;
    newArray[index].total = newArray[index].quantity * newArray[index].price;

    let subtotal = 0;
    for (const prod of newArray){
        subtotal += +prod.total;
    }

    setSub(+subtotal);

    localStorage.setItem('carrito', JSON.stringify(newArray));
    setList(newArray);
  }

  function less(index) {
    const newArray = [...list];
    newArray[index].quantity--;

    if (newArray[index].quantity > 0) {
      newArray[index].total = newArray[index].quantity * newArray[index].price;
    } else {
      newArray.splice(index, 1);
    }

    let subtotal = 0;
    for (const prod of newArray){
        subtotal += +prod.total;
    }

    setSub(+subtotal);

    localStorage.setItem('carrito', JSON.stringify(newArray));
    setList(newArray);
  }

  const PaypalButton = ({totalValue, invoice}) => {
    return (
      <PayPalButtons 
        createOrder={(data, actions) => {
          console.log(data)
          return actions.order.create({
            purchase_units: [
              {
                description: invoice,
                amount: {
                  value: totalValue.toString(),
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          console.log(data);
          const order = await actions.order?.capture();
          console.log("order", order);
          
          localStorage.setItem('carrito', JSON.stringify([]));
          navigate('/');
        }}
      />
    );
  };

  return (
    <div className="container py-5">
      <div className="carrito w-100 d-flex gap-5">
        <div className="left w-100 d-flex flex-column">
          <div className="left__header mb-3">
            <div className="d-flex flex-column">
              <span className="h3 m-0">Carrito de compras</span>
              <span className="h6">Administra tus productos</span>
            </div>
            {/* <button className="carrito__btn carrito__btn--left">
              Volver atrás
            </button> */}
          </div>
          <div className="left__list flex-column d-flex w-100 gap-3">
            {list.map((producto, index) => (
              <div
                className="card d-flex align-items-center flex-row pe-4"
                key={index}
              >
                <div className="producto-img me-4"></div>
                <div className="d-flex flex-column my-auto">
                  <span className="fw-bold">{producto.nameProduct}</span>
                  <span>${producto.price}</span>
                </div>
                <div className="d-flex gap-1 ms-auto align-items-center">
                  <button
                    className="menos-cantidad"
                    onClick={() => {
                      less(index);
                    }}
                  >
                    -
                  </button>
                  <div className="producto-cantidad">{producto.quantity}</div>
                  <button
                    className="mas-cantidad"
                    onClick={() => {
                      add(index);
                    }}
                  >
                    +
                  </button>
                  {/* <button className="producto-quitar text-danger ms-2">
                    <i className="material-icons">delete</i>
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="right w-100 d-flex flex-column">
          <div className="card p-5 d-flex w-100 flex-column">
            <span className="h5 mb-5">Resumen de compra</span>
            <div className="card__list d-flex flex-column w-100 gap-2">
              {list?.map((producto, index) => (
                <div
                  className="item d-flex gap-1 align-items-center w-100"
                  key={index}
                >
                  <span className="item-name">{producto.nameProduct}</span>
                  <span className="item-cantidad">(x{producto.quantity})</span>
                  <span className="item-precio ms-auto">${producto.total}</span>
                </div>
              ))}
            </div>
            <div className="mt-auto w-100 d-flex align-items-center justify-content-between">
              <span className="subtotal h5 m-0">Subtotal</span>
              <span className="subtotal_precio">${subtotal}</span>
            </div>
            <p className="text-muted w-100 my-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              inventore veritatis obcaecati corrupti quidem modi!
            </p>
            <PaypalButton totalValue={subtotal} invoice="Compra en mi tienda" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarritoCompra;
