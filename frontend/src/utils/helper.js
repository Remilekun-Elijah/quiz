import Storage from "./storage";
import config from "./config.js";

/**
 * @param {object} data   takes in an object of boolean and number values
 * @param {boolean} data.previewInConsole  whether to preview the data/size in the console, default is true
 * @param {number} data.size  the actual size of the data/file in byte, default is 50000000
 * @returns  {number}  The size of the data/file
 **/
export const getFileSize = function (data = {}) {
  data.previewInConsole = data.previewInConsole ? data.previewInConsole : false;
  data.size = data.size !== (undefined || null || "") ? data.size : 50000000; // 50mb
  data.size = Number(data.size);
  const k = 1000;
  const format = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(data.size) / Math.log(k));
  const size = parseFloat(data.size / Math.pow(k, i)).toFixed(1);

  if (data.previewInConsole === true)
    console.info(data.size, " = ", size + format[i]);
  return size + " " + format[i];
};

export const getAmount = (num) => new Intl.NumberFormat().format(num);

export function currencyFormat(num, currencySymbol) {
  return (
    currencySymbol + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  );
}

export const Roles = {
  admin: "admin",
  superAdmin: "superadmin",
};

export const loggedInUser = Storage.get(config.authProps[1]);
export const getRole = () => {
  let user = {};
  if (loggedInUser) {
    user = JSON.parse(loggedInUser);
  }
  return user?.role;
};
export const getIds = () => {
  let user = {};
  if (loggedInUser) {
    user = JSON.parse(loggedInUser);
  }
  return {
    user: user?._id,
  };
};

export const validateEmail = (email) => {
  const regexExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
  return regexExp.test(email);
};

export const capitalize = (string) => {
  const final = string.replace(/\w\S*/g, (txt) => {
    let val = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    return val;
  });
  return final;
};

export const tabList = [
  {
    name: "Departments",
    id: 1,
    code: "Department",
  },
  {
    name: "Branches",
    id: 2,
    code: "Branch",
  },
  {
    name: "Devices",
    id: 3,
    code: "Device",
  },
  {
    name: "System",
    id: 4,
    code: "System",
  },
];

export const getBranchIdByName = (name, branches) =>
  branches.find(
    (branch) => branch?.branchName?.toLowerCase() === name?.toLowerCase()
  )?.id;
export const getMdaIdByName = (name, departments) =>
  departments.find(
    (branch) => branch?.department?.toLowerCase() === name?.toLowerCase()
  )?.id;

export const purposeList = [
  "Anniversary",
  "Birthday",
  "Christmas",
  "Valentine",
  "Housewarming",
  "Baby shower",
  "Diwali",
  "Eid",
  "Father's day",
  "Mother's day",
  "New year",
  "Wedding",
  "Bridal shower",
  "Halloween",
  "Chinese New year",
  "Christening",
  "Easter",
  "Hanukkah",
  "New baby",
  "Thanksgiving",
  "Others",
];


