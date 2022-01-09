package org.github.mytodo.service.implementation;

import org.github.mytodo.dto.TodoDto;
import org.github.mytodo.entity.Folder;
import org.github.mytodo.entity.Todo;
import org.github.mytodo.repository.TodoRepository;
import org.github.mytodo.service.TodoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    public Todo createTodo(Folder folder, TodoDto todoDto) {
        Todo todo = new Todo();
        todo.setDescription(todoDto.getDescription());
        todo.setFolder(folder);
        return todoRepository.save(todo);
    }

    @Override
    public Optional<Todo> updateTodo(TodoDto todoDto) {
        return todoRepository.findById(todoDto.getId()).map(t -> {
            logger.debug("Effective update on todo {} , with new todo {}", t, todoDto);
            t.setDescription(todoDto.getDescription());
            t.setMarked(todoDto.isMarked());
            return todoRepository.save(t);
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
            logger.info("Effective delete on todo {}", todo);
            todo.getFolder().removeTodo(todo);
            todoRepository.delete(todo);
        });
        return t;
    }

    @Override
    public List<Todo> getForFolder(Long folderId) {
        return todoRepository.findAllByFolder_IdOrderByIdAsc(folderId);
    }
}
