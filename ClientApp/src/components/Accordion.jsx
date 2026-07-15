import * as React from "react";
import useCollapse from "react-collapsed";
import { useHistory } from "react-router";
import { authHeader } from "../auth";

export function Accordion(props) {
  const [isExpanded, setExpanded] = React.useState(false);
  const { getToggleProps, getCollapseProps } = useCollapse({
    isExpanded,
  });

  const history = useHistory();

  async function handleDelete(event) {
    event.preventDefault();
    const response = await fetch(props.deleteTo, {
      method: "DELETE",
      headers: { "content-type": "application/json", ...authHeader() },
    });
    if (response.status === 200 || response.status === 204) {
      props.reload();
    }
  }

  return (
    <>
      <div className="card">
        <header
          className="card-header"
          {...getToggleProps({
            style: { cursor: "pointer" },
            onClick: () => setExpanded((x) => !x),
          })}
        >
          <p className="card-header-title">
            {props.title}&nbsp;({props.dueDate})
          </p>

          <button className="card-header-icon" aria-label="more options">
            <span className="icon">
              <i
                className={`fas fa-angle-${isExpanded ? "down" : "left"}`}
                aria-hidden="true"
              ></i>
            </span>
          </button>
        </header>
        <div {...getCollapseProps()}>
          {props.children}
          <footer className="card-footer">
            <a href={props.editTo} className="card-footer-item">
              Edit
            </a>
            <a
              href={props.editTo}
              className="card-footer-item"
              onClick={handleDelete}
            >
              Delete
            </a>
          </footer>
        </div>
      </div>
    </>
  );
}
