import {
  Box,
  Chip,
  ListItemButton,
  Paper,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";

export const itemBoxStyle: SxProps<Theme> = {
  display: "flex",
  width: "100%",
  mb: 2,
};

export default function Item({
  item,
  onClick,
}: {
  item: any;
  onClick: () => void;
}) {
  return (
    <Paper sx={{ mr: 1, ml: 1, mb: 1 }}>
      <ListItemButton onClick={onClick}>
        <Box sx={itemBoxStyle}>
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ m: 1 }} variant="h5">
              {item.title}
            </Typography>
            <Box>
              {item.tags &&
                item.tags
                  .split(",")
                  .map((tag: string, index: number) => (
                    <Chip
                      key={index}
                      sx={{ mr: 1 }}
                      label={`#${tag.trim()}`}
                      onClick={() => {}}
                    />
                  ))}
            </Box>
          </Box>
        </Box>
      </ListItemButton>
    </Paper>
  );
}
