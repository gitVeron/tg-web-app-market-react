import React from 'react';
import Button from '../Button/Button';
import './ProductItem.css';

const ProductItem = ({product, className, onAdd}) => {
    const onAddHandler = () => {
        onAdd(product);
    }
    return (
        <div className={'product ' + className}>
            <div className={'img'}>< img style={{height: 100, display: "block", margin: '0 auto'}} src={product.img == 'undefined' ? 'https://sun9-50.userapi.com/impg/LeWdZLUVjvyVF6k6hn6vHoE8bzqZFXirZs4_Pw/4ZGdR1PFkNM.jpg?size=604x604&quality=95&sign=f9564c97620c7c4bd07b8c0ff769d085&type=album' : product.img} alt={product.name}/></div>
            <div className={'title'} style={{textAlign: "center"}}>{product.title}</div>
            <div className={'description'}>{product.description}</div>
            <div className={'price'} style={{textAlign: "center"}}>
                <span>Стоимость: <b>{product.price}</b></span>
            </div>
            <Button className={'add-btn'} onClick={onAddHandler} style={{textAlign: "center"}}>
                Добавить в корзину
            </Button>
        </div>
    )
}
export default ProductItem;