"use client";

import styles from "./Orders.module.scss";
import useFetchCollection from "@/hooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { selectOrderHistory, STORE_ORDERS } from "@/redux/slice/orderSlice";
import { useEffect } from "react";
import Heading from "@/components/heading/Heading";
import Loader from "@/components/loader/Loader";
import { formatTime } from "@/utils/day";
import priceFormat from "@/utils/priceFormat";

const OrdersClient = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const dispatch = useDispatch();
  const router = useRouter();

  const orders = useSelector(selectOrderHistory);

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  const handleClick = (id) => {
    router.push(`/admin/order-details/${id}`);
  };

  return (
    <div className={styles.order}>
      <Heading title="주문 내역" subtitle="주문 상태 변경" />
      <>
        {isLoading && <Loader basic />}
        <div className={styles.table}>
          {orders.length === 0 ? (
            <p>주문 목록이 없습니다.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>순서</th>
                  <th>주문 날짜</th>
                  <th>주문 아이디</th>
                  <th>주문 금액</th>
                  <th>주문 상태</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => {
                  const { id, orderDate, orderTime, orderAmount, orderStatus } =
                    order;

                  return (
                    <tr key={id} onClick={() => handleClick(id)}>
                      <td>{index + 1}</td>
                      <td>{formatTime(orderDate)}</td>
                      <td>{id}</td>
                      <td>{priceFormat(orderAmount)}원</td>
                      <td>
                        <p
                          className={
                            orderStatus !== "배송완료"
                              ? `${styles.pending}`
                              : `${styles.delivered}`
                          }
                        >
                          {orderStatus}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </>
    </div>
  );
};

export default OrdersClient;
