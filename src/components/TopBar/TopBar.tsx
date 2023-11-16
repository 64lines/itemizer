import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { createDefaultItem } from "../../App.utils";
import { configuration } from "../../config/ItemConfig";
import { ItemModal } from "../ItemModal/ItemModal";
import { boxStyle } from "./TopBar.styles";
import { getUserFields } from "./TopBar.utils";

interface EditItemModalProps {
  onSave: () => void;
  currentItem: any;
  setCurrentItem: React.Dispatch<any>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

export default function TopBar({
  onSave,
  currentItem,
  setCurrentItem,
  setOpen,
  open,
}: EditItemModalProps) {
  const [userFields, setUserFields] = useState<string[]>([]);
  const [userFieldsText, setUserFieldsText] = useState<string>("");
  const [openConfig, setOpenConfig] = useState(false);
  const [isConfigChanged, setConfigChanged] = useState(false);

  /** Verify Configuration */
  useEffect(() => {
    const fields = getUserFields();

    if (!fields.length) {
      setOpenConfig(true);
      return;
    }

    setUserFields(fields);
    setOpenConfig(false);
  }, [isConfigChanged]);

  useEffect(() => {
    setCurrentItem(currentItem);
  }, [currentItem, setCurrentItem]);

  const handleOpen = () => {
    setCurrentItem(createDefaultItem(configuration));
    setOpen(true);
  };

  const handleCloseConfig = () => setOpen(false);

  const handleSaveConfig = () => {
    const fields = userFieldsText
      .split(",")
      .map((field) => field.trim())
      .filter((field) => !!field);
    localStorage.setItem(
      "config",
      JSON.stringify({
        fields,
      })
    );
    setUserFields(fields);
    setConfigChanged(true);
  };

  const handleClear = () => {
    // eslint-disable-next-line no-restricted-globals
    const isConfirmed = confirm("Do you want to wipe out everything?")
    if (isConfirmed) {
      localStorage.clear();
      window.location.reload();
    }
  }

  return (
    <Box sx={{ m: 1, width: "100%" }}>
      <Box sx={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
        <Button
          size="small"
          sx={{ mr: 1 }}
          onClick={handleOpen}
          variant="outlined"
        >
          Add new item
        </Button>
        <Button
          size="small"
          color="error"
          sx={{ mr: 1 }}
          onClick={handleClear}
          variant="outlined"
        >
          Wipe out everything
        </Button>
      </Box>
      <ItemModal
        params={{
          open,
          setOpen,
          userFields,
          currentItem,
          setCurrentItem,
          onSave
        }}
      />
      <Modal
        open={openConfig}
        onClose={handleCloseConfig}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle}>
          <Typography variant="h5" sx={{ color: "white", mb: 1 }}>
            Configuration
          </Typography>
          <Typography sx={{ color: "white", mb: 2 }} variant="body1">
            Write the fields you want to have on your local database separated by
            commas (e.g "description, link, author"). Title and Tags fields 
            are included by default.
          </Typography>
          <TextField
            sx={{ mb: 2 }}
            id="outlined-basic"
            value={userFieldsText}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUserFieldsText(event.target.value);
            }}
            label={"Fields"}
            variant="outlined"
          />
          <Box sx={{ display: "flex", mt: 1 }}>
            <Button
              sx={{ mr: 1 }}
              variant="outlined"
              onClick={handleSaveConfig}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
