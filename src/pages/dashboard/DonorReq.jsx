import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";

const DonorReq = () => {
  const [formData, setFormData] = useState({
    preferredDate: "",
    donatedBefore: false,
    noDiseaseHistory: false,
    agreedToTerms: false,
  });
  // Handler for form input changes
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handler for checkbox changes
  const handleCheckboxChange = (name, checked) => {
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend
      const response = await axios.post(
        "https://blood-bond-server-nine.vercel.app/bloodDonation",
        formData
      );
      console.log("Form submitted successfully:", response.data);
      // You can handle success, redirect, or update UI as needed
    } catch (error) {
      console.error("Error submitting form:", error);
      // You can handle errors and update UI accordingly
    }
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        <div>
          <h1 className="text-4xl lg:text-6xl text-center mt-4">
            Blood Donation Request
          </h1>
        </div>
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Please fill out the following information to request a blood donation.
      </Typography>
      <form
        className="mt-8 mb-2 w-full max-w-screen-lg sm:w-full"
        onSubmit={handleSubmit}
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Preferred Donation Date
          </Typography>
          <Input
            size="lg"
            type="date"
            placeholder="Select a date"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Checkbox
            label="I have donated blood previously"
            containerProps={{ className: "-ml-2.5" }}
          />
          <Checkbox
            label="I have no history of serious diseases"
            containerProps={{ className: "-ml-2.5" }}
          />
        </div>
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree to the
              <a
                href="#"
                className="font-medium transition-colors hover:text-gray-900"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button type="submit" className="mt-6" fullWidth>
          Submit Request
        </Button>
      </form>
    </Card>
  );
};

export default DonorReq;
