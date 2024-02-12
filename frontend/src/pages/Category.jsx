/* eslint-disable react-hooks/exhaustive-deps */
import TablePreloader from "../components/Loader/TablePreloader";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryData,
  getCategories,
  setPagination,
  deleteCategory,
  setPayload,
} from "../features/categorySlice";
import HomeLayout from "../layouts/Home";
import { Button, Typography } from "@mui/material";
import CustomTable from "../components/table/Table";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import AddIcon from "@mui/icons-material/Add";

import AddCategory from "../components/Modals/CreateCategory";
import Confirmation from "../components/Modals/Confirmation";

const Category = () => {
  const dispatch = useDispatch(),
    [deleteData, setDeleteData] = useState({ open: false, id: "" });

  const { loading, pagination, categories, modalLoading } =
      useSelector(getCategoryData),
    [open, setOpen] = useState(false);

  useEffect(() => {
    // dispatch(setPagination({ page: 1, endDate: null }));
    // const nav = Storage.get(config.authProps[0]);
    // if (nav === null) navigate("/");
  }, []);

  useEffect(() => {
    let cb = () => {};
    if (pagination?.search) {
      dispatch(setPagination({ page: 1 }));
      cb = setTimeout(() => Promise.all([dispatch(getCategories({}))]), 700);
    } else cb = Promise.all([dispatch(getCategories({}))]);

    return () => {
      clearTimeout(cb);
    };
  }, [
    pagination.page,
    pagination.search,
    pagination.startDate && pagination.endDate,
  ]);

  const data = categories?.map((category) => {
    const { name, createdAt } = category;
    return {
      name: name,
      "Date Created": dayjs(createdAt).format("MMM DD, YYYY"),
      _data: category,
    };
  });

  const dropdownData = {
    visible: true,
    type: "dropdown",
    data: [
      {
        text: "Edit",
        action: (_, state) => {
          setOpen(true);
          dispatch(setPayload({ name: state?.name, _id: state._id }));
        },
      },
      {
        text: "Delete",
        action: (_, state) => {
          setDeleteData({
            open: true,
            id: state?._id,
            name: state?.name,
          });
        },
      },
    ],
  };

  async function handleDelete() {
    try {
      const res = await dispatch(deleteCategory(deleteData?.id)).unwrap();
      if (res?.success) {
        setDeleteData({ open: false, id: "" });
        await dispatch(getCategories());
      }
    } catch (error) {
      console.error(error);
    }
  }

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
          Categories
        </Typography>

        <div className="lg:grid lg:grid-cols-2 mb-8">
          <div className="col-span-1 lg:mb-0 mb-6 ">
            <SearchBar
              {...{
                value: pagination.search,
                onChange: ({ target: { value } }) =>
                  dispatch(setPagination({ page: 1, search: value.trim() })),
                placeholder: "Search by name...",
              }}
            />
          </div>
          <div className="flex justify-end">
            <Button
              startIcon={<AddIcon />}
              onClick={() => setOpen(true)}
              sx={{
                textTransform: "capitalize",
                py: "22px",
                bgcolor: "purple",
                color: "white",
                "&:hover": { bgcolor: "purple" },
              }}
              variant="contained"
              size="small"
              className="h-[40px] w-44 border-2 border-[purple] z-10 font-[500] md:text-[15px] text-[10px] rounded"
            >
              {" "}
              ADD
            </Button>
          </div>
        </div>

        {loading && categories.length === 0 ? (
          <TablePreloader />
        ) : (
          <div className="md:w-full w-[93vw]">
            <CustomTable
              {...{
                data,
                pagination,
                setPagination: (d) => dispatch(setPagination(d)),
                isLoading: loading,
                action: dropdownData,
              }}
            />
          </div>
        )}
      </div>

      <AddCategory
        {...{
          open,
          setOpen,
          refresh: async () => await dispatch(getCategories()),
        }}
      />
      <Confirmation
        {...{
          title: "Delete Question",
          subtitle: `Are you sure you want to delete ${deleteData.name}?`,
          open: deleteData.open,
          loading: modalLoading,
          close: () => setDeleteData({ open: false }),
          handleConfirm: handleDelete,
        }}
      />
    </HomeLayout>
  );
};

export default Category;
