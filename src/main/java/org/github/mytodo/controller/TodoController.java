package org.github.mytodo.controller;

import org.github.mytodo.dto.TodoDto;
import org.github.mytodo.entity.Todo;
import org.github.mytodo.service.FolderService;
import org.github.mytodo.service.TodoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/todo")
public class TodoController {
    private final TodoService todoService;
    private final FolderService folderService;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    public TodoController(TodoService todoService, FolderService folderService) {
        this.todoService = todoService;
        this.folderService = folderService;
    }

    @GetMapping
    public ResponseEntity<List<Todo>> getTodos() {
        return ResponseEntity.ok(todoService.getAllTodos());
    }

    @GetMapping("/folder/{folderId}")
    public ResponseEntity<List<Todo>> getAllFolders(@PathVariable Long folderId) {
        return ResponseEntity.ok(todoService.getForFolder(folderId));
    }
    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodo(@PathVariable Long id) {
        logger.info("Get todo: {}", id);
        Optional<Todo> todo = todoService.findById(id);
        return todo.map(t -> ResponseEntity.status(HttpStatus.OK)
                    .body(t)).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Todo> createTodo(@Valid @RequestBody TodoDto todoDto) {
        logger.info("Creating todo {} at folder {}", todoDto, todoDto.getFolderId());
        return ResponseEntity.ok(folderService.createTodoAtFolder(todoDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @Valid @RequestBody TodoDto todoDto) {
        logger.info("Update todo {} at folder {}", todoDto, todoDto.getFolderId());
        Optional<Todo> updatedTodo = todoService.updateTodo(todoDto);
        return updatedTodo.map(t -> ResponseEntity.status(HttpStatus.OK)
                .body(t)).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTodo(@PathVariable Long id) {
        logger.info("Delete todo {}", id);
        return todoService.deleteTodo(id).map(t -> ResponseEntity.ok().build()).orElse(ResponseEntity.notFound().build());
    }

}
