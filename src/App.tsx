import {
  Alert,
  Box,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import TopBar from "./components/TopBar/TopBar";
import Item from "./components/Item";
import Layout from "./components/Layout";
import SearchBar from "./components/SearchBar";
import { getAll, getAllBy } from "./storage/ItemStorage";
import { createDefaultItem } from "./App.utils";
import { configuration } from "./config/ItemConfig";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(
    createDefaultItem(configuration)
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setItems(getAll());
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Layout>
        <TopBar
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
          onSave={() => {
            setItems(getAll());
          }}
          open={open}
          setOpen={setOpen}
        />
        <Typography variant="h1" sx={{ mt: 5 }}>
          Itemizer
        </Typography>
        <SearchBar
          onSearch={(searchTerm) => {
            const filteredItems = getAllBy((item: any) => {
              console.log(item.title);
              return item.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            });
            setItems(filteredItems);
          }}
        />
        <Box
          sx={{
            mt: 6,
            width: { xs: "100%", md: "60%" },
            overflow: "auto",
            mb: 3,
          }}
        >
          {!items.length && (
            <Alert severity="info">
              No items available, create new items selecting the "Add New Item" button at the top right corner.
            </Alert>
          )}
          {items.map((item: any, index: number) => (
            <Item
              key={index}
              item={item}
              onClick={() => {
                setCurrentItem(item);
                setOpen(true);
              }}
            />
          ))}
        </Box>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
