import React, { useState, useRef } from "react";
import styled from "styled-components";
import { mushroomAPI } from "../../../api/mushroomAPI";
import { hexToRgba, palette } from "../../../palette";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

const TakePhoto = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [cameraActive, setCameraActive] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const navigate = useNavigate();

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const uploadedFile = event.dataTransfer.files[0];
    setFile(uploadedFile);
    setFileUrl(URL.createObjectURL(uploadedFile));
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      await handleStopPhoto();
      setFile(selectedFile);
      const fileUrl = URL.createObjectURL(selectedFile);
      setFileUrl(fileUrl);
    }
  };

  const handleTakePhoto = () => {
    handleClear();
    setCameraActive(true);
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  };
  const handleStopPhoto = async () => {
    if (videoRef.current) {
      //@ts-ignore
      const tracks = videoRef?.current?.srcObject?.getTracks() || [];
      //@ts-ignore
      tracks.forEach((track) => {
        track.stop();
        console.log("Closing camera stream...");
      });
    }
    setCameraActive(false);
  };

  const handleClear = () => {
    setFile(null);
    setFileUrl(null);
  };

  const handleCapturePhoto = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = 540;
        canvas.height = 400;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "photo.jpg", {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            setFile(file);
            const fileUrl = URL.createObjectURL(file);
            setFileUrl(fileUrl);
          }
        }, "image/jpeg");
      }
    }
    await handleStopPhoto();
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await mushroomAPI.getPredictionFromImage(file);

      const ressy = JSON.stringify(res);
      navigate(`/prediction?prediction=${ressy}`);
    }
  };

  return (
    <StyledWrapper>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: dragging
            ? `3px dashed ${hexToRgba(palette.brownDark, 0.8)}`
            : `3px solid ${hexToRgba(palette.lightOrange, 0.4)}`,
          backgroundColor: `${hexToRgba(palette.lighterOrange, 0.2)}`,
          height: "calc((100vw - 18px)*0.62)",
          maxHeight: "500px",
          width: "calc(100vw - 18px)",
          maxWidth: "810px",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {!fileUrl && (
          <div style={{ zIndex: 10 }}>
            <canvas
              ref={canvasRef}
              style={{ display: "none", height: "400px", width: "auto" }}
            />
            <video
              ref={videoRef}
              style={{ height: "400px", width: "auto" }}
              autoPlay
              muted
            />
          </div>
        )}
        {!fileUrl && (
          <div
            style={{
              position: "absolute",
              height: "250px",
              width: "auto",
              top: "50%",
              left: "50%",
              zIndex: "1",
              transform: "translate(-50%, -50%)",
            }}
          >
            <img
              src={`/dd-icon.png`}
              style={{
                height: "250px",
                width: "auto",
                zIndex: 2,
              }}
              alt={"draganddropicon"}
            />
            <img
              src={`/chantarell-icon.png`}
              style={{
                height: "400px",
                width: "auto",
                borderRadius: "50%",
                position: "absolute",
                opacity: 0.6,
                top: "50%",
                left: "50%",
                zIndex: -1,
                transform: "translate(-50%, -50%)",
              }}
              alt={"chanty"}
            />
            <div
              style={{
                zIndex: 2,
                marginTop: "-30px",
                textAlign: "center",
                fontWeight: "600",
                fontSize: "25px",
              }}
            >
              {"Ta bilde eller slipp fil"}
            </div>
          </div>
        )}
        {fileUrl && (
          <img
            src={fileUrl}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
            alt="Uploaded File"
          />
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {!cameraActive && (
          <button onClick={handleTakePhoto}>
            {
              <img
                src={`/photo-icon.png`}
                style={{
                  height: "30px",
                  width: "auto",
                }}
                alt={"edible"}
              />
            }
            {"Bruk kamera"}
          </button>
        )}
        {cameraActive && (
          <button onClick={handleCapturePhoto}>Ta bilde!</button>
        )}
        {cameraActive && <button onClick={handleStopPhoto}>Stop</button>}
        {fileUrl && <button onClick={handleUpload}>Last opp</button>}
        {fileUrl && <button onClick={handleClear}>Slett</button>}
      </div>
    </StyledWrapper>
  );
};

export default TakePhoto;

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin: 6px;
    background: linear-gradient(to bottom, #ff69b4, #ff8c00);
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button:hover {
    background: linear-gradient(to bottom, #ff8c00, #ff69b4);
  }

  input {
    margin: 6px;
    background: linear-gradient(to bottom, #ff69b4, #ff8c00);
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  input:hover {
    background: linear-gradient(to bottom, #ff8c00, #ff69b4);
  }
`;
