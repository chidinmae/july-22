import React, { useState } from "react";
import { MDBContainer, MDBInput } from "mdb-react-ui-kit";
var randomWords = require("random-words");

export default function ImageUrlForm() {
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState(false);
  const [alt, setAlt] = useState("");
  const [altError, setAltError] = useState(false);
  const [importedUrl, setImportedUrl] = useState(false);
  const [randomColor, setRandomColor] = useState("");

  const getRandomColor = () => {
    const x = Math.floor(Math.random() * 256);
    const y = Math.floor(Math.random() * 256);
    const z = Math.floor(Math.random() * 256);
    const bgColor = `rgb(${x},${y},${z})`;
    return bgColor;
  };

  const submitForm = () => {
    if (url === "") {
      setUrlError(true);
      return;
    } else {
      setUrlError(false);
    }

    if (alt === "") {
      setAltError(true);
      return;
    } else {
      setAltError(false);
    }
    setImportedUrl(!importedUrl);
  };

  return (
    <MDBContainer>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "350px" }}
      >
        {importedUrl ? (
          <div>
            <div className="text-center">
              <img alt={alt} className="img-fluid rounded" src={url} />
            </div>
            <div style={{ color: randomColor }}>{randomWords(5).join(" ")}</div>
            <div className="text-center mt-2">
              <button
                className="btn btn-secondary btn-rounded"
                onClick={() => {
                  setUrl("");
                  setAlt("");
                  setImportedUrl(!importedUrl);
                }}
                type="button"
              >
                Start Over
              </button>
            </div>
          </div>
        ) : (
          <form>
            <>
              {urlError && (
                <div style={{ color: "red" }}>Image url is required!</div>
              )}
              <div className="mb-4" style={{ width: "350px" }}>
                <MDBInput
                  aria-describedby="helptext"
                  id="url"
                  label="Photo Url"
                  onChange={(event) => setUrl(event.target.value)}
                  type="url"
                />
                <div className="form-text" id="url-helptext">
                  Enter the url to a photo.
                </div>
              </div>
              {altError && (
                <div style={{ color: "red" }}>Alt text is required!</div>
              )}
              <div className="mb-4" style={{ width: "350px" }}>
                <MDBInput
                  aria-describedby="alt-helptext"
                  id="alt"
                  label="Alt Text"
                  onChange={(event) => setAlt(event.target.value)}
                  type="text"
                />
                <div className="form-text" id="alt-helptext">
                  Enter the image alt text.
                </div>
              </div>
              <div className="text-center d-inline-flex p-2">
                <button
                  className="btn btn-primary btn-rounded"
                  onClick={() => {
                    setRandomColor(getRandomColor());
                    submitForm();
                  }}
                  type="button"
                >
                  Import
                </button>
              </div>
            </>
          </form>
        )}
      </div>
    </MDBContainer>
  );
}
