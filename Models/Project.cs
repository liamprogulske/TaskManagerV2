using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TaskTracker.Models
{
    public class Project
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "You must enter a Project Name.")]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required(ErrorMessage = "You must enter a Due Date.")]
        public DateTime DueDate { get; set; }
        public bool Completed { get; set; }
        public List<Task> Tasks { get; set; }
        public int UserId { get; set; }
    }
}