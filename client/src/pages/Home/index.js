import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { GetProducts } from '../../apicalls/products';
import { SetLoader } from '../../redux/loadersSlice';
import { message } from 'antd';
import Divider from '../../components/divider';
import {useNavigate} from "react-router-dom";

function Home() {
  const [products, setProducts] = React.useState([])
  const [filters, setFilters] = React.useState({
    status : 'approved',
})
const navigate = useNavigate();
const dispatch = useDispatch();
const {user} = useSelector((state)=>state.users);
const getData = async () => {
  try {
    dispatch(SetLoader(true))
    const response = await GetProducts(filters)
    dispatch(SetLoader(false))
    if (response.success){
      setProducts(response.data)
    }

  } catch (error) {
    dispatch(SetLoader(false))
    message.error(error.message)

    
  }
}
  React.useEffect(()=>{
    getData()},[])
  return (
    <div>
    <div className='grid grid-cols-5 gap-4'>
    {products?.map((product)=>
      { if (product.status === 'approved'){
        return <div className='border border-gray-450 rounded border-solid flex flex-col gap-2 pb-2 cursor-pointer'
        key ={product._id}
        onClick={()=> navigate (`/product/${product._id}`)}
        >
          <img src= {product.images[0]} className='w-full h-52 p-5 rounded-md' alt=""/>
          <div className="px-2 flex flex-col gap-1">
          <h1 className="text-lg font semibold">{product.name}</h1>
          <p className="text-sm max-h-20 overflow-y-auto ">{product.description} </p>
          <Divider />
          <span className="text-xl font-semibold text-green-600 text-center max-h-20 overflow-y-auto ">
            {product.price}  TND
          </span>
          </div>
          </div>
      }}
      
      )}
      </div>
    </div>
      )
}


export default Home