import React, { useEffect, useState ,useRef } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {

  let dispatch = useDispatchCart();
  let data = useCart()
  const priceRef = useRef();
  let options = props.options;
  const priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");


  const handleAddToCard = async () => {
    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })


    // setBtnEnable(true)
  };

  let finalPrice = qty * parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[]);
  return (
    <div className='m-3' style={{ display: 'inline-block', width: '18rem' }}>
      <div className="card" style={{ width: '100%' }}>
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ objectFit: 'cover', height: '200px', width: '100%' }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text" style={{ fontSize: 'small' }}>{props.foodItem.description}</p>
          <div className='container w-100'>
            <select className='m-2 h-100 success-light' onChange={(e)=> setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>

            <select className='m-2 h-100 success-light rounded' ref={priceRef} onChange={(e)=> setSize(e.target.value)} >
              {priceOptions.map((data) => (
                <option key={data} value={data}>{data}</option>
              ))}
            </select>
            <div className='d-inline h-100 fs-5'>
            ₹{finalPrice}/-
            </div>
            <hr />
            <button className={'btn btn-success justify-centre ms-2'} onClick={handleAddToCard}>Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
