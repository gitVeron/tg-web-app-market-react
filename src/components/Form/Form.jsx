import React, { useCallback, useState, useEffect} from 'react';
import './Form.css';
import { useTelegram } from '../hooks/useTelegram';
import file from '../ProductList/1/1.json';
import ProductItem from '../ProductItem/ProductItem';

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const Form = () => {
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
    /*
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('phisical');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            country,
            street,
            subject
        }
        tg.sendData(JSON.stringify(data));
    }, [country, street, subject])

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

    useEffect(() => {
        if(!country || !street) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, street])

    const onChangeCountry = (e) => {
        setCountry(e.target.value);
    }
    const onChangeStreet = (e) => {
        setStreet(e.target.value);
    }
    const onChangeSubject = (e) => {
        setSubject(e.target.value);
    }

    return (
        <div className={'form'}>
            <h3>Введите ваши данные</h3>
            <input className={'input'} type='text' placeholder={'Страна'} value={country} onChange={onChangeCountry}/>
            <input className={'input'} type='text' placeholder={'Улица'} value={street} onChange={onChangeStreet}/>
            <select className={'select'} value={subject} onChange={onChangeSubject}>
                <option className={'select'} value={'phisical'}>Физ. лицо</option>
                <option className={'select'} value={'legal'}>Юр. лицо</option>
            </select>
        </div>
    )
*/
}
export default Form;