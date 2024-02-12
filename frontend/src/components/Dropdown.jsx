/* eslint-disable react/prop-types */
import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Dropdown({ icon, menu, rowProp }) {
  let arr = [];

  menu.forEach((option) => {
    if (option.condition) {
      if (option.condition(rowProp, option)) arr.push(option);
    } else arr.push(option);
  });

  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div>
        <Menu.Button className="inline-flex justify-center">
          {icon || (
            <MoreHorizIcon className="cursor-pointer mt-5 text-black hover:text-[var(--c-primary-0)]" />
          )}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-75"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className=" absolute  mt-1 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          style={{ zIndex: 5 }}
        >
          <div className="py-1">
            {arr.map((option, index) => {
              return (
                <Menu.Item key={index}>
                  {({ active }) => (
                    //  eslint-disable-next-line
                    <a
                      href={
                        (option.type === "link" &&
                          option.getUrl(rowProp?._data)) ||
                        undefined
                      }
                      onClick={(e) => option.action(e, rowProp?._data)}
                      className={classNames(
                        active
                          ? "bg-gray-100 text-gray-900 cursor-pointer"
                          : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      {option.text}
                    </a>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default Dropdown;
