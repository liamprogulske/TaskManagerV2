import React, { useState } from "react";
import { Menu } from "../components/Menu";
import { Footer } from "../components/Footer";
import { useHistory } from "react-router";
import { useDropzone } from "react-dropzone";
import { authHeader } from "../../auth";

export function SignUp() {
  const history = useHistory();

  const [isUploading, setIsUploading] = useState(false);

  const [errorMessage, setErrorMessage] = useState([]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
  });

  function handleStringFieldChange(event) {
    const value = event.target.value;
    const fieldName = event.target.name;
    const updatedUser = { ...newUser, [fieldName]: value };
    setNewUser(updatedUser);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    const response = await fetch("/api/Users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const apiResponse = await response.json();

    console.log(apiResponse);

    if (apiResponse.status === 400) {
      setErrorMessage(Object.values(apiResponse.errors));
    } else {
      history.push("/");
    }
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropFile,
  });

  async function onDropFile(acceptedFiles) {
    const fileToUpload = acceptedFiles[0];
    console.log(fileToUpload);

    const formData = new FormData();

    formData.append("file", fileToUpload);

    try {
      setIsUploading(true);

      const response = await fetch("/api/uploads", {
        method: "POST",
        headers: {
          ...authHeader(),
        },
        body: formData,
      });

      setIsUploading(false);

      if (response.status === 200) {
        const apiResponse = await response.json();

        const url = apiResponse.url;

        setNewUser({ ...newUser, photoURL: url });
      } else {
        setErrorMessage(Object.values("Unable to upload image"));
      }
    } catch (error) {
      console.debug(error);
      setErrorMessage(Object.values("Unable to upload image"));
      setIsUploading(false);
    }
  }

  let dropZoneMessage = "Drag your profile picture here!";

  if (isUploading) {
    dropZoneMessage = "Uploading...";
  }

  if (isDragActive) {
    dropZoneMessage = "Drop the files here...";
  }

  return (
    <>
      <Menu message="Welcome, please Sign-up!" color="is-link" />
      <div className="login-main">
        <form className="box login-box" onSubmit={handleFormSubmit}>
          {errorMessage.length > 0 && (
            <article className="message is-warning">
              <div className="message-body content">
                <ul>
                  {errorMessage.map((msg) => (
                    <li>{msg}</li>
                  ))}
                </ul>
              </div>
            </article>
          )}
          <h1 className="has-text-centered login-text">
            Please provide your details:
          </h1>

          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="name"
                placeholder="Name"
                value={newUser.name}
                onChange={handleStringFieldChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email Address</label>

            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="email"
                name="email"
                placeholder="Email"
                value={newUser.email}
                onChange={handleStringFieldChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <label className="label">Password</label>

            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                name="password"
                placeholder="Password"
                value={newUser.password}
                onChange={handleStringFieldChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          {/* <div className="field">
            <label className="label">Re-enter Password</label>

            <p className="control has-icons-left">
              <input className="input" type="password" placeholder="Password" />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div> */}
          {newUser.photoURL ? (
            <p>
              <img
                alt="Currently uploaded"
                width={200}
                src={newUser.photoURL}
              />
            </p>
          ) : null}
          <div className="file-drop-zone">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {dropZoneMessage}
            </div>
          </div>
          <div className="field">
            <p className="control login-buttons has-text-centered">
              <button
                className="button is-link signup-register-button"
                type="submit"
              >
                Register
              </button>
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
