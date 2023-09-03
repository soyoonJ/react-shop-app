import {
  selectMaxPrice,
  selectMinPrice,
  selectProducts,
} from '@/redux/slice/productSlice';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ProductFilter = () => {
  const [category, setCategory] = useState('All');
  const [brand, setBrand] = useState('All');
  const [price, setPrice] = useState('10000');

  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);
  const dispatch = useDispatch();

  const allCategories = [
    'All',
    ...new Set(products.map((product) => product.category))
  ]

  const filterCategories = (category) => {
  setCategory(category)
}

  return <div>ProductFilter</div>;
};

export default ProductFilter;
