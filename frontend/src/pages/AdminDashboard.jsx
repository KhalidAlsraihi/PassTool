/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Stack, Card, CardContent, CardHeader } from "@mui/material";
import PassRequirements from "../components/PassRequirements";
import { Divider } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CustomButton from "../components/CustomButton";
import { useFormik } from "formik";
import * as yup from "yup";

import RegisterAdminDialog from "../components/RegisterAdminDialog";
import { useNavigate } from "react-router-dom";

const Admindashboard = ({ strength, setStrength }) => {
  const [messages, setMessages] = useState([]); //

  const navigate = useNavigate();
  const [adminOpen, setAdminOpen] = useState(false);
  const validationSchema = yup.object().shape({
    strength: yup.string().required("Strength is required"),
  });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:4000/messages");
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await response.json();
        setMessages(data.messages); // Update the state with the fetched messages
      } catch (error) {
        console.error("Error fetching messages:", error);
        // Handle fetch error (e.g., display an error message)
      }
    };

    fetchMessages();
  }, []); // The empty array ensures this effect runs only once when the component mounts

  const formik = useFormik({
    initialValues: { strictnessLevel: strength },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      // Send a POST request to localhost:4000
      fetch("http://localhost:4000/strictness", {
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
          console.log("Response received:", data);
          setStrength(values.strength);
          alert("Strength set");
        })
        .catch((error) => {
          console.error("There was a problem with the request:", error);
        })
        .finally(() => {
          setSubmitting(false); // Set submitting to false regardless of success or failure
        });
    },
  });

  const handleAdminClose = () => {
    setAdminOpen(false);
  };

  const handleAdminClick = () => {
    setAdminOpen(!adminOpen);
  };

  const messageDelete = (id) => {
    fetch(`http://localhost:4000/messages/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response received:", data);
        // Filter out the deleted message from the array
        setMessages(messages.filter((message) => message._id !== id));
      })
      .then(alert("Message deleted"))
      .catch((error) => {
        console.error("There was a problem with the request:", error);
      });
  };

  return (
    <>
      <Toolbar />
      <Toolbar />
      <Toolbar />
      <Stack sx={{ mt: 4, mb: 5, mx: { xs: 0, md: 30 } }}>
        <Stack direction="row" spacing={20} sx={{ mb: 2 }}>
          <CustomButton
            text="Home"
            sx={{ width: "200px" }}
            onClick={() => navigate("/")}
          />
          <CustomButton
            onClick={handleAdminClick}
            text="Register Admin"
            sx={{ width: "200px" }}
          />
        </Stack>
        <Divider sx={{ my: 1 }} />
        <Stack>
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Set strength for the tool
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="strength"
                value={formik.values.strength}
                onChange={formik.handleChange}>
                <FormControlLabel
                  value="medium"
                  control={<Radio />}
                  label="Medium"
                />
                <FormControlLabel
                  value="strong"
                  control={<Radio />}
                  label="Strong"
                />
                <FormControlLabel
                  value="very_strong"
                  control={<Radio />}
                  label="Very Strong"
                />
              </RadioGroup>
              {/* Display errors if there are any */}
              {formik.errors.strength && (
                <Typography color="error">{formik.errors.strength}</Typography>
              )}
            </FormControl>
            <CustomButton
              sx={{ width: "150px", mt: 2 }}
              type="submit"
              text="submit"
            />
          </form>
        </Stack>
        <Typography
          variant="h4"
          sx={{
            textTransform: "uppercase",
            mt: { xs: 3, md: 2 },
            fontSize: { xs: 24, md: 35 },
          }}>
          Password Analysis Tool
        </Typography>
        <Divider />
        <Typography sx={{ mt: 2, fontWeight: "bold" }}>
          The password Strength is set to {strength} by the admin
        </Typography>
        <PassRequirements strength={strength} />
        <Typography
          sx={{
            textTransform: "uppercase",
            mt: { xs: 3, md: 2 },
            fontSize: { xs: 24, md: 35 },
          }}>
          User's Feedback
        </Typography>
        <Divider />
        <Typography sx={{ mt: 2, fontWeight: "bold" }}>
          Read feedback messages from the users
        </Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          {messages?.map((message, index) => (
            <Card key={index} elevation={3} sx={{ minWidth: 275 }}>
              <CardHeader
                title={message.fullName}
                subheader={new Date(message.timestamp).toLocaleString()}
                titleTypographyProps={{ fontWeight: "bold" }}
                subheaderTypographyProps={{ color: "text.secondary" }}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {message.email}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1.5 }}>
                  {message.message}
                </Typography>
                <CustomButton
                  text="Delete"
                  onClick={() => messageDelete(message._id)}
                />
              </CardContent>
            </Card>
          ))}
        </Stack>
        <RegisterAdminDialog open={adminOpen} handleClose={handleAdminClose} />
      </Stack>
    </>
  );
};

export default Admindashboard;
