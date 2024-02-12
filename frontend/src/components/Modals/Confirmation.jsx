/* eslint-disable react/prop-types */
import React from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Modal, ModalClose, ModalDialog } from "@mui/joy";
import Box from "@mui/material/Box";

const Confirmation = ({
  open,
  close,
  handleConfirm,
  title,
  subtitle,
  loading = false,
}) => {
  return (
    <div>
      <Modal open={open} onClose={close}>
        <ModalDialog size={"sm"} className="w-full" maxWidth={"400px"}>
          <ModalClose />
          <DialogTitle className="border-b text-center">{title}</DialogTitle>
          <DialogContent className="mt-5 text-lg text-center">
            {subtitle}
          </DialogContent>

          <Box className="gap-3 grid md:grid-cols-2 ">
            <Button
              sx={{
                background: "#333",
                "&:hover": { background: "#222" },
              }}
              onClick={() => close?.()}
            >
              No
            </Button>
            <Button
              loading={loading}
              sx={{
                background: "var(--c-primary-0)",
                "&:hover": { background: "var(--c-primary-1)" },
              }}
              onClick={handleConfirm}
            >
              Yes
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </div>
  );
};

export default Confirmation;
