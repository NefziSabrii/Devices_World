// import React, { useEffect } from "react";
import { Form, Button, message} from "antd";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/divider";
import { RegisterUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";

const rules = [
  {
    required: true,
    message: "required",
  },
];


function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true))
      const response = await RegisterUser(values);
      navigate("/login");
      dispatch(SetLoader(false))
      if (response.success) {
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false))
     message.error(error.message);
    }
  };
// block register when token valid
  // useEffect(()=>{
  //   if (localStorage.getItem("token")){
  //     window.location.href = "/";
  //   }
  // },[])

  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-white p-5 rounded w-[750px]">
        <h1 className="text-primary text-2xl">
          <span className="text-black centered-text">REGISTER</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={rules}>
            <input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={rules}>
            <input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Telephone" name="telephone" rules={rules}>
            <input placeholder="telephone number" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <input type="password" placeholder="Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block className="mt-2">
            Register
          </Button>
          <div className="mt-5 text-center">
            <span className="text-gray-500">
              Already have an account ?{" "}
              <Link to="/login" className="primary">
                Login{" "}
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
