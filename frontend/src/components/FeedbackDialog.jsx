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
  fullName: yup
    .string("Enter your full name")
    .required("Full name is required"),
  message: yup.string("Enter your message").required("Message is required"),
});

const FeedbackDialog = ({ open, handleClose }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      console.log(values);
      fetch("http://localhost:4000/messages/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);
          alert("Thank you for your message");
          // Handle success here, e.g., showing a success message
          actions.setSubmitting(false); // Set submitting to false on success
          formik.handleReset(); // Reset form if needed
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle error here, e.g., showing an error message
          actions.setSubmitting(false); // Set submitting to false on error
        });
    },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontWeight: "bold", fontSize: { xs: 16, md: 20 } }}>
        Share your Feedback With Us
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
            id="fullName"
            name="fullName"
            label="Full Name"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            id="message"
            name="message"
            label="Message"
            multiline
            rows={4}
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
          />
          <CustomButton type="submit" text={"Submit"} />
        </form>
      </Stack>
    </Dialog>
  );
};

export default FeedbackDialog;
