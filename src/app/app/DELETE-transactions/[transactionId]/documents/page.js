'use client';
import { Button, Card, CardBody, Table, ProgressBar, Alert } from "react-bootstrap";
import { useState } from "react";
import './documents.css'

const allowedFileFormats = ["application/pdf", "image/jpeg", "image/png", "image/gif"];

const mockFileUpload = (file) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: file.name,
                size: file.size,
                type: file.type,
                uploadedAt: new Date().toISOString(),
            });
        }, 1000);
    });
};

export default function DocumentsPage() {
    const [files, setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [isDragging, setIsDragging] = useState(false);
    const [alertQueue, setAlertQueue] = useState([]);

    const handleFileUpload = async (event) => {
        const uploadedFiles = Array.from(event.target.files);
        const unsupportedFiles = uploadedFiles.filter(file => !allowedFileFormats.includes(file.type));
        const supportedFiles = uploadedFiles.filter(file => allowedFileFormats.includes(file.type));

        if (unsupportedFiles.length > 0) {
            setAlertQueue(prevQueue => [...prevQueue, `The following files were skipped because they are not supported: ${unsupportedFiles.map(file => file.name).join(", ")}`]);
        }

        const totalFiles = supportedFiles.length;

        for (let i = 0; i < totalFiles; i++) {
            const file = supportedFiles[i];
            const uploadedFile = await mockFileUpload(file);
            setFiles(prevFiles => [...prevFiles, uploadedFile]);
            setUploadProgress(Math.round(((i + 1) / totalFiles) * 100));
        }

        setUploadProgress(0);
    };

    const handleSort = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });

        setFiles(prevFiles => {
            const sortedFiles = [...prevFiles].sort((a, b) => {
                if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
                if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
                return 0;
            });
            return sortedFiles;
        });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === "ascending" ? "\u25B2" : "\u25BC";
        }
        return null;
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(false);

        const droppedFiles = Array.from(event.dataTransfer.files);
        const unsupportedFiles = droppedFiles.filter(file => !allowedFileFormats.includes(file.type));
        const supportedFiles = droppedFiles.filter(file => allowedFileFormats.includes(file.type));

        if (unsupportedFiles.length > 0) {
            setAlertQueue(prevQueue => [...prevQueue, `The following files were skipped because they are not supported: ${unsupportedFiles.map(file => file.name).join(", ")}`]);
        }

        const totalFiles = supportedFiles.length;

        for (let i = 0; i < totalFiles; i++) {
            const file = supportedFiles[i];
            const uploadedFile = await mockFileUpload(file);
            setFiles(prevFiles => [...prevFiles, uploadedFile]);
            setUploadProgress(Math.round(((i + 1) / totalFiles) * 100));
        }

        setUploadProgress(0);
    };

    const dismissAlert = () => {
        setAlertQueue(prevQueue => prevQueue.slice(1));
    };

    return (
        <>
            <div className="row">
                <div className="col">
                    <h4>Documents</h4>
                    <Card>
                        <CardBody>
                            {alertQueue.length > 0 && <Alert variant="warning" onClose={dismissAlert} dismissible>{alertQueue[0]}</Alert>}
                            <div
                                className={`file-upload-container ${isDragging ? 'dragging' : ''}`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <label className="btn btn-primary">
                                    Choose Files
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleFileUpload}
                                        className='file-upload-button'
                                        style={{ display: 'none' }}
                                    />
                                </label>
                                {uploadProgress > 0 && <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />}
                            </div>
                        </CardBody>
                    </Card>
                    <Table striped bordered className="mt-3 file-upload-table">
                        <thead>
                            <tr>
                                <th><input type="checkbox" /></th>
                                <th onClick={() => handleSort("name")}>File Name {getSortIcon("name")}</th>
                                <th>Assigned Checklist</th>
                                <th onClick={() => handleSort("size")}>File Size {getSortIcon("size")}</th>
                                <th onClick={() => handleSort("uploadedAt")}>Date Uploaded {getSortIcon("uploadedAt")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map((file, index) => (
                                <tr key={index}>
                                    <td><input type="checkbox" /></td>
                                    <td>{file.name}</td>
                                    <td>--</td>
                                    <td>{(file.size / 1024).toFixed(2)} KB</td>
                                    <td>{new Date(file.uploadedAt).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}
