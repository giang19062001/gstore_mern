import React, { useState } from "react";
import { Box,TextField,Button } from "@mui/material";

export default function Search(props) {
  const [value, setValue] = useState("");
  return (
    <Box className="flex justify-center items-center pb-12">
      <TextField
        type="text"
        fullWidth
        label="Tìm kiếm sản phẩm"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <Button variant="contained" className="h-14 bg-sky-500 hover:bg-sky-600 rounded-full" onClick={(event) => props.onClick(value)}>
       Search
      </Button>
    </Box>
  );
}
