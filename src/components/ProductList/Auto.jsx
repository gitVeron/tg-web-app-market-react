import React, { useCallback, useState, useEffect} from 'react';
import '../Form/Form.css';
import { useTelegram } from '../hooks/useTelegram';
import file from './1.json';
import ProductItem from '../ProductItem/ProductItem';

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const Auto = () => {
        const [startIndex, setStartIndex] = useState([0]);
        const [searchString, setSearchString] = useState([]);

        let currentData = file.slice(startIndex, file.length);

        if (searchString != '') {
            currentData = [];
            file.forEach(element => {
                let search = searchString.searchString.toLowerCase()
                let string = element.title.toLowerCase()
                if (string.includes(search) ) {
                    currentData.push(element);
                }
            });
        }

        const [addedItems, setAddedItems] = useState([]);
        const {tg, queryId} = useTelegram();
    
        const onSendData = useCallback(() => {
            const data = {
                products: addedItems,
                totalPrice: getTotalPrice(addedItems),
                queryId,
            }
            tg.sendData(JSON.stringify(data));
        }, [addedItems])
    
        useEffect(() => {
            tg.onEvent('mainButtonClicked', onSendData)
            return () => {
                tg.offEvent('mainButtonClicked', onSendData)
            }
        }, [onSendData])
    
        useEffect(() => {
            tg.MainButton.setParams({
                text: 'Отправить данные'
            })
        }, [])

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
        const onNext = () => {
            if (currentData.length <= 50) {
                currentData = file;
                setStartIndex(0);
            } else {
                setStartIndex(+startIndex+50);
            }
        }
                const onSearch = (e) => {
            setSearchString({ searchString: e.target.value });
          }
        return (
            <div>
            <div className="Search">
                <input
                className="SearchInput"
                type="text"
                onChange={onSearch}
                placeholder="Поиск"
                />
            </div>
            <div className={'list'}>
                {searchString !== '' ? 
                currentData.map(item => (
                    <ProductItem
                        product={item}
                        onAdd={onAdd}
                        className={'item'}
                    />
                )) :
                currentData.slice(0, 50).map(item => (
                    <ProductItem
                        product={item}
                        onAdd={onAdd}
                        className={'item'}
                    />
                ))}
                <div style={{display: 'block', textAlign: "center"}}><button  disabled={startIndex == 0 ? true : false} onClick={()=> setStartIndex(+startIndex-50)}>Назад</button><button onClick={onNext}>Вперед</button>
                </div>
            </div>
            </div>
        )
}
export default Auto;