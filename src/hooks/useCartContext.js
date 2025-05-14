import { useContext } from 'react';
import CartContext from '../context/CartContxt';

const useCartContext = () => {
    return useContext(CartContext)
};

export default useCartContext;