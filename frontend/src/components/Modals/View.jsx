/* eslint-disable react/prop-types */
import * as React from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import { Button, Typography } from "@mui/joy";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import DangerousIcon from "@mui/icons-material/Dangerous";

export default function ViewModal({ open, setOpen, data, handleEdit }) {
  const [checkAnswer, setCheckAnswer] = React.useState("");
  const [checked, setChecked] = React.useState("");
  const handleClose = () => {
    setCheckAnswer("");
    setChecked("");
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Modal open={open} onClose={handleClose}>
        <ModalDialog size={"md"} className="w-full" maxWidth={"500px"}>
          <ModalClose />
          <DialogTitle className="border-b">Question Details</DialogTitle>

          <Typography sx={{ fontSize: "1.3rem" }}>{data?.question}</Typography>

          <RadioGroup
            aria-label="Your plan"
            name="people"
            defaultValue="Individual"
            className="grid grid-cols-2"
          >
            <List
              sx={{
                minWidth: 240,
                "--List-gap": "0.5rem",
                "--ListItem-paddingY": "1rem",
                "--ListItem-radius": "8px",
                "--ListItemDecorator-size": "32px",
              }}
            >
              {data?.answers?.map((item, index) => (
                <ListItem
                  key={index}
                  className={`${
                    checkAnswer === item &&
                    "animate-pulse bg-green-500 color-white"
                  } ${
                    checked === data.correctAnswer &&
                    checked === item &&
                    "animate-pulse bg-green-500 color-white"
                  } ${
                    item === checked &&
                    checked !== data.correctAnswer &&
                    "bg-red-300"
                  }`}
                  variant="outlined"
                  sx={{ boxShadow: "sm" }}
                >
                  <Radio
                    onChange={() => !checked && setChecked(item)}
                    overlay
                    value={item}
                    label={item}
                    uncheckedIcon={
                      item === checked && (
                        <DangerousIcon color="error" className="bg-red-300" />
                      )
                    }
                    checkedIcon={
                      item === checkAnswer ||
                      (item === data.correctAnswer && item === checked) ? (
                        <CheckBoxIcon
                          color="success"
                          className="bg-transparent"
                        />
                      ) : item === checked && item !== data.correctAnswer ? (
                        <DangerousIcon color="error" className="bg-red-300" />
                      ) : (
                        ""
                      )
                    }
                    checked={
                      checkAnswer === item ||
                      (checked === data.correctAnswer && checked === item)
                        ? true
                        : false
                    }
                    sx={{ flexGrow: 1, flexDirection: "row-reverse" }}
                    slotProps={{
                      action: ({ checked: checkeds }) => ({
                        sx: (theme) => ({
                          ...(checkeds && {
                            inset: -1,
                            border:
                              checkAnswer === item ||
                              (checked !== data.correctAnswer &&
                                checked === item &&
                                "2px solid"),
                            borderColor:
                              checkAnswer === item
                                ? theme.vars.palette.success[500]
                                : checked !== data.correctAnswer &&
                                  checked === item
                                ? theme.vars.palette.danger[500]
                                : "transparent",
                          }),
                        }),
                      }),
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </RadioGroup>

          <div className="flex gap-2">
            <Button
              variant="solid"
              color="success"
              className="w-full"
              disabled={data.correctAnswer === checked || checkAnswer || false}
              onClick={() => setCheckAnswer(data.correctAnswer)}
            >
              Check answer
            </Button>
            <Button
              variant="solid"
              color="primary"
              className="w-full"
              onClick={() => handleEdit?.(data)}
            >
              Edit
            </Button>
          </div>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
