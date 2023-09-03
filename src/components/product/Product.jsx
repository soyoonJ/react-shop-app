'use client';
import useFetchCollection from '@/hooks/useFetchCollection';
import React, { useEffect } from 'react';
import styles from './Product.modules.scss';
import { STORE_PRODUCTS, GET_PRICE_RANGE } from '@/redux/slice/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts } from '@/redux/slice/productSlice';
import ProductList from './productList/ProductList';
import ProductFilter from './productFilter/ProductFilter';
import Loader from '../loader/Loader';

const Product = () => {
  const { data, isLoading } = useFetchCollection('products');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [data, dispatch]);

  const products = useSelector(selectProducts);

  return (
    <section className={styles.product}>
      <aside className={styles.filter}>
        {isLoading ? null : <ProductFilter />}
      </aside>
      <div className={styles.content}>
        {isLoading ? <Loader basic /> : <ProductList />}
      </div>
    </section>
  );
};

export default Product;
