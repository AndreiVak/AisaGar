import {createContext, useEffect, useState} from "react";
import axios from "axios";



export const CustomContext = createContext()

export const Context = (props) => {

    const [products, setProducts] = useState([])

    const [basket, setBasket] = useState([])

    const [user, setUser] = useState({
        email : ''
    })




    const addBasket =  (product) => {
        setBasket(prev => [...prev, {
            ...product,
            count: 1
        }])


    }


    const plusOneBasket = (id) => {
        setBasket(prev => prev.map(item => {
                if (item.id === id) {
                    return {...item, count: item.count + 1}
                }
                return item
            } )
        )
    }

    const delBasket = (id) => {
        setBasket(prev => prev.filter(item => item.id !== id))

    }

    const minusOneBasket = (id) => {

        let count = basket.find(item => item.id === id).count

        if (count === 1) {
            setBasket(prev => prev.filter(item => item.id !== id))
        } else {
            setBasket(prev => prev.map(item => {
                    if (item.id === id) {
                        return {...item, count: item.count - 1}
                    }
                    return item
                } )
            )
        }


    }


    useEffect(() => {
        if (localStorage.getItem('user') !== null){
            setUser(JSON.parse(localStorage.getItem('user')))
        }

        if (localStorage.getItem('basket') !== null) {
            setBasket(JSON.parse(localStorage.getItem('basket')))
        }

    }, [])


    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(basket))
    }, [basket])


    const getAllProducts = () => {
        axios('http://localhost:8080/products')
            .then(({data}) => setProducts(data))
            .catch((err) => console.log(err))
    }




    const value = {
        user,
        setUser,
        products,
        setProducts,
        getAllProducts,
        basket,
        addBasket,
        plusOneBasket,
        minusOneBasket,
        delBasket
    }

    return <CustomContext.Provider value={value}>
        {props.children}
    </CustomContext.Provider>

}