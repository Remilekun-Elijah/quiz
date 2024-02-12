/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import HomeLayout from "../layouts/Home";
import Box from "@mui/material/Box";
import { Skeleton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import config from "../utils/config";
import { Link, useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Table from "../components/table/Table";
import TablePreloader from "../components/Loader/TablePreloader";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import PieChart from "../components/others/PieChart";
import {
  getDashboardData,
  getDashboardStats,
  getReport,
} from "../features/dashboardSlice";
import AreaChart from "../components/others/AreaChat";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import SendIcon from "@mui/icons-material/Send";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import { capitalize, getAmount } from "../utils/helper";
import Storage from "../utils/storage";
import { getCategories, getCategoryData } from "../features/categorySlice";

const { routes } = config;
export default function Dashboard() {
  const { loading, pagination, modalLoading, reports, analytics, stats } =
      useSelector(getDashboardData),
    { categories } = useSelector(getCategoryData),
    navigate = useNavigate(),
    dispatch = useDispatch();

  const statsMap = [
    {
      type: "Total Questions",
      icon: PeopleAltIcon,
      amount: stats?.totalQuestions || 0,
      color: "linear-gradient(45deg, #E5ECF6, grey)",
    },
    {
      type: "Total Answered Questions",
      icon: SendIcon,
      amount: stats?.totalAnswered || 0,
      color: "linear-gradient(45deg, #62BB47, #B6ECA7)",
    },
    {
      type: "Total Unanswered Questions",
      icon: ScheduleSendIcon,
      amount: stats?.totalUnanswered || 0,
      color: "linear-gradient(45deg, #E87885, silver)",
    },
  ];

  useEffect(() => {
    Promise.all([
      dispatch(getCategories({ pageSize: 5 })),
      dispatch(getDashboardStats()),
    ]);

    const nav = Storage.get(config.authProps[0]);

    if (nav === null) navigate("/");
  }, []);

  const data = categories?.map(({ name, createdAt }) => ({
    name: name,
    "Date Created": dayjs(createdAt).format("MMM DD, YYYY"),
  }));

  return (
    <HomeLayout>
      <div className="mb-10">
        <Typography
          variant="h6"
          noWrap
          component="div"
          color="#040316"
          fontSize="32px"
          className="sofiaProBold"
          sx={{ my: 3 }}
        >
          Overview
        </Typography>

        <Box className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-10 flex-wrap mb-14">
          {loading
            ? Array(3)
                .fill("")
                .map((_, i) => (
                  <Skeleton
                    key={i}
                    animation="wave"
                    variant="rounded"
                    height="130px"
                  />
                ))
            : statsMap.map((data, index) => {
                return (
                  <div
                    className="rounded-lg border p-5"
                    key={index}
                    style={{ background: data.color }}
                  >
                    <div className="flex mb-10">
                      <data.icon color="black" />
                      <span className="ml-2">{data.type}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-bold">
                        {getAmount(data.amount)}
                      </span>
                    </div>
                  </div>
                );
              })}
        </Box>

        <div
          className="flex flex-wrap gap-y-5 items-start justify-around mb-14 max-h-[300px] h-[220px] xl:h-[280px]"
          style={{ width: "100%" }}
        >
          {/* <div className="w-full"> */}
          <AreaChart
            {...{
              dataset: {
                labels: analytics?.map?.((a) => a?._id),
                values: analytics?.map((a) => a.totalCount),
              },
              title: "Daily Reports",
            }}
          />
          <div className="lg:w-[450px] w-full md:mt-0 my-10 lg:h-[200px] h-full">
            <h2 className="md:mt-7 lg:text-left text-center w-full pt- text-[17px] font-[600] tracking-[0.18px]">
              Grouped
            </h2>{" "}
            <PieChart
              id="grouped"
              data={[
                {
                  value: stats?.totalAnswered || 0,
                  name: loading
                    ? "..."
                    : `${stats?.totalAnswered || 0} Answered`,
                },
                {
                  value: stats?.totalUnanswered || 0,
                  name: loading
                    ? "..."
                    : `${stats?.totalUnanswered || 0} Unanswered`,
                },
                {
                  value: stats?.totalQuestions || 0,
                  name: loading ? "..." : `${stats?.totalQuestions || 0} Total`,
                },
              ]}
              color={["#62BB47", "tomato", "grey"]}
              wrapperClass=" w-full h-full items-center"
              pieChartClass="w-full h-full"
            />
          </div>

          <Box className="block w-full">
            <div className="w-full">
              <Container
                className="py-5 bg-[var(--c-bg-color)] rounded-lg lg:min-w-full"
                sx={{ px: 0 }}
              >
                <Box className="flex justify-between mb-2">
                  <Typography>All Categories</Typography>
                  {categories.length > 0 && (
                    <Link
                      to={routes.categories}
                      className="z-10 text-[var(--c-primary-0)]"
                    >
                      See All{" "}
                      <ArrowForwardIcon
                        className="text-[var(--c-primary-0)]"
                        fontSize="small"
                      />
                    </Link>
                  )}
                </Box>

                {modalLoading && categories.length === 0 ? (
                  <TablePreloader />
                ) : (
                  <div className="md:w-full mb-10 w-[93vw]">
                    <Table
                      {...{
                        data,
                        pagination: { ...pagination, hidden: true },
                        isLoading: modalLoading,
                        tableMsg: [
                          "No User created,",
                          "Kindly check back later.",
                        ],
                      }}
                    />
                  </div>
                )}
              </Container>
            </div>
          </Box>
        </div>
      </div>
    </HomeLayout>
  );
}
