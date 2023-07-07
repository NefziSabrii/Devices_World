import React, { useEffect } from "react";
import { message } from "antd";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../redux/loadersSlice";
import { SetUser } from "../redux/usersSlice";

function ProtectedPage({ children }) {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateToken = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetCurrentUser();
      dispatch(SetLoader(false));
      if (response.success) {
        dispatch(SetUser(response.data));
        // SetUser(response.data);
      } else {
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      navigate("/login");
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      message.error("please login to continue");
      navigate("/login");
    }
  }, []);
  return (
    user && (
      <div>
        {/*Header*/}
        <div className="flex justify-between items-center bg-primary p-5">
          <h1 className="text-3xl text-white cursor-pointer"
          onClick={() => navigate("/")}>
            Devices World
          </h1>
          <div className="bg-white py-2 px-5 rounded flex gap-1 item-center">
            
            <span className="cursor-pointer uppercase"
            onClick={()=> {
              if(user.role === "user")
              {
                navigate("/profile");
              }else {
                navigate("/admin");
              }
            }}
            
            >
              {  user.name}
            </span>
            <i
              className="ri-logout-box-line ml-20"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>
        <div className="p-5">{children}</div>
      </div>
    )
  );
}

export default ProtectedPage;
