/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import Loader from "../Loader/Loader";
import Dropdown from "../Dropdown";
import Pagination from "./Pagination";
import { getByStatusText } from "../../utils/color.util";
// import { IEmptyState } from "../../utils/icons.utils";
import { useLayoutEffect, useRef, useState } from "react";
import Emptystate from "../Emptystate";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function CustomTable({
  printMod,
  data,
  pagination,
  setPagination,
  isLoading,
  action,
  tableMsg,
  checkboxAction,
}) {
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  // const handleFilter = (e) => !["", null, undefined].includes(e);

  useLayoutEffect(() => {
    if (checkboxAction) {
      const isIndeterminate =
        checkboxAction?.values?.length > 0 &&
        checkboxAction?.values?.length < data?.length;
      setChecked(
        data?.length !== 0 && checkboxAction?.values?.length === data?.length
      );
      setIndeterminate(isIndeterminate);
      if (checkbox.current) checkbox.current.indeterminate = isIndeterminate;
      checkboxAction?.setValues?.(checkboxAction?.values);
    }
  }, [checkboxAction?.values]);

  function toggleAll() {
    checkboxAction?.setValues(
      checked || indeterminate ? [] : data?.map((d) => d?._data)
    );
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  const keys = Object?.keys(data?.[0] || {})?.filter((n) => !n.startsWith("_"));

  return (
    <>
      {/* {!isLoading && ( */}

      <div>
        <div
          className={`${
            pagination?.total && "border"
          } border-grey_3 mt-5   overflow-x-auto `}
        >
          <div className="flow-root">
            <div className="">
              <div className="inline-block min-w-full align-middle">
                <div className="relative">
                  <table className="min-w-full table-fixe divide-y divide-gray-300 z-20">
                    <thead
                      className={`bg-light_blue ${
                        pagination?.total === 0 ? "hidden" : ""
                      }`}
                    >
                      <tr>
                        {!printMod?.enable &&
                          (checkboxAction ? (
                            <th
                              scope="col"
                              className="relative px- pb-5 w-full"
                            >
                              <input
                                type="checkbox"
                                className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                ref={checkbox}
                                checked={checked}
                                onChange={toggleAll}
                              />
                            </th>
                          ) : (
                            <th className="text-start p-  text-[14px] font-[600] capitalize leading-[22px] text-dark_black_text px-2">
                              S/N
                            </th>
                          ))}

                        {keys?.map((title, a) => {
                          return (
                            <th
                              key={a}
                              scope="col"
                              className=" py-6 pr-1 text-start text-[14px] font-[600] capitalize leading-[22px] text-dark_black_text "
                            >
                              {title}
                            </th>
                          );
                        })}
                        {!printMod?.enable && action?.visible && (
                          <th
                            scope="col"
                            className="min-w-[5rem] py-6 pr-1 text-[14px] font-[600] capitalize leading-[22px] text-dark_black_text  text-start"
                          >
                            Action
                          </th>
                        )}
                      </tr>
                    </thead>
                    {!isLoading && (
                      <tbody className="divide-y divide-gray-200 bg-white z-20">
                        {data?.map((res, i) => {
                          const dataId = res?._data;
                          return (
                            <tr
                              key={i}
                              className={classNames(
                                `hover:bg-grey_4 z-20`,
                                checkboxAction?.values?.includes(dataId)
                                  ? "bg-gray-50"
                                  : undefined
                              )}
                            >
                              {!printMod?.enable &&
                                (!checkboxAction ? (
                                  <td className="whitespace-wrap pl-5 text-start text-sm font-medium sm:px-1">
                                    {pagination.pageSize *
                                      (pagination.page - 1) +
                                      i +
                                      1}
                                  </td>
                                ) : (
                                  <td className="relative px-7  sm:px-6">
                                    {checkboxAction?.values?.includes(
                                      dataId
                                    ) && (
                                      <div className="absolute inset-y-0 left-0 w-0.5 bg-gray-600" />
                                    )}
                                    <input
                                      type="checkbox"
                                      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-600"
                                      value={dataId}
                                      checked={checkboxAction?.values?.includes(
                                        dataId
                                      )}
                                      onChange={(e) =>
                                        checkboxAction?.setValues(
                                          e.target.checked
                                            ? [
                                                ...checkboxAction?.values,
                                                dataId,
                                              ]
                                            : checkboxAction?.values?.filter(
                                                (id) => id !== dataId
                                              )
                                        )
                                      }
                                    />
                                  </td>
                                ))}
                              {keys?.map((name, s) => {
                                return (
                                  <td
                                    key={s}
                                    className={classNames(
                                      " py-4 mr-3 text-[14px] whitespace-nowrap font-[500]"
                                    )}
                                  >
                                    <span
                                      className={`${
                                        name === "Status"
                                          ? " px-3 py-2 rounded-full"
                                          : "px-3 py-[2px] rounded"
                                      }`}
                                      style={{ ...getByStatusText(res[name]) }}
                                    >
                                      {name === "Status" && (
                                        <span
                                          id="circle__"
                                          className="rounded-full inline-block mr-2 whitespace-nowrap"
                                          style={{
                                            border: `4px solid ${
                                              getByStatusText(res[name]).color
                                            }`,
                                          }}
                                        ></span>
                                      )}
                                      {res[name]}
                                    </span>
                                  </td>
                                );
                              })}
                              {!printMod?.enable && (
                                <>
                                  {action?.visible &&
                                    ["text", "icon"].includes(action?.type) && (
                                      <td className="whitespace-nowrap pl-3 pr-4 z-20 text-start text-sm font-medium  sm:pr-3 ">
                                        <a
                                          href="#"
                                          className="z-20 icon text-grey_2 hover:text-gray-600 "
                                          onClick={(e) =>
                                            action.action?.(e, res)
                                          }
                                        >
                                          {action?.type === "text"
                                            ? action.text
                                            : action?.type === "icon"
                                            ? action?.icon
                                            : null}
                                        </a>
                                      </td>
                                    )}
                                  {action?.visible &&
                                    action.type === "dropdown" && (
                                      <td className="whitespace-wrap py- pl-3 pr-4 text-start text-sm font-medium sm:pr-3 ">
                                        <Dropdown
                                          {...{
                                            menu: action.data,
                                            rowProp: res,
                                          }}
                                        />
                                      </td>
                                    )}
                                </>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
      {!pagination?.hidden && (
        <>
          {isLoading && (
            <div className="flex my-5 items-center justify-center w-full">
              <Loader />
            </div>
          )}
          {!isLoading && !pagination.total && (
            <Emptystate {...{ pagination, msgArray: tableMsg }} />
          )}
          {pagination.total ? (
            <div
              className={`w-full mb-10 mt-3 px-4 py-3 rounded-b-lg bg-[#F9F9F9] ${
                isLoading ? "invisible" : "visible"
              }`}
            >
              <div className="md:flex z-10 mr-3 md:justify-between text-center md:items-center text-[#9A9EA5]">
                <p className="text-sm" style={{ color: "var(--C_blue_light)" }}>
                  Showing{" "}
                  <span className="text-[#52525B]">
                    {Math.min(pagination.length, pagination.total) ||
                      pagination.pageSize}
                  </span>{" "}
                  {pagination.total > 1 ? "results" : "result"} of{" "}
                  <span className="text-[#52525B]"> {pagination.total}</span>{" "}
                  {pagination.total > 1 ? "records" : "record"}
                </p>

                <Pagination
                  {...{
                    pagination,
                    page: pagination.page - 1,
                    itemsPerPage: pagination.pageSize,
                    setPagination,
                    total: pagination.total,
                  }}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
}
