import React, {useContext} from 'react';
import {BsCart3} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {CustomContext} from "../../utils/Context";

const Card = ({item}) => {

    const navigate = useNavigate()

    const {addBasket, basket, plusOneBasket, minusOneBasket} = useContext(CustomContext)

    console.log(item)
    return (
        <div className="products__card">
            <img onClick={() => navigate(`/product/${item.id}`)} src={`${item.image === '.' ? '../' : ''}${item.image}`} alt={item.title} className="products__card-img"/>
            <div className="products__card-info">
                <div className="products__card-name">
                    <h3 className="products__card-title">
                        {item.title}
                    </h3>
                    <p className="products__card-weight">
                        Вес: {item.weight} г
                    </p>
                </div>
                <p className="products__card-desc">
                    {item.description}
                </p>

                {
                    basket.findIndex(product => product.id === item.id) > -1
                        ?  <div className='products__card-buy'>
                            <button onClick={() => minusOneBasket(item.id)} style={{width: '62px', height:'44px'}} type='button' className="products__card-btn header__btn">
                                <svg width="18" height="4" viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect y="3.63635" width="3.27273" height="18" rx="1.63636" transform="rotate(-90 0 3.63635)" fill="white"/>
                                </svg>

                            </button>
                            <p className="products__card-price">
                                {item.price} ₽
                            </p>
                            <button onClick={() => plusOneBasket(item.id)} style={{width: '62px', height:'44px'}} type='button'  className="products__card-btn header__btn">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="7.36365" width="3.27273" height="18" rx="1.63636" fill="white"/>
                                    <rect y="10.6364" width="3.27273" height="18" rx="1.63636" transform="rotate(-90 0 10.6364)" fill="white"/>
                                </svg>

                            </button>

                            <div className='products__card-circle'>
                                {basket.find(product => product.id === item.id).count}
                            </div>
                        </div>
                        :  <div className="products__card-buy">
                            <p className="products__card-price">
                                {item.price} ₽
                            </p>
                            <button type='button' onClick={() => addBasket(item)} className="products__card-btn header__btn">
                                В корзину
                                <BsCart3 size={20}/>
                            </button>
                        </div>
                }
            </div>
        </div>
    );
};

export default Card;