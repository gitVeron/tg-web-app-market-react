import React from 'react';
import Button from '../Button/Button';
import './ProductItem.css';

const ProductItem = ({product, className, onAdd}) => {
    const onAddHandler = () => {
        onAdd(product);
    }
    return (
        <div className={'product ' + className}>
            <div className={'img'}>< img style={{height: 100, display: "block", margin: '0 auto'}} src={product.img} alt={product.name}/></div>
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