using System;
using System.ComponentModel.DataAnnotations;


namespace TaskTracker.Models
{
    public class Task
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "You must enter a Task Name.")]

        public string Name { get; set; }
        public string Description { get; set; }
        public string EstimatedTime { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime CreatedOn { get; private set; } = DateTime.Now;
        public bool Completed { get; set; }

        public int ProjectId { get; set; }

        public Project Project { get; set; }
    }
}