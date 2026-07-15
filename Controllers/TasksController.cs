using System;
using System.Collections.Generic;
using System.Linq;
using tt = System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskTracker.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace TaskTracker.Controllers
{
    // All of these routes will be at the base URL:     /api/Tasks
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case TasksController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public TasksController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Tasks
        //
        // Returns a list of all your Tasks
        //
        [HttpGet]
        public async tt.Task<ActionResult<IEnumerable<Task>>> GetTasks()
        {
            // Uses the database context in `_context` to request all of the Tasks, sort
            // them by row id and return them as a JSON array.
            return await _context.Tasks.OrderBy(row => row.Id).ToListAsync();
        }

        // GET: api/Tasks/5
        //
        // Fetches and returns a specific task by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async tt.Task<ActionResult<Task>> GetTask(int id)
        {
            // Find the task in the database using `FindAsync` to look it up by id
            var task = await _context.Tasks.FindAsync(id);

            // If we didn't find anything, we receive a `null` in return
            if (task == null)
            {
                // Return a `404` response to the client indicating we could not find a task with this id
                return NotFound();
            }

            //  Return the task as a JSON object.
            return task;
        }

        // PUT: api/Tasks/5
        //
        // Update an individual task with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a Task
        // variable named task. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Task POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async tt.Task<IActionResult> PutTask(int id, Task task)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != task.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in task to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from task
            _context.Entry(task).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!TaskExists(id))
                {
                    // If the record we tried to update was already deleted by someone else,
                    // return a `404` not found
                    return NotFound();
                }
                else
                {
                    // Otherwise throw the error back, which will cause the request to fail
                    // and generate an error to the client.
                    throw;
                }
            }

            // Return a copy of the updated data
            return Ok(task);
        }

        // POST: api/Tasks
        //
        // Creates a new task in the database.
        //
        // The `body` of the request is parsed and then made available to us as a Task
        // variable named task. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Task POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async tt.Task<ActionResult<Task>> PostTask(Task task)
        {
            // Indicate to the database context we want to add this new record
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetTask", new { id = task.Id }, task);
        }

        // DELETE: api/Tasks/5
        //
        // Deletes an individual task with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

        public async tt.Task<IActionResult> DeleteTask(int id)
        {
            // Find this task by looking for the specific id
            var task = await _context.Tasks.Include(task => task.Project).FirstOrDefaultAsync(t => t.Id == id);
            if (task == null)
            {
                // There wasn't a task with that id so return a `404` not found
                return NotFound();
            }

            if (task.Project.UserId != GetCurrentUserId())
            {
                // Make a custom error response
                var response = new
                {
                    status = 401,
                    errors = new List<string>() { "Not Authorized" }
                };
                // Return our error with the custom response
                return Unauthorized(response);
            }

            // Tell the database we want to remove this record
            _context.Tasks.Remove(task);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(task);
        }

        // Private helper method that looks up an existing task by the supplied id
        private bool TaskExists(int id)
        {
            return _context.Tasks.Any(task => task.Id == id);
        }
        private int GetCurrentUserId()
        {
            return int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
        }
    }
}