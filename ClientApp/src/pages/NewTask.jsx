import React, { useState } from "react";
import { Menu } from "../components/Menu";
import { Footer } from "../components/Footer";
import { useHistory, useParams } from "react-router-dom";

export function NewTask() {
  const params = useParams();
  // @ts-ignore
  const id = params.id;

  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    estimatedTime: "",
    startDate: new Date().toISOString().split("T")[0],
    dueDate: new Date().toISOString().split("T")[0],
    completed: false,
    projectId: id,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  function handleStringFieldChange(event) {
    const value = event.target.value;
    const fieldName = event.target.name;
    const updatedTask = { ...newTask, [fieldName]: value };

    setNewTask(updatedTask);
  }

  function handleDateFieldChange(event) {
    const value = event.target.value;
    const fieldName = event.target.name;
    const updatedTask = { ...newTask, [fieldName]: value };

    setNewTask(updatedTask);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    const response = await fetch("/api/Tasks", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newTask),
    });

    const json = await response.json();

    if (response.status === 400) {
      setErrorMessage(Object.values(json.errors).join(" "));
    } else {
      history.push(`/projects/${id}`);
    }
  }
  return (
    <>
      <Menu message="Please provide Task details" color="is-info" />
      <form onSubmit={handleFormSubmit}>
        <fieldset className="new-task-form">
          <legend>New Task</legend>
          {errorMessage && (
            <article className="message is-warning">
              <div className="message-body">{errorMessage}</div>
            </article>
          )}
          <div className="form-field">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Task Name"
                  name="name"
                  value={newTask.name}
                  onChange={handleStringFieldChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Task Description"
                  name="description"
                  value={newTask.description}
                  onChange={handleStringFieldChange}
                ></textarea>
              </div>
            </div>
            <div className="field">
              <label className="label">Estimated Time</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  step=".5"
                  min=".5"
                  placeholder="Estimated Time (in hours)"
                  name="estimatedTime"
                  value={newTask.estimatedTime}
                  onChange={handleStringFieldChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Start Date</label>
              <div className="control">
                <input
                  className="input"
                  type="date"
                  placeholder="Task Start Date"
                  name="startDate"
                  value={newTask.startDate}
                  onChange={handleDateFieldChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Due Date</label>
              <div className="control">
                <input
                  className="input"
                  type="date"
                  placeholder="Task Due Date"
                  name="dueDate"
                  value={newTask.dueDate}
                  onChange={handleDateFieldChange}
                />
              </div>
            </div>
            <div className="field is-grouped is-grouped-centered has-addons form-buttons">
              <button className="button is-light is-small">Discard</button>

              <button className="button is-info is-small" type="submit">
                Save
              </button>
            </div>
          </div>
        </fieldset>
      </form>

      <Footer />
    </>
  );
}
