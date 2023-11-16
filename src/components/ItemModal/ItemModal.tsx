import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Modal, TextField } from "@mui/material";
import { configuration } from "../../config/ItemConfig";
import { boxStyle } from "../TopBar/TopBar.styles";
import { remove } from "../../storage/ItemStorage";
import { saveItem } from "../ItemModal/ItemModal.utils";

type ParamsType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userFields: string[];
  currentItem: any;
  setCurrentItem: React.Dispatch<any>;
  onSave: () => void;
};

interface ItemModalProps {
  params: ParamsType;
}

export function ItemModal({ params }: ItemModalProps) {
  const { open, userFields, currentItem, setCurrentItem, onSave, setOpen } =
    params;
  
  const handleSave = () => {
    saveItem(currentItem);
    onSave();
    setOpen(false);
  };

  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    remove(currentItem.id);
    onSave();
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={boxStyle}>
        {[...configuration.fields, ...userFields].map((field, index) => (
          <TextField
            key={index}
            sx={{ mb: 2 }}
            id="outlined-basic"
            value={currentItem[field] || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCurrentItem({
                ...currentItem,
                [field.toLowerCase()]: event.target.value,
              });
            }}
            label={`${field[0].toUpperCase()}${field.slice(1, field.length)}`}
            variant="outlined"
          />
        ))}
        <Box sx={{ display: "flex", mt: 1 }}>
          <Button sx={{ mr: 1 }} variant="outlined" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" onClick={handleDelete} color="error">
            <DeleteIcon />
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
