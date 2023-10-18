import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { formatImgUrl } from "../utils";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Edit = () => {
  const { id } = useParams();
  const history = useHistory();
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    details: "",
    price: 0,
    discount: 0,
    featured: true,
    image: null,
  });

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then((res) => {
        setFormData(res.data);
        setImagePreview(formatImgUrl(res.data.productImage));
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      featured: event.target.checked,
    }));
  };

  const handleImage = (event) => {
    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      setFormData((prev) => ({
        ...prev,
        image: uploadedImage,
      }));
      const reader = new FileReader();
      reader.readAsDataURL(uploadedImage);
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("details", formData.details);
    data.append("price", Number(formData.price));
    data.append("discount", Number(formData.discount));
    data.append("featured", formData.featured);
    data.append("productImage", formData.image);

    axios
      .put(`/api/products/${id}`, data)
      .then(() => history.push(`/products/${id}`))
      .catch((err) => console.log(err));
  };

  return (
    <div className="edit flex justify-center items-center h-screen bg-gray-200 w-full">
      <form onSubmit={handleSubmit} className="w-96 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl mb-4">Edit Product</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            value={formData.name}
            onChange={handleChange}
            type="text"
            id="name"
            name="name"
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="details" className="block text-sm font-medium text-gray-600">
            Details
          </label>
          <textarea
            onChange={handleChange}
            value={formData.details}
            name="details"
            id="details"
            cols="30"
            rows="5"
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-300"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-600">
            Price
          </label>
          <input
            onChange={handleChange}
            value={formData.price}
            type="number"
            id="price"
            name="price"
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="discount" className="block text-sm font-medium text-gray-600">
            Discount
          </label>
          <input
            onChange={handleChange}
            value={formData.discount}
            type="number"
            id="discount"
            name="discount"
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-300"
          />
        </div>
        {/* <div className="mb-4">
          <label htmlFor="featured" className="block text-sm font-medium text-gray-600">
            Featured ?
          </label>
          <input
            onChange={handleCheckboxChange}
            defaultChecked={formData.featured}
            type="checkbox"
            id="featured"
            name="featured"
            className="mt-1 rounded-md border border-gray-300 focus:ring focus:ring-indigo-300"
          />
        </div> */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-600">
            Upload image
          </label>
          <input onChange={handleImage} type="file" id="image" name="image" />
        </div>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="preview"
            className="w-full h-32 object-cover rounded-lg mb-4"
          />
        )}
        <div className="flex justify-center my-4">
        <Link to="/">
          <button className="px-4 py-2 mr-2 bg-gray-300 rounded-md" type="button">
            Cancel
          </button>
          </Link>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
