import React from "react";

const OrderDetails = ({ params, searchParams }) => {
  const { hello } = searchParams; // /32
  const { id } = params; // ?hello=hi

  // console.log(id); // 'use-client' 적지 않으면 기본적으로 서버 컴포넌트이기 때문에 브라우저가 아닌 터미널에 찍힘

  return (
    // 32
    // hi
    <div>
      {id}
      <br />
      {hello}
    </div>
  );
};

export default OrderDetails;
