/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import Stack from "@mui/joy/Stack";
import FormHelperText from "@mui/joy/FormHelperText";
import { Sheet, Textarea } from "@mui/joy";
import { useFormik } from "formik";
import { vAddCategory, vQuestion } from "../../utils/validators";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import SelectInput from "../SelectInput";
import EditIcon from "@mui/icons-material/Edit";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionData, setPayload } from "../../features/questionSlice";
import {
  createCategory,
  getCategoryData,
  updateCategory,
} from "../../features/categorySlice";

export default function AddCategory({ open, setOpen, refresh }) {
  const {
    payload: { _id, ...initialValues },
    modalLoading,
  } = useSelector(getCategoryData);

  const dispatch = useDispatch();

  const {
    setValues,
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
  } = useFormik({
    validationSchema: vAddCategory,
    initialValues: initialValues,
    onSubmit: async (values, { resetForm }) => {
      try {
        let action = createCategory;
        if (_id) {
          action = updateCategory;
          values.id = _id;
        }
        const res = await dispatch(action(values)).unwrap();
        if (res.success) {
          resetForm();
          setOpen(false);
          setPayload({ name: "", _id: "" });
          await refresh?.();
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  React.useEffect(() => {
    console.log(initialValues);

    if (_id) {
      setValues(initialValues);
    }
  }, [_id, open]);

  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog minWidth={500} className="overflow-y-auto">
          <DialogTitle>{_id ? "Update" : "Add"} Category</DialogTitle>

          <form onSubmit={handleSubmit} noValidate>
            <Stack spacing={2}>
              <TextField
                id="name"
                label="Category Name"
                placeholder="E.g Mathematic"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />

              <div className="flex gap-2">
                <Button
                  type="clear"
                  className="w-full"
                  color="neutral"
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
                <Button type="submit" loading={modalLoading} className="w-full">
                  {_id ? "Update" : "Submit"}
                </Button>
              </div>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
