export const getByStatusText = (status, colorizeStatus = true) => {
  let res = "";
  status = typeof status == "string" ? status.toLowerCase() : status;
  switch (status) {
    case "not sent":
      res = {
        backgroundColor: "rgba(255, 36, 20, 0.1)",
        color: "#D70900",
      };
      break;
    case "sent":
    case "verified":
      res = {
        backgroundColor: "#EBF9E9",
        color: "#2B6112",
      };
      break;
    case "unverified":
      res = {
        backgroundColor: "rgba(255, 245, 218, 1)",
        color: "#ECB528",
      };
      break;
    default: {
      return {};
    }
  }
  if (colorizeStatus) {
    return res;
  }
};
