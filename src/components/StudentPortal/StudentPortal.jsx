import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import axios from "axios";
import "./StudentPortal.css";
//import Resemble from "resemblejs";
import logo from "../assets/unilorin_logo2.png";
import photo from "../assets/photo.png";

function StudentPortal() {
  const universityData = {
    "Faculty of Agriculture": [
      "Department of Agricultural Economics",
      "Department of Crop Production",
      "Department of Soil Science",
    ],
    "Faculty of Arts": [
      "Department of English",
      "Department of History",
      "Department of Linguistics",
    ],
    "Faculty of Basic Medical Sciences": [
      "Department of Anatomy",
      "Department of Physiology",
      "Department of Medical Biochemistry",
    ],
    "Faculty of Clinical Sciences": [
      "Department of Medicine",
      "Department of Surgery",
      "Department of Pediatrics",
    ],
    "Faculty of Communication and Information Sciences": [
      "Department of Mass Communication",
      "Department of Library and Information Science",
      "Department of Telecommunication Science",
      "Department of Information Technology",
      "Department of Computer Science",
    ],
    "Faculty of Education": [
      "Department of Educational Management",
      "Department of Counseling Education",
      "Department of Social Studies Education",
    ],
    "Faculty of Engineering and Technology": [
      "Department of Agric and Biosystems Engineering",
      "Deprtment of Biomedical Engineering",
      "Department of Chemical Engineering",
      "Department of Civil Engineering",
      "Department of Computer Engineering",
      "Department of Electrical & Elecctronics Engineering",
      "Department of food Bioprocess Engineering",
      "Department of Mechanical Engineering",
      "Department of Water Resources and Environmental Enigneering",
    ],
    "Faculty of Environmental Sciences": [
      "Department of Architecture",
      "Department of Urban and Regional Planning",
      "Department of Estate Management",
      "Department of Quantity Surveying",
      "Department of Surveying and Geoinformatics",
    ],
    "Faculty of Law": [
      "Department of Private Law",
      "Department of Public Law",
      "Department of International Law",
    ],
    "Faculty of Life Sciences": [
      "Department of Biochemistry",
      "Department of Microbiology",
      "Department of Optometry and Vision Science",
      "Department of Plant Biology",
      "Department of Zoology",
    ],
    "Faculty of Management Sciences": [
      "Department of Accounting",
      "Department of Business Administration",
      "Department of Finance",
      "Department of Marketing",
      "Department of Industrial Relations & Personnel Management",
      "Department of Public Administration",
    ],
    "Faculty of Pharmaceutical Sciences": [
      "Department of Clinical Pharmacy and Pharmacy Practice",
      "Department of Pharmacology & Toxicology",
      "Department of Pharmaceutics & Pharmaceutical Microbology",
      "Department of Pharmaceutical & Microbology & Biotechnology",
      "Department of Pharmcognosy & Drug Develoment",
      "Department of Pharmaceutical and Medicinal Chemistry",
    ],
    "Faculty of Physical Sciences": [
      "Department of Physics",
      "Department of Chemistry",
      "Department of Geology",
      "Department of Geo-Physics",
      "Department of Industrial Chemistry",
      "Department of Mathematics",
      "Department of Statistics",
    ],
    "Faculty of Social Sciences": [
      "Department of Economics",
      "Department of Geography & Environmental Mgt.",
      "Department of Sociology",
      "Department of Psychology",
      "Department of Political Science",
    ],

    "Faculty of Veterinary Medicine": [
      "Department of Veterinary Anatomy",
      "Department of Veterinary Physiology",
      "Department of Veterinary Pathology",
    ],
  };

  useEffect(() => {
    const facultySelect = document.getElementById("facultySelect");
    const departmentSelect = document.getElementById("departmentSelect");

    // Populate faculty
    for (const faculty in universityData) {
      const option = document.createElement("option");
      option.value = faculty;
      option.textContent = faculty;
      facultySelect.appendChild(option);
    }

    // Event listener for faculty selection
    facultySelect.addEventListener("change", () => {
      const selectedFaculty = facultySelect.value;

      // Clear previous departments
      departmentSelect.innerHTML =
        '<option value="">--Select a Department--</option>';

      if (selectedFaculty) {
        // Enable department select
        departmentSelect.disabled = false;

        // Get departments for the selected faculty
        const departments = universityData[selectedFaculty];

        // Populate departments
        departments.forEach((department) => {
          const option = document.createElement("option");
          option.value = department;
          option.textContent = department;
          departmentSelect.appendChild(option);
        });
      } else {
        // Disable department select if no faculty is selected
        departmentSelect.disabled = true;
      }
    });
  }, []);

  /***........................................... */
  // Form input data
  const [formData, setFormData] = useState({
    fullName: "",
    matricNumber: "",
    department: "",
    faculty: "",
    email: "",
    password: "",
    gender: "",
    level: "",
    photo: null,
  });
  const [file, setFile] = useState(null);
  const [matricNumber, setMatricNumber] = useState();
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const inputRef = useRef(null);
  const [image, setImage] = useState();

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      setErrors((prevErrors) => ({ ...prevErrors, photo: null }));
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const requiredWidth = 225;
        const requiredHeight = 225;
        if (img.width !== requiredWidth || img.height !== requiredHeight) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            photo: `Image dimensions should be ${requiredWidth}x${requiredHeight} pixels`,
          }));
          return;
        }
        setImage(file);
        setFormData({ ...formData, photo: file });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };
  /*.....................*/

  // form data validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validate = () => {
    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.matricNumber) {
      newErrors.matricNumber = "Matric number is required";
    } else if (
      !/^[0-9]{2}\/[0-9]{2}[a-zA-Z]{2}[0-9]{3}$/.test(formData.matricNumber)
    ) {
      newErrors.matricNumber =
        "Invalid matric number format. Expected format: 20/52HL120";
    }
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.faculty) newErrors.faculty = "Faculty is required";
    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(formData.password)
    ) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.level) newErrors.level = "level is required";
    if (!formData.photo) newErrors.photo = "Passport photo is required";
    return newErrors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log(formData);
    } else {
      setErrors(validationErrors);
    }
  };
  return (
    <div className="p-[2rem] flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded   sm:w-[70%] m-auto">
        <img src={logo} className="w-20 h-20 mx-auto mb-6" alt="Logo" />
        <h1 className="text-2xl font-bold text-center mb-4 text-[#000080]">
          Register Here
        </h1>
        <p className="text-center mb-8 text-gray-600">
          Please enter your details.
        </p>
        <div className="flex flex-col items-center mb-4">
          <div
            onClick={handleImageClick}
            className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded"
                className="w-full h-full rounded-full"
              />
            ) : (
              "."
            )}
            <input
              type="file"
              ref={inputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
          <button
            className="bg-[#000080] text-white px-4 py-2 rounded mt-4"
            onClick={handleImageClick}
          >
            Upload Image
          </button>
          {progress.started && (
            <progress max="100" value={progress.pc}></progress>
          )}
          {msg && <span>{msg}</span>}
          {errors.photo && <p className="text-red-500">{errors.photo}</p>}
        </div>
        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-[2rem] max-lg:flex flex-col mt-8"
          onSubmit={handleSubmit}
        >
          <div className="">
            <label htmlFor="fullName" className="block text-gray-700">
              Fullname
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full name"
              className="w-full px-4 py-2 border rounded"
            />
            {errors.fullName && (
              <p className="text-red-500">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label htmlFor="matric" className="block text-gray-700">
              Matric Number
            </label>
            <input
              type="text"
              name="matricNumber"
              value={formData.matricNumber}
              onChange={handleChange}
              placeholder="Matric number"
              className="w-full px-4 py-2 border rounded"
            />
            {errors.matricNumber && (
              <p className="text-red-500">{errors.matricNumber}</p>
            )}
          </div>

          <div>
            <label htmlFor="facultySelect" className="block text-gray-700">
              Faculty
            </label>
            <select
              id="facultySelect"
              className="w-full px-4 py-2 border rounded"
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
            >
              <option value="">--Select a Faculty--</option>
            </select>
            {errors.faculty && <p className="text-red-500">{errors.faculty}</p>}
          </div>

          <div>
            <label htmlFor="departmentSelect" className="block text-gray-700">
              Department
            </label>
            <select
              id="departmentSelect"
              className="w-full px-4 py-2 border rounded"
              name="department"
              value={formData.department}
              onChange={handleChange}
              disabled={!formData.faculty}
            >
              <option value="">--Select a Department--</option>
            </select>
            {errors.department && (
              <p className="text-red-500">{errors.department}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="gender" className="block text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="">--Select a Gender--</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <p className="text-red-500">{errors.gender}</p>}
          </div>

          <div>
            <label htmlFor="level" className="block text-gray-700">
              Level
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="">--Select a Level--</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
            </select>
            {errors.level && <p className="text-red-500">{errors.level}</p>}
          </div>

          <button
            className="bg-[#000080] text-white px-4 py-2 rounded col-span-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
        <div className="sign-up flex items-center justify-center mt-4">
          Already have an account?
          <Link to="/login" className="text-blue-800 px-1">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentPortal;
