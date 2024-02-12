import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Avatar } from "@mui/material";
const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        background: "purple",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className="flex items-center my-1">
            <img
              src={"/logo.png"}
              alt="brand"
              className="shadow"
              height={"130px"}
              width={"60px"}
            />
          </div>

          <Avatar
            src="/logo.png"
            alt=""
            height={50}
            width={50}
            sx={{ display: { xs: "flex", md: "none" } }}
          />

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: 1,
              display: { xs: "flex", md: "none" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Quiz
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
