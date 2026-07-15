import React, { useState, useEffect } from "react";
import { Menu } from "../components/Menu";
import { Footer } from "../components/Footer";
import { Accordion } from "../components/Accordion";
import { Link, useParams } from "react-router-dom";
import { isLoggedIn, authHeader } from "../../auth";

export function Project() {
  const params = useParams();
  // @ts-ignore
  const id = params.id;

  const [project, setProject] = useState({
    name: "",
    description: "",
    dueDate: new Date().toISOString().split("T")[0],
    completed: false,
    tasks: [],
  });
  async function fetchProject() {
    const response = await fetch(`/api/Projects/${id}`, {
      headers: { "content-type": "application/json", ...authHeader() },
    });
    if (response.ok) {
      const apiData = await response.json();

      console.log(apiData);
      setProject(apiData);
    }
  }
  useEffect(() => {
    fetchProject();
  }, [id]);

  return (
    <>
      <Menu message="Project Details" color="is-info" />

      <fieldset className="project-accordion">
        <legend>{project.name}</legend>
        <div className="progress-bar">
          <progress className="progress is-info" value="15" max="100">
            15%
          </progress>
          <span className="caption">Current Project Progress: 15%</span>
        </div>
        <div className="project-main-field">
          <div>
            {project.tasks.map((task) => (
              <Accordion
                className="project-accordion-projects"
                key={task.id}
                title={task.name}
                editTo={`/editTask/${task.id}`}
                dueDate={
                  new Date(`${task.dueDate}`).toISOString().split("T")[0]
                }
                deleteTo={`/api/Tasks/${task.id}`}
                reload={fetchProject}
              >
                <div className="task-detail-field">
                  <p>{task.description}</p>
                  <ul>
                    <li>Estimated Time: {task.estimatedTime}</li>
                    <li>
                      Start Date:{"  "}
                      {
                        new Date(`${task.startDate}`)
                          .toISOString()
                          .split("T")[0]
                      }
                    </li>
                    <li>
                      Due Date:{"  "}
                      {new Date(`${task.dueDate}`).toISOString().split("T")[0]}
                    </li>
                    <li>
                      Created On:{"  "}
                      {
                        new Date(`${task.createdOn}`)
                          .toISOString()
                          .split("T")[0]
                      }
                    </li>
                  </ul>

                  <div className="buttons has-addons is-centered">
                    <button
                      className={`button is-small ${
                        task.completed ? "is-info" : "is-light"
                      }`}
                    >
                      In-Progress
                    </button>
                    <button
                      // I need to not repeat. Set up a onClick function that does the work
                      // of changing style and completed/!completed.
                      className={`button is-small ${
                        task.completed ? "is-info" : "is-light"
                      }`}
                    >
                      Complete
                    </button>
                  </div>
                </div>
              </Accordion>
            ))}
          </div>

          <div className="project-actions">
            <span className="new-project-button has-text-centered project-button">
              {isLoggedIn() ? (
                <Link
                  className="fas fa-tasks fa-2x new-task-icon"
                  to={`/projects/${id}/newTask`}
                ></Link>
              ) : null}
              <span className="caption">New Task</span>
            </span>
            <span className="sort-project-button has-text-centered project-button">
              <i className="fas fa-sort-amount-down fa-2x"></i>
              <span className="caption">Sort</span>
            </span>
          </div>
        </div>
      </fieldset>

      <Footer />
    </>
  );
}
