import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetProductById, GetProducts } from "../../apicalls/products";
import { SetLoader } from "../../redux/loadersSlice";
import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Divider from "../../components/divider";
import moment from "moment"; 

function ProductInfo() {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [product, setProduct] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      console.log(id);
      const response = await GetProductById(id);
      dispatch(SetLoader(false));
      if (response.success) {
        setProduct(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  React.useEffect(() => {
    getData();
  }, []);
  return (
    product && (
      <div>
        <div className="grid grid-cols-2 gap-5">
          {/* images*/}
          <div className="flex flex-col gap-5">
            <img
              className="w-full h-96 object-cover rounded-md "
              src={product.images[selectedImageIndex]}
              alt=""
            />
            <div className="flex gap-5">
              {product.images.map((image, index) => {
                return (
                  <img
                    className={"w-20 h-20 object-cover rounded-md cursor-pointer " + (selectedImageIndex ===index ? "border-2 border-green-700 border-solid":"")
                }
                onClick={()=> setSelectedImageIndex(index)}
                src={image}
                    alt=""
                  />
                );
              })}
            </div>
          </div>

          {/*detailes */}
          <div className="flex flex-col gap-2">
            <div>
              <h1 className="text-3xl font semihold text-blue-900">
                {product.name}
              </h1>
              <span>{product.description}</span>
            </div>
            <Divider />
            <div className="flex flex-col">
              <h1 className="text-3xl font semihold text-blue-900">
                Product Details
              </h1>
              <div className="flex justify-between mt-2">
                <span>Price</span>
                <span>{product.price}  TND</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Category</span>
                <span className="uppercase">{product.category}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Negociable</span>
                <span>{product.billAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Warranty</span>
                <span>{product.warrantyAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Accessories</span>
                <span>{product.accessoriesAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Added On</span>
                <span>{moment(product.createdAt).format("DD-MM-YYYY HH:mm")}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Updated At</span>
                <span>{moment(product.updatedAt).format("DD-MM-YYYY HH:mm")}</span>
              </div>
            </div>
          
          <Divider/>


          <div className="flex flex-col">
              <h1 className="text-3xl font semihold text-blue-900">
                Seller Details
              </h1>
              <div className="flex justify-between mt-2">
                <span>Name</span>
                <span>{product.seller.name}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Email</span>
                <span className="uppercase">{product.seller.email}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Telephone</span>
                <span className="uppercase">{product.seller.telephone}</span>
              </div>
              </div>
            </div>
          
          </div>
        </div>
      
    )
  );
}

export default ProductInfo;
