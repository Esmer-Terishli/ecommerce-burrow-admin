import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/_ProductCard.style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export const ProductCard = ({ id, name, price, discount, imgUrl }) => {
  return (
    <table className="w-full">
      <tbody>
        <tr className="productCard w-full">
          <td className="p-4">
            <Link to={`/products/${id}`}>
              <div className="flex justify-between">
                <div className="img-container">
                  <img src={imgUrl} alt="product" />
                </div>
                <h3 className="name">{name}</h3>
                <h4 className="price">{`Price: ${price}$`}</h4>
                <h4 className="discount">{`Discount: ${discount}`}</h4>
                <button className="btn-edit-green">
                    Edit <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
