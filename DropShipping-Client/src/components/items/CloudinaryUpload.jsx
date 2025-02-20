import React, { useEffect, useState } from "react";
import ADD from "../../assets/add_.svg";

const CloudinaryUpload = ({setUrlRecieved}) => {
  const [widget, setWidget] = useState(null);
  const [isCloudinaryReady, setIsCloudinaryReady] = useState(false); // New state

  const [cloudinaryResponse, setCloudinaryResponse] = useState(null);
  console.log(cloudinaryResponse);

  useEffect(() => {
    // Check if Cloudinary is already loaded. This is important for preventing multiple script injections.
    if (window.cloudinary && window.cloudinary.createUploadWidget) {
      setIsCloudinaryReady(true); // Cloudinary is ready, proceed
      return; // Exit the effect early
    }

    // Load the Cloudinary script only if it's not already loaded
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/global/all.js"; // Correct URL
    script.async = true;

    script.onload = () => {
      setIsCloudinaryReady(true); // Set state when Cloudinary is ready
    };

    script.onerror = (error) => {
      console.error("Error loading Cloudinary script:", error);
    }

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up on unmount
      if (widget) {
        widget.destroy();
      }
    };
  }, []);

  useEffect(() => {
     if (isCloudinaryReady) { // Only initialize widget if Cloudinary is ready
        const myWidget = window.cloudinary.createUploadWidget(
          {
            cloudName: "dzv4vfxhw", // Replace with your cloud name
            uploadPreset: "Ecomerce", // Replace with your preset
          },
          (error, result) => {
            if (!error && result && result.event === "success") {

              setUrlRecieved(result.info.url); // .url
              //console.log("Done! Here is the image info: ", result.info);
              // ... handle result.info
            } else if (error) {
              console.error("Cloudinary upload error:", error);
            }
          }
        );
        setWidget(myWidget);
     }
  }, [isCloudinaryReady])

  const handleUpload = () => {
    if (widget) {
      widget.open();
    }
  };

  if (!isCloudinaryReady) {
    return <div>Loading Cloudinary...</div>; // Display loading message
  }

  return <div className="g-img add-cluadinary" onClick={handleUpload}><img src={ADD} alt="" /></div>;
};

export default CloudinaryUpload;