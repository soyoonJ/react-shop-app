"use client";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaCartArrowDown } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import styles from "./Dashboard.module.scss";
import useFetchCollection from "@/hooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  CALCULATE_TOTAL_ORDER_AMOUNT,
  selectOrderHistory,
  selectTotalOrderAmount,
  STORE_ORDERS,
} from "@/redux/slice/orderSlice";
import { STORE_PRODUCTS } from "@/redux/slice/productSlice";
import Heading from "@/components/heading/Heading";
import InfoBox from "@/components/infoBox/InfoBox";
import priceFormat from "@/utils/priceFormat";
import Chart from "@/components/chart/Chart";

const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />;
const productIcon = <BsCart4 size={30} color="#1f93ff" />;
const ordersIcon = <FaCartArrowDown size={30} color="#4385f4" />;

const DashboardClient = () => {
  const dispatch = useDispatch();
  const products = useFetchCollection("products");
  const { data } = useFetchCollection("orders");
  const totalOrderAmount = useSelector(selectTotalOrderAmount);
  const orders = useSelector(selectOrderHistory);

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: products.data,
      })
    );
    dispatch(STORE_ORDERS(data));
    dispatch(CALCULATE_TOTAL_ORDER_AMOUNT());
  }, [dispatch, data, products]);

  return (
    <div className={styles.home}>
      <Heading title="관리자 대시보드" />
      <div className={styles.infoBox}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title="수익"
          count={`${priceFormat(Number(totalOrderAmount))}원`}
          icon={earningIcon}
        />

        <InfoBox
          cardClass={`${styles.card} ${styles.card2}`}
          title="총상품"
          count={`${products.data.length}개`}
          icon={productIcon}
        />

        <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          title="총 주문건수"
          count={`${orders.length}건`}
          icon={ordersIcon}
        />
      </div>

      <div>
        <Chart />
      </div>
    </div>
  );
};

export default DashboardClient;
