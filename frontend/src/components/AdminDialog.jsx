import { useNavigate } from "react-router-dom"; // Import useNavigate
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import { Divider, Stack } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import CustomButton from "./CustomButton";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

const AdminDialog = ({ open, handleClose }) => {
  const navigate = useNavigate(); // Use the useNavigate hook

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://localhost:4000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const user = await response.json(); // Assuming the response contains the user object
        localStorage.setItem("user", JSON.stringify(user)); // Store the user in local storage
        handleClose(); // Close the dialog
        navigate("/admin");
        alert("Login Successful");
        // Navigate to the admin page
      } catch (error) {
        console.error("Login error:", error);
        alert("Login failed"); // Handle login failure (e.g., display a message)
      }
    },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontWeight: "bold", fontSize: { xs: 16, md: 20 } }}>
        Login as an Admin
        <Divider />
      </DialogTitle>
      <Stack spacing={2} sx={{ p: 2 }}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <CustomButton type="submit" text={"Login"} />
        </form>
      </Stack>
    </Dialog>
  );
};

export default AdminDialog;
