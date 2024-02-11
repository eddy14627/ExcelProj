import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [tableData, setTableData] = useState([]);

  const fetchDataFromServer = async () => {
    try {
      const response = await axios.get(
        "https://excelproj.onrender.com/getUserData"
      );
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching data from server:", error.message);
    }
  };

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
      setUploadStatus(null);
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await axios.post("https://excelproj.onrender.com/importUser", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("File uploaded successfully");
      setUploadStatus("success");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading file:", error.message);
      setSelectedFile(null);
      setUploadStatus("error");
    }
  };

  useEffect(() => {
    fetchDataFromServer();
  }, [uploadStatus]);

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
        Upload File to Database
      </button>

      {uploadStatus === "success" && (
        <p className="successMessage">File uploaded successfully!</p>
      )}

      {uploadStatus === "error" && (
        <p className="errorMessage">Something went wrong. Please try again.</p>
      )}

      {tableData.length > 0 && (
        <table className="dataTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Nationality</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.nationality}</td>
                <td>{data.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FileUploader;
