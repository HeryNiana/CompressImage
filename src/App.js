import React, { useState } from "react";
import Compressor from "compressorjs";
import JSZip from "jszip";
import "./styles.css";
import PhoneBookForm from "./components/phoneBookForm";
import InformationTable from "./components/informationTable";
import DownloadLink from "./Download";

export default function App() {
  const [phoneBook, setPhoneBook] = useState([]);

  const addEntryToPhoneBook = (entry) => {
    setPhoneBook([...phoneBook, entry]);
  };

  const [uploaded, setUploaded] = useState([]);
  const [show, setShow] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [link, setLink] = useState("");

  const handleFileUpload = (e) => {
    const files = e.target.files;
    setUploaded(files);
  };

  const handleReset = () => {
    window.location.reload(false);
  };

  const handleCompression = (e) => {
    setIsLoad(true);
    if (uploaded) {
      const zip = new JSZip();
      const promises = [];
      for (let i = 0; i < uploaded.length; i++) {
        var files = uploaded[i];
        if (files.size > 80000) {
          const promise = new Promise((resolve) => {
            new Compressor(files, {
              quality: 0.6,
              success: (compressedResult) => {
                const fileName = `${uploaded[i].name}`;
                zip.file(fileName, compressedResult, { binary: true });
                resolve();
              },
            });
          });
          promises.push(promise);
        }
      }
      Promise.all(promises).then(() => {
        zip.generateAsync({ type: "blob" }).then((blob) => {
          const downloadLink = URL.createObjectURL(blob);
          setLink(downloadLink);
          setShow(true);
        });
      });
    }
  };

  return (
    <div
      style={{
        marginLeft: "500px",
        paddingTop: "50px",
      }}
    >
      <h1>Compression des images</h1>
      <div className="container">
        <input
          type="file"
          multiple={true}
          accept="image/png, image/jpeg, image/jpg, image/gif, image/webp, image/jfif, image/pjp, image/pjpeg"
          id="upload"
          onChange={handleFileUpload}
        />
      </div>
      <br />
      <button onClick={handleCompression} disabled={!uploaded.length}>
        Compress
      </button>

      <div className="container">
        {isLoad ? (
          <div>
            {show ? (
              <div
                style={{
                  paddingTop: "10px",
                  width: "300px",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <DownloadLink fileUrl={link} fileName="compressed_images.zip" />
                <button onClick={handleReset}>Reset field</button>
              </div>
            ) : (
              <div>
                <p>Loading...</p>
              </div>
            )}
          </div>
        ) : (
          <p>Pas des images à extraire !!</p>
        )}
      </div>
      <div>
        <PhoneBookForm addEntryToPhoneBook={addEntryToPhoneBook} />
        <InformationTable phoneBook={phoneBook} />
      </div>
    </div>
  );
}
