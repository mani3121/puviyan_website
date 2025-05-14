import React from 'react';

const Product = () => {
  return (
    <div className="product-component">
      <h2>Our Products</h2>
      <div className="product-images">
        {/* Example product image, ensure to replace with actual product images */}
        <img src="https://via.placeholder.com/300" alt="Product" loading="lazy" />
        <img src="https://via.placeholder.com/300" alt="Product" loading="lazy" />
        <img src="https://via.placeholder.com/300" alt="Product" loading="lazy" />
      </div>
    </div>
  );
};

export default Product;