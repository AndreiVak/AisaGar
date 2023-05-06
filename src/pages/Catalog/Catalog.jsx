import React, {useEffect, useState} from 'react';
import Card from "../../components/Card/Card";
import axios from "../../utils/axios";
import {Link, useNavigate, useParams} from 'react-router-dom'
import {menuData} from "../../utils/menuData";
import CategorySelect from "./CategorySelect/CategorySelect";
import OrderSelect from "./OrderSelect/OrderSelect";
import TitleSearch from "./TitleSearch/TitleSearch";



const Catalog = () => {

    const [products, setProducts] = useState([])

    // const navigate = useNavigate()

    const [order, setOrder] = useState('default')

    const [title, setTitle] = useState('')

    const {category } = useParams()

    useEffect(() => {

        let categories = `${category !== 'all' ? 'categories=' + category + '&' : ''}`

        const selectOrder = () => {
            switch (order) {
                case 'asc' : {
                    return `_sort=price&_order=asc&`
                }
                case 'desc' : {
                    return `_sort=price&_order=desc&`
                }
                case 'abc' : {
                    return `_sort=title&_order=asc&`
                }
                case 'weight' : {
                    return `_sort=weight&_order=asc&`
                }case 'calories' : {
                    return `_sort=calories&_order=asc&`
                }
                case 'default' : {
                    return ''
                }
            }
        }
        let orders = selectOrder()

        let titleFilter = `${title.length !== 0 ? 'title_like=' + title + '&' : ''}`


        axios(`/products?${categories}${orders}${titleFilter}`)
            .then(({data}) => setProducts(data))
            .catch((err) => console.log('данные не получены'))
    },[category, order, title])

    return (
        <section className='catalog'>
            <div className="container">
                <div className="catalog__content">
                    <aside className="catalog__aside">
                        {/*<label className='catalog__aside-label'>*/}
                        {/*    <select onChange={(e) => navigate(`/catalog/${e.target.value}`)} className='catalog__aside-select' name="" id="">*/}
                        {/*        <option selected={category === 'all'} value="all">Все категории</option>*/}
                        {/*        {*/}
                        {/*            menuData.map((item) => (*/}
                        {/*                <option selected={item.en === category} key={item.en} value={item.en}>{item.ru}</option>*/}
                        {/*            ))*/}
                        {/*        }*/}
                        {/*    </select>*/}
                        {/*</label>*/}
                        <CategorySelect/>
                        <OrderSelect order={order} setOrder={setOrder}/>
                        <TitleSearch title={title} setTitle={setTitle}/>
                    </aside>
                    <div className="catalog__right">
                        <h2 className='catalog__crumbs'>
                            <Link to={'/'}>Главная</Link> / {
                            category !== 'all' ? menuData.find(item => item.en === category).ru : 'Все блюда'
                        }
                        </h2>
                        <div className="catalog__row">
                            {
                                products.map((item) => (
                                    <Card key={item.id} item={item}/>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Catalog;