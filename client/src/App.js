import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];

    if (newFile || selectedFile) {
      setSelectedFile(newFile);
      setUploadStatus(null);

      event.target.value = null;
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "https://excelproj.onrender.com/importUser",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("File uploaded successfully:", response.data);
      setUploadStatus("success");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading file:", error.message);
      setSelectedFile(null);
      setUploadStatus("error");
    }
  };

  return (
    <div className="container">
      <label className="fileInputLabel">
        Choose File
        <input
          type="file"
          onChange={handleFileChange}
          className="fileInput"
          cursor="pointer"
        />
      </label>
      <button onClick={handleUpload} className="uploadButton">
        Upload File
      </button>

      {uploadStatus === "success" && (
        <p className="successMessage">File uploaded successfully!</p>
      )}

      {uploadStatus === "error" && (
        <p className="errorMessage">Something went wrong. Please try again.</p>
      )}
    </div>
  );
};

export default FileUploader;
