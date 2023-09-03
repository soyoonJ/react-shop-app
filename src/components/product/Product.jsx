'use client';
import useFetchCollection from '@/hooks/useFetchCollection';
import React, { useEffect } from 'react';
import styles from './Product.modules.scss';
import { STORE_PRODUCTS } from '@/redux/slice/productSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectProducts } from '@/redux/slice/productSlice';

const Product = () => {
  const { data, isLoading } = useFetchCollection('products');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [data, dispatch]);

  const products = useSelector(selectProducts);

  return (
    <section className={styles.product}>
      <aside className={styles.filter}></aside>
      <div className={styles.content}></div>
    </section>
  );
};

export default Product;
