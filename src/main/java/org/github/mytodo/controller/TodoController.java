package org.github.mytodo.controller;

import org.github.mytodo.dto.TodoDto;
import org.github.mytodo.entity.Todo;
import org.github.mytodo.service.TodoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Timestamp;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;

@RestController
@RequestMapping("/todo")
public class TodoController {
    private TodoService todoService;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public ResponseEntity<List<Todo>> getTodos() {
        return ResponseEntity.ok(todoService.getAllTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodo(@PathVariable Long id) {
        logger.debug("Get todo: {}", id);
        Optional<Todo> todo = todoService.findById(id);
        return todo.map(t -> ResponseEntity.status(HttpStatus.OK)
                    .body(t)).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Todo> createTodo(@Valid @RequestBody TodoDto todoDto) {
        logger.debug("Creating todo {}", todoDto);
        return ResponseEntity.ok(todoService.createTodo(todoDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @Valid @RequestBody TodoDto todoDto) {
        logger.debug("Update todo {}", todoDto);
        Optional<Todo> updatedTodo = todoService.updateTodo(new Todo(id, todoDto.getDescription()).marked(todoDto.isMarked()));
        return updatedTodo.map(t -> ResponseEntity.status(HttpStatus.OK)
                .body(t)).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTodo(@PathVariable Long id) {
        logger.debug("Delete todo {}", id);
        return todoService.deleteTodo(id).map(t -> ResponseEntity.ok().build()).orElse(ResponseEntity.notFound().build());
    }

}
