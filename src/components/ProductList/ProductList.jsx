import React, { useState, useEffect, useCallback } from 'react';
import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem';
import { useTelegram } from '../hooks/useTelegram';
import file from './1/1.json';

let products = [];

/*
let response = await fetch('https://www.sima-land.ru/trademark/avtoboty/roboty/?c_id=61750&sort=price&viewtype=cards', { method: 'GET', mode: 'cors'//, headers: {
//    "Access-Control-Allow-Origin": 'http://localhost:3000'

//"Content-Type": "application/json",
  //  "Connection": "keep-alive",
//  "Access-Control-Allow-Origin": "*",
//    "Access-Control-Allow-Credentials": "true",
//    "Access-Control-Allow-Methods": "GET, HEAD, POST, DELETE, OPTIONS",
//    "Access-Control-Allow-Headers": "Content-Type"
//  }
 });

if (response.ok) { // если HTTP-статус в диапазоне 200-299
  // получаем тело ответа (см. про этот метод ниже)
  let json = await response.json();
  for (var i = 0; i < json.items.length; i++) {
     console.log(json.items[i].name);
     console.log('S'+json.items[i].sid);
     console.log(json.items[i].wholesale.prices.main);
     console.log(json.items[i].photos);
      products.push({id: i, title: json.items[i].name, price: json.items[i].wholesale.prices.main*2, description: 'S'+json.items[i].sid})
  }
} else {
  alert("Ошибка HTTP: " + response.status);
}

axios.get('https://www.sima-land.ru/iapi/product-list/items/v1/default-view/?page=1&sort=rating&currency=RUB&per-page=100&category_id=46161&page_type=category&f=null&with_adult=1&modifier_limit=5&settlement_id=27504067')
  .then(response => {
    var listitems = response.data;
    for (var i = 0; i < listitems.items.length; i++) {
       console.log(listitems.items[i].name);
       console.log('S'+listitems.items[i].sid);
       console.log(listitems.items[i].wholesale.prices.main);
       console.log(listitems.items[i].photos);
        products.push(...{id: i, title: listitems.items[i].name, price: listitems.items[i].wholesale.prices.main, description: 'S'+listitems.items[i].sid})
    }
 })

const products = [
    {id: '1', title: 'Джинсы', price: 5000, description: 'Синего цвета, прямые'},
    {id: '2', title: 'Куртка', price: 12000, description: 'Зеленого цвета, теплая'},
    {id: '3', title: 'Джинсы 2', price: 5000, description: 'Синего цвета, прямые'},
    {id: '4', title: 'Куртка 8', price: 122, description: 'Зеленого цвета, теплая'},
    {id: '5', title: 'Джинсы 3', price: 5000, description: 'Синего цвета, прямые'},
    {id: '6', title: 'Куртка 7', price: 600, description: 'Зеленого цвета, теплая'},
    {id: '7', title: 'Джинсы 4', price: 5500, description: 'Синего цвета, прямые'},
    {id: '8', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая'},
];
*/
const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('https://75228552cf1a.vps.myjino.ru:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if (alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if (newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }
    return (
        <div className={'list'}>
            {file.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    )
}
export default ProductList;