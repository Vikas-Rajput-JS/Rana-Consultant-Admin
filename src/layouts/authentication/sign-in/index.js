/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { useEffect, useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";

// Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/signInImage.png";
import ApiClient from "APIs/ApiClient";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "Redux/Action/Action";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [form, setform] = useState({});
  const token = localStorage.getItem("token");
  const HandleSubmit = (e) => {
    e.preventDefault();
    ApiClient.post("admin/login", form).then((res1) => {
      if (res1.success) {
        toast.success(res1.message);
        let setToken = localStorage.setItem("token", res1?.token);
        console.log(setToken);

        ApiClient.get("admin/profile").then((res) => {
          if (res.success) {
            dispatch(LOGIN_SUCCESS(res?.data));
            history.push("/dashboard");
          }
        });
      }
    });
  };

  useEffect(() => {
    if (token) {
      history.push("/dashboard");
    }
  }, [token]);
  return (
    <CoverLayout
      title="Nice to see you!"
      color="white"
      description="Enter your email and password to sign in"
      premotto="INSPIRED BY THE FUTURE:"
      motto="THE VISION UI DASHBOARD"
      image={bgSignIn}
    >
      <div className="w-[100%] flex flex-col h-[40vh] justify-center ">
        <form onSubmit={HandleSubmit}>
          <div className="flex flex-col">
            <label className="text-md text-white">Email</label>
            <input
              type="text"
              className=" w-full mt-2 rounded-2xl bg-[#0f1535] text-white animation duration-200"
              placeholder="Email Address"
              name=""
              onChange={(e) => {
                setform({ ...form, email: e.target.value });
              }}
              value={form?.email}
              required
              id=""
            />
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-md text-white">Password</label>
            <input
              type="password"
              className="animation duration-200 w-full mt-2 rounded-2xl bg-[#0f1535] text-white"
              placeholder="***********"
              name=""
              onChange={(e) => {
                setform({ ...form, password: e.target.value });
              }}
              value={form?.password}
              required
              id=""
            />
            <span className="text-sm cursor-pointer hover:text-blue-800 animation duration-200 text-white mt-2">
              Forgot Password ?
            </span>
          </div>
          <div className="mt-5">
            <button
              type="submit"
              class="before:ease relative h-12 w-full rounded-2xl overflow-hidden border border-green-500 bg-green-500 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-green-500 hover:before:-translate-x-40 font-semibold text-xs"
            >
              <span relative="relative z-10 ">SIGN IN</span>
            </button>
          </div>
        </form>
      </div>
    </CoverLayout>
  );
}

export default SignIn;
