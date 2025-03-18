import React, { useCallback, useState, useEffect} from 'react';
import './Form.css';
import { useTelegram } from '../hooks/useTelegram';
import file from '../ProductList/1.json';
import ProductItem from '../ProductItem/ProductItem';
import {Link} from 'react-router-dom';

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const Form = () => {
        return (
            <div>
                <Link to="/1" style={{display: 'block',textAlign: 'center'}}>Товары для Авто и мото</Link>
                <Link to="/2" style={{display: 'block',textAlign: 'center'}}>Бытовая техника и электроника</Link>
                <Link to="/3" style={{display: 'block',textAlign: 'center'}}>Детские товары</Link>
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