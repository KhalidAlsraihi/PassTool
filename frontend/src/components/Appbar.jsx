import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

function App() {
  return (
    <>
      <AppBar elevation={0}>
        <Toolbar sx={{ mx: { xs: 0, md: 25 } }}>
          <img src="Logo.png" alt="logo" style={{ width: "200px" }} />
        </Toolbar>
      </AppBar>
    </>
  );
}

export default App;
