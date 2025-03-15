import React from 'react';
import {useState, useEffect} from 'react';
import './Form.css';
import { useTelegram } from '../components/hooks/useTelegram';

const Form = () => {
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('phisical');
    const {tg} = useTelegram();

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
}
export default Form;