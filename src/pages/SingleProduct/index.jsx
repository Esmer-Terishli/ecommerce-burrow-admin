import { useEffect, useState } from "react";
import "../../assets/styles/_SingleProduct.style.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import { formatImgUrl } from "../utils";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";

const SingleProduct = () => {
  const history = useHistory();
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const deleteProduct = () => {
    axios
      .delete(`/api/products/${id}`)
      .then(() => history.push("/"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="singleProduct w-full flex flex-col items-center my-4">
      <img
        height="400px"
        width="400px"
        src={product ? formatImgUrl(product.productImage) : ""}
        alt=""
        className="my-8"
      />

      <h1 className="pb-4">
        <span className="font-bold">Name: </span> {product?.name}
      </h1>
      <button className="btn-edit">
        <Link to={`/edit/${id}`}>
          Edit <FontAwesomeIcon icon={faEdit} />
        </Link>
      </button>
      <button onClick={() => deleteProduct()} className="btn btn-red">
        Delete <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default SingleProduct;
