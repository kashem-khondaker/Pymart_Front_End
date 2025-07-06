import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../services/api-client";
import authApiClient from "../services/auth-api-client";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [categories, setCategories] = useState([]);
  const [productId, setProductId] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [images , setImages] = useState([]);

  useEffect(() => {
    apiClient.get("/categories/").then((response) => {
      console.log(response.data);
      setCategories(response.data);
    });
  }, []);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const handleProductAdd = async (data) => {
    // convert string inputs to numbers
    console.log(data);
    const formattedData = {
      ...data,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
      category: parseInt(data.category),
    };

    console.log("Submitting data:", formattedData);

    try {
      const productResponse = await authApiClient.post(
        "/products/",
        formattedData
      );
      console.log("Product added successfully", productResponse.data);
      setProductId(productResponse.data.id);
    } catch (error) {
      console.error(
        "Error adding product:",
        error.response?.data || error.message
      );
    }
  };

  //handleImageChange
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    console.log(files);
    setImages(files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  // handleUpload
  const handleUpload = async() => {
    if (!images.length) return alert("Please select images .")

    try {
        for (const image of images) {
            const formData = new FormData();
            formData.append("image" , image);
            console.log(formData);
            await authApiClient.post(`/products/61/images/`,formData);
        }
        alert("Images uploaded successfully .")
    } catch (error) {
        console.error("Upload Images Error:", error.response?.data || error.message);
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg ">
      <h2 className="text-2xl font-semibold mb-4">Add New Product </h2>
      {productId ? (
        <form onSubmit={handleSubmit(handleProductAdd)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Product name</label>
            <input
              {...register("name", { required: true })}
              className="input input-bordered w-full"
              placeholder="Product Name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">This field is required </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium"> Description</label>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered w-full"
              placeholder="Description"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs"> This field is required </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium"> Price</label>
            <input
              type="text"
              {...register("price", {
                required: "This field is required ",
                validate: (value) => {
                  const inputValue = parseFloat(value);
                  return !isNaN(inputValue) || "Please input a valid number";
                },
              })}
              className="input input-bordered w-full"
              placeholder="Price"
            />
            {errors.price && (
              <p className="text-red-500 text-xs"> {errors.price.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium"> Stock Quantity</label>
            <input
              type="number"
              {...register("stock", { required: true })}
              className="input input-bordered w-full"
              placeholder="Stock"
            />
            {errors.price && (
              <p className="text-red-500 text-xs"> This field is required </p>
            )}
          </div>
          {/* DropDown for Categories */}

          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              {...register("category", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs"> This field is required </p>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full">
            {" "}
            Add Product
          </button>
        </form>
      ) : (
        <div>
          <h3 className="text-lg font-medium mb-2"> Upload Product Images</h3>
          <input
            type="file"
            multiple
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={handleImageChange}
          />
          {previewImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
              {previewImages.map((src, inx) => (
                <div
                  key={inx}
                  className="w-full h-28 sm:h-32 md:h-36 rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    src={src}
                    alt={`Preview ${inx}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          )}

          <button
          onClick={handleUpload} 
          className="btn btn-primary w-full mt-2">
            {" "}
            Upload Images
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
