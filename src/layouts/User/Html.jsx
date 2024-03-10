import ApiClient from "APIs/ApiClient";
import Environment from "Environment/environment";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/profile/components/Header";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Users() {
  const [filters, setfilters] = useState({});
  const [listdata, setdata] = useState([]);
    const SearchState = useSelector((state)=>state)
  const GetUsers = (p = {}) => {
    let filter = { ...filters, ...p };
    ApiClient.get("users").then((res) => {
      if (res.success) {
        setdata(res?.data);
      }
    });
  };

  console.log(SearchState,'====================')

  useEffect(() => {
    GetUsers();
  }, []);

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
                    <label for="hs-table-search" class="sr-only">
                      Search
                    </label>
                    <input
                      type="text"
                      name="hs-table-search"
                      id="hs-table-search"
                      class="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Search Here"
                    />
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
                          Email
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
                              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 flex justify-start items-center">
                                <img
                                  src={Environment.API_URL + itm?.image}
                                  className="w-8 h-8 rounded-full"
                                  alt=""
                                />
                                <p className="ml-2 cursor-pointer">
                                  {" "}
                                  {itm?.firstName} {itm?.lastName}
                                </p>
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                {itm?.email}
                              </td>

                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {itm?.address || "--"}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {moment(itm?.createdAt).format("DD-MMM-YYYY")}
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                <button
                                  type="button"
                                  class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                >
                                  Delete
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

export default Users;
