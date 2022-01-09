package org.github.mytodo.service.implementation;

import org.github.mytodo.dto.TodoDto;
import org.github.mytodo.entity.Todo;
import org.github.mytodo.repository.TodoRepository;
import org.github.mytodo.service.TodoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    public TodoServiceImpl(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Override
    public List<Todo> getAllTodos() {
        return todoRepository.findAllByOrderByIdAsc();
    }

    @Override
    public Todo createTodo(TodoDto todoDto) {
        Todo todo = new Todo();
        todo.setDescription(todoDto.getDescription());
        return todoRepository.save(todo);
    }

    @Override
    public Optional<Todo> updateTodo(Todo todo) {
        return todoRepository.findById(todo.getId()).map(t -> {
            logger.debug("Effective update on todo {} , with new todo {}", t, todo);
            todoRepository.save(todo);
            return todo;
        });
    }

    @Override
    public Optional<Todo> findById(Long id) {
        return todoRepository.findById(id);
    }

    @Override
    public Optional<Todo> deleteTodo(Long id) {
        Optional<Todo> t = todoRepository.findById(id);
        t.ifPresent(todo -> {
            logger.debug("Effective delete on todo {}", todo);
            todoRepository.delete(todo);
        });
        return t;
    }
}
