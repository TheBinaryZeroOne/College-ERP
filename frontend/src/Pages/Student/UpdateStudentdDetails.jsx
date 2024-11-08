import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../constants/baseUrl"
import axios from "axios";
import { BiSolidUserCircle } from "react-icons/bi";
import { FaCamera } from "react-icons/fa";
import StudentNav from "./StudentNav";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateStudentDetails = () => {
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [studentDetails, setStudentDetails] = useState({});

  let { id } = useParams();

  useEffect(() => {
    // Fetch student details from the backend
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/student/${id}/details`
        );
        const data = response.data || {};
        const address = data.address ? JSON.parse(data.address) : {};

        setStudentDetails(data);
        setEmail(data.email || "");
        setStreet(address.street || "");
        setCity(address.city || "");
        setState(address.state || "");
        setZipcode(address.zip_code || "");
        setPhone(data.phone || "");
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudentDetails();
  }, [id]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedInfo = {
      email,
      address: JSON.stringify({ street, city, state, zip_code: zipcode }),
      phone,
    };

    try {
      // Update student information
      const infoResponse = await axios.put(
        `${BASE_URL}/student/${id}/updateInfo`,
        updatedInfo
      );

      toast.success("Student details updated successfully!");

      // Update student photo if there's a selected image
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const photoResponse = await axios.put(
          `${BASE_URL}/student/${id}/updatePhoto`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("Student photo updated successfully!");
      }
    } catch (error) {
      console.error("Error updating student details:", error);
      toast.error("Failed to update student details.");
    }
  };

  return (
    <>
      <div className="flex w-full relative">
        <div className="fixed top-0 left-0">
          <StudentNav />
        </div>
        <div className="w-full lg:pl-[24%] xl:pl-[15%] min-h-[100vh] font-oswald">
          {/* heading */}
          <div className="w-full cursor-default">
            <h1 className="overflow-hidden w-full text-center font-oswald font-bold text-5xl md:text-8xl lg:text-7xl xl:text-9xl my-9">
              Update Details
            </h1>
          </div>

          {/* main page */}
          <div className="flex flex-col justify-between">
            {/* image */}
            <div className="w-full">
              <div className="flex justify-center">
                <div className="relative z-10">
                  {!selectedImage && !studentDetails?.user_image?.url ? (
                    <BiSolidUserCircle className="h-[15rem] w-full relative" />
                  ) : (
                    <img
                      src={
                        selectedImage
                          ? URL.createObjectURL(selectedImage)
                          : studentDetails?.user_image?.url
                      }
                      alt="user image"
                      className="
                        w-[30vw] h-[30vw]  
                        md:w-[20vw] md:h-[20vw] 
                        lg:w-[15vw] lg:h-[15vw] 
                        xl:w-[12vw] xl:h-[12vw] 
                        max-w-[150px] max-h-[150px] 
                        md:max-w-[200px] md:max-h-[200px]
                        lg:max-w-[250px] lg:max-h-[250px]
                        xl:max-w-[300px] xl:max-h-[300px]
                        border-black border-4 rounded-full object-center p-1
                        mb-3
                      "
                    />
                  )}

                  <div className="w-full flex justify-center">
                    <label className="bottom-[-10px] right-[-10px] cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                      <FaCamera className="text-2xl text-white bg-black border border-white p-1 rounded-full" />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* details */}

            <div className="w-full flex justify-center items-center">
              <form
                onSubmit={handleSubmit}
                className="mx-5 text-xl font-medium mt-8 mb-10 xl:mt-7 min-h-[30vh] min-w-[80vw] lg:min-w-[50vw] border-2 rounded-lg border-black flex flex-col gap-2 px-5 py-7"
              >
                <div className="overflow-hidden flex flex-col gap-2">
                  <label htmlFor="Email" className="overflow-hidden">
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Email"
                    className="w-full border border-black rounded-md py-2 px-2 text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="overflow-hidden flex flex-col gap-2">
                  <div className="overflow-hidden flex flex-col gap-3 mt-1">
                    <h3 htmlFor="address" className="text-2xl overflow-hidden">
                      Address:
                    </h3>
                    <label htmlFor="street" className="overflow-hidden">
                      Street
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Street"
                    className="w-full border border-black rounded-md py-2 px-2 text-sm"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                  />

                  <div className="w-full flex justify-between">
                    <div className="w-1/3 flex flex-col gap-2">
                      <label htmlFor="city" className="overflow-hidden">
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="Enter City"
                        className="w-full border border-black rounded-md py-2 px-2 text-sm"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                    <div className="w-1/3 flex flex-col gap-2">
                      <label htmlFor="state" className="overflow-hidden">
                        State
                      </label>
                      <input
                        type="text"
                        placeholder="Enter State"
                        className="w-full border border-black rounded-md py-2 px-2 text-sm"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="w-full flex justify-between">
                    <div className="w-1/3 flex flex-col gap-2">
                      <label htmlFor="zipcode" className="overflow-hidden">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Zip Code"
                        className="w-full border border-black rounded-md py-2 px-2 text-sm"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full flex justify-between">
                  <div className="w-1/3 flex flex-col gap-2">
                    <label htmlFor="phone" className="overflow-hidden">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Phone Number"
                      className="w-full border border-black rounded-md py-2 px-2 text-sm"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Update Information
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateStudentDetails;
