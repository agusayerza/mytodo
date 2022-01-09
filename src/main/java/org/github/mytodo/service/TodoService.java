package org.github.mytodo.service;

import org.github.mytodo.dto.TodoDto;
import org.github.mytodo.entity.Folder;
import org.github.mytodo.entity.Todo;

import java.util.List;
import java.util.Optional;

public interface TodoService {
    List<Todo> getAllTodos();

    Todo createTodo(Folder folder, TodoDto todoDto);

    Optional<Todo> updateTodo(TodoDto todo);

    Optional<Todo> findById(Long id);

    Optional<Todo> deleteTodo(Long id);

    List<Todo> getForFolder(Long folderId);
}
