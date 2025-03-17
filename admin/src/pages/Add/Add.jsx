import React, { useState, useEffect } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from "axios";
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const Add = () => {
  const url = "http://localhost:5001"; 
  const [images, setImages] = useState([]); 
  const [productId, setProductId] = useState('');
  const [date, setDate] = useState('');
  const [data, setData] = useState({
    name: "",
    description: "",
    specificDescription: "",  // Add specificDescription state
    wholesalePrice: "",
    retailPrice: "",
    quantity: "",
    category: "", 
    supplierName: ""
  });
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const generateProductId = () => {
      const id = 'PROD-' + Math.floor(Math.random() * 1000000);
      setProductId(id);
    };
    generateProductId();

    const currentDate = new Date().toISOString().split('T')[0];
    setDate(currentDate);

    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(`${url}/api/suppliers/getSuppliers`);
        setSuppliers(response.data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSuppliers();
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (parseFloat(data.wholesalePrice) > parseFloat(data.retailPrice)) {
      alert('Retail price cannot be less than wholesale price!');
      return;
    }

    const formData = new FormData();
    formData.append("productId", productId);
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("specificDescription", data.specificDescription); // Add specificDescription to the formData
    formData.append("category", data.category);
    formData.append("wholesalePrice", data.wholesalePrice);
    formData.append("retailPrice", data.retailPrice);
    formData.append("quantity", data.quantity);
    formData.append("supplierName", data.supplierName);
    formData.append("date", date);

    try {
      const response = await axios.post(`${url}/api/product/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          specificDescription: "", // Reset specificDescription state
          wholesalePrice: "",
          retailPrice: "",
          quantity: "",
          category: "",
          supplierName: ""
        });
        setImages([]);
        setProductId('');
        setDate('');

        confirmAlert({
          title: 'Product Added',
          message: 'The product has been successfully added.',
          buttons: [
            {
              label: 'OK',
              onClick: () => {}
            }
          ]
        });
      } else {
        alert('Error adding product');
      }
    } catch (error) {
      alert('An error occurred while adding the product');
    }
  };

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length > 4) {
      alert('You can upload a maximum of 4 images.');
      return;
    }
    setImages(selectedFiles);
  };

  return (
    <div className="dashboard">
      <div className="PrdAddSidebar">
        <ul className="sidebar-list">
          <li className="sidebar-item"><Link to="/dashboard/admin">Dashboard</Link></li>
          <li className="sidebar-item"><Link to="/add">Add Items</Link></li>
          <li className="sidebar-item"><Link to="/list">Inventory</Link></li>
          <li className="sidebar-item"><Link to="/orders">Orders</Link></li>
          <li className="sidebar-item"><Link to="/users">Users</Link></li>
          <li className="sidebar-item"><Link to="/sales">Sales</Link></li>
          <li className="sidebar-item"><Link to="/register"> Register Employee</Link></li>
          <li className="sidebar-item"><Link to="/acess"> Other Dashboards</Link></li>
        </ul>
      </div>
      
      <div className="add-container">
        <form className='flex-col' onSubmit={onSubmitHandler}>
          <div className="add-product-id">
            <p>Product ID</p>
            <input type="text" name='productId' value={productId} readOnly />
          </div>

          <div className="add-img-upload flex-col">
            <p>Upload Images (Max 4)</p>
            <label htmlFor="image">
              <div className="image-preview-container">
                {images.length > 0 ? (
                  images.map((img, index) => (
                    <img key={index} src={URL.createObjectURL(img)} alt={`preview-${index}`} className="image-preview" />
                  ))
                ) : (
                  <img src={assets.upload_area} alt="upload-area" />
                )}
              </div>
            </label>
            <input onChange={handleImageChange} type="file" id="image" multiple hidden />
          </div>

          <div className="add-product-name flex-col">
            <p>Product Name</p>
            <input type="text" name='name' placeholder='Type here' value={data.name} onChange={onChangeHandler} required />
          </div>

          <div className="add-product-description flex-col">
            <p>Product Description</p>
            <textarea name="description" rows="6" placeholder='Write content here' value={data.description} onChange={onChangeHandler}></textarea>
          </div>

          {/* Add Specific Description field */}
          <div className="add-product-specific-description flex-col">
            <p>Specific Description</p>
            <textarea
              name="specificDescription"
              rows="6"
              placeholder="Enter specific details here"
              value={data.specificDescription}
              onChange={onChangeHandler}
            />
          </div>

          <div className="add-category-price-quantity">
            <div className="add-category flex-col">
              <p>Product Category</p>
              <select name="category" value={data.category} onChange={onChangeHandler} required>
                <option value="">Select a category</option>
                <option value="Brand New">Brand New </option>
                <option value="Pre Owned"> Pre Owned</option>
                <option value="Accessories">Accessories</option>
                <option value="Build">Build</option>
              </select>
            </div>

            <div className="add-price flex-col">
              <p>Wholesale Price</p>
              <input type="number" name='wholesalePrice' placeholder='LKR 100' value={data.wholesalePrice} onChange={onChangeHandler} required />
              <p>Retail Price</p>
              <input type="number" name='retailPrice' placeholder='LKR 100' value={data.retailPrice} onChange={onChangeHandler} required />
            </div>

            <div className="add-quantity flex-col">
              <p>Quantity</p>
              <input type="number" name='quantity' placeholder='Enter quantity' value={data.quantity} onChange={onChangeHandler} required />
            </div>
          </div>

          <div className="add-supplier-name flex-col">
            <p>Supplier Name</p>
            <select name='supplierName' value={data.supplierName} onChange={onChangeHandler} required>
              <option value="">Select a supplier</option>
              {suppliers.map(supplier => (
                <option key={supplier._id} value={supplier.name}>{supplier.name}</option>
              ))}
            </select>
          </div>

          <div className="add-date">
            <p>Date</p>
            <input type="text" name='date' value={date} readOnly />
          </div>

          <button type='submit' className='add-btn'>ADD</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
