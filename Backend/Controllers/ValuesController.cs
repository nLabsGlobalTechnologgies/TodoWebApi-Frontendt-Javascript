using IEATodoAPI.Context;
using IEATodoAPI.DTOs;
using IEATodoAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace IEATodoAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        AppDbContext context = new();

        [HttpGet]
        public IActionResult GetAll()
        {
            var todos = context.Todos.ToList();
            return Ok(todos);
        }

        [HttpPost]
        public IActionResult Add(AddTodoDto dto)
        {
            Todo todo = new()
            {
                Title = dto.Title,
                Completed = dto.Completed
            };
            context.Add(todo);
            context.SaveChanges();
            return NoContent();
        }

        [HttpGet("id")]
        public IActionResult RemoveTodo(Guid id)
        {
            var todo = context.Todos.Where(t => t.Id == id).FirstOrDefault();
            context.Remove(todo);
            context.SaveChanges();
            return NoContent();
        }

        [HttpPost]
        public IActionResult Update(UpdateTodoDto dto)
        {
            var todo = context.Todos.Where(t => t.Id == dto.Id).FirstOrDefault();
            todo.Title = dto.Title;
            todo.Completed = dto.Completed;
            context.SaveChanges();
            return NoContent();
        }
    }
}
