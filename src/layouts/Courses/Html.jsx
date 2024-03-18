import ApiClient from "APIs/ApiClient";
import Environment from "Environment/environment";
import Loader from "Redux/Action/Loader";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/profile/components/Header";
import moment from "moment";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Courses() {
  const [filters, setfilters] = useState({});
  const [listdata, setdata] = useState([]);

  const history = useHistory();
  const SearchState = useSelector((state) => state?.Reducer?.search);

  const GetCourses = (p = {}) => {
    Loader(true);
    let filter = { ...filters, ...p };
    ApiClient.get("courses", filter).then((res) => {
      if (res.success) {
        setdata(res?.data);
        Loader(false);
      }
    });
  };

  const ChangeStatus = (status, id) => {
    if (window.confirm("Do you want to change status")) {
      ApiClient.put("course", { status: status == "active" ? "inactive" : "active", id }).then(
        (res) => {
          if (res.success) {
            toast.success("Status updated successfuly");
            GetCourses();
          }
        }
      );
    } 
  };

  const Edit = (id)=>{
    history.push(`/edit-course/${id}`)
    console.log(id,'===================')
  }

  console.log(SearchState);

  useEffect(() => {
    GetCourses();
  }, [SearchState]);

  return (
    <>
      <DashboardLayout>
        <Header />
        <div class="flex flex-col">
          <div class="-m-1.5 overflow-x-auto bg-[linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%]">
            <div class="p-1.5 min-w-full inline-block align-middle">
              <div class="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
                <div class="py-3 px-4">
                  <div class="relative max-w-xs">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        GetCourses({ search: filters.search });
                      }}
                    >
                      <label for="hs-table-search" class="sr-only">
                        Search
                      </label>
                      <input
                        onChange={(e) => {
                          setfilters({ ...filters, search: e.target.value });
                        }}
                        type="text"
                        name="hs-table-search"
                        id="hs-table-search"
                        class="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        placeholder="Search Here"
                      />
                    </form>
                    <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                      <svg
                        class="size-4 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="overflow-hidden">
                  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class=" ">
                      <tr>
                        <th scope="col" class="py-3 px-4 pe-0"></th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-white "
                        >
                          Name
                        </th>

                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-white "
                        >
                          College Name
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-white "
                        >
                          Registeration Fee
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-white "
                        >
                          Total Fee
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-white "
                        >
                          Start Date
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-white "
                        >
                          End Date
                        </th>

                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-white "
                        >
                          Address
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-start text-xs font-medium text-white "
                        >
                          CreatedAt
                        </th>
                        <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-white ">
                          Status
                        </th>
                        <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-white ">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                      {listdata &&
                        listdata?.map((itm) => {
                          return (
                            <tr>
                              <td class="py-3 ps-4"></td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 ">
                                {/* <img
                                  src={Environment.API_URL + itm?.image}
                                  className="w-8 h-8 rounded-full"
                                  alt=""
                                /> */}
                                <p className="ml-2 cursor-pointer"> {itm?.name}</p>
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                {itm?.collegeName}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                {itm?.price}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                {itm?.registrationFees}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {moment(itm?.startDate).format("DD-MMM-YYYY")}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {moment(itm?.endDate).format("DD-MMM-YYYY")}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {itm?.address || "--"}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {moment(itm?.createdAt).format("DD-MMM-YYYY")}
                              </td>
                              <td
                                onClick={() => {
                                  ChangeStatus(itm?.status, itm?.id);
                                }}
                                class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-800 dark:text-gray-200"
                              >
                                {itm?.status == "active" ? (
                                  <div class="b animate-pulse mx-auto h-16 w-14 flex justify-center items-center">
                                    <div class="i h-8 w-16 text-center bg-green-400 items-center rounded-2xl shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110  transition duration-300 ease-out"></div>
                                    <a class="text-center text-white font-semibold z-10 pointer-events-none">
                                      {itm?.status || "--"}
                                    </a>
                                  </div>
                                ) : (
                                  <div class="b animate-pulse mx-auto h-16 w-14 flex justify-center items-center">
                                    <div class="i h-8 w-16 text-center bg-yellow-400 items-center rounded-2xl shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110  transition duration-300 ease-out"></div>
                                    <a class="text-center text-black font-semibold z-10 pointer-events-none">
                                      {itm?.status || "--"}
                                    </a>
                                  </div>
                                )}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                <button type="button">
                                  <DeleteForeverIcon color="error" fontSize="medium" />
                                </button>
                                <button
                                  type="button"
                                  className="ml-5"
                                  onClick={() =>Edit(itm?.id)}
                                >
                                  <EditIcon color="success" fontSize="medium" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

export default Courses;
