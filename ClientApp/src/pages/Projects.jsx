import React, { useEffect, useState } from "react";
import { Menu } from "../components/Menu";
import { Footer } from "../components/Footer";
import { Accordion } from "../components/Accordion";
import { Link } from "react-router-dom";
import { authHeader, getUser, isLoggedIn } from "../../auth";

export function Projects() {
  const [projects, setProjects] = useState([]);

  async function loadProjects() {
    const response = await fetch("/api/projects", {
      headers: { "content-type": "application/json", ...authHeader() },
    });

    if (response.ok) {
      const json = await response.json();

      setProjects(json);
    }
  }
  useEffect(() => {
    loadProjects();
  }, []);

  const user = getUser();
  return (
    <>
      <Menu message={`${user.name}'s Projects`} color="is-primary" />
      <fieldset className="projects-accordion">
        <legend>{user.name}'s Projects</legend>
        {projects.map((project) => (
          <Accordion
            key={project.id}
            id={project.id}
            title={project.name}
            dueDate={new Date(project.dueDate).toLocaleDateString("en-US")}
            editTo={`/projects/${project.id}`}
            deleteTo={`/api/Projects/${project.id}`}
            reload={loadProjects}
          >
            <div className="project-detail-field card-content">
              <div className="content">
                <p className="is-strong">{project.description}</p>
                <ul className="task-list">
                  {project.tasks.map((task) => (
                    <li key={task.id}> {task.name} </li>
                  ))}
                </ul>
              </div>
            </div>
          </Accordion>
        ))}

        <div className="projects-actions">
          <span className="new-project-button has-text-centered projects-button">
            {isLoggedIn() ? (
              <Link
                className="fas fa-plus-circle fa-2x plus-icon"
                to="/new"
              ></Link>
            ) : null}
            <span className="caption">New Project</span>
          </span>
          <span className="sort-project-button has-text-centered projects-button">
            <i className="fas fa-sort-amount-down fa-2x"></i>
            <span className="caption">Sort</span>
          </span>
        </div>
      </fieldset>

      <Footer />
    </>
  );
}
