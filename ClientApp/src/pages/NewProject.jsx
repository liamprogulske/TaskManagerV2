import React, { useState } from "react";
import { Menu } from "../components/Menu";
import { Footer } from "../components/Footer";
import { useHistory } from "react-router-dom";
import { authHeader } from "../../auth";

export function NewProject() {
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    dueDate: new Date().toISOString().split("T")[0],
    completed: false,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  function handleStringFieldChange(event) {
    const value = event.target.value;
    const fieldName = event.target.name;
    const updatedProject = { ...newProject, [fieldName]: value };

    setNewProject(updatedProject);
  }

  function handleDueDate(event) {
    const newDueDateText = event.target.value;
    const updatedProject = { ...newProject, dueDate: newDueDateText };

    setNewProject(updatedProject);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    const response = await fetch("/api/Projects", {
      method: "POST",
      headers: { "content-type": "application/json", ...authHeader() },
      body: JSON.stringify(newProject),
    });
    if (response.status === 401) {
      setErrorMessage("Not Authorized");
    } else {
      if (response.status === 400) {
        const json = await response.json();

        setErrorMessage(Object.values(json.errors).join(" "));
      } else {
        history.push("/projects");
      }
    }
  }
  return (
    <>
      <Menu message="Please provide Project details" color="is-primary" />
      <fieldset className="new-project-form">
        <legend>New Project</legend>
        {errorMessage && (
          <article className="message is-warning">
            <div className="message-body">{errorMessage}</div>
          </article>
        )}
        <form onSubmit={handleFormSubmit}>
          <div className="form-field">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Project Name"
                  name="name"
                  value={newProject.name}
                  onChange={handleStringFieldChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Project Description"
                  name="description"
                  value={newProject.description}
                  onChange={handleStringFieldChange}
                ></textarea>
              </div>
            </div>
            <div className="field">
              <label className="label">Estimated Due Date</label>
              <div className="control">
                <input
                  className="input"
                  type="date"
                  placeholder="Estimated Project Due Date"
                  name="dueDate"
                  value={newProject.dueDate}
                  onChange={handleDueDate}
                />
              </div>
            </div>
            <div className="field is-grouped is-grouped-centered has-addons form-buttons">
              <button className="button is-light is-small">Discard</button>

              <button className="button is-primary is-small" type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      </fieldset>

      <Footer />
    </>
  );
}
