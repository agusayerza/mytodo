package org.github.mytodo.service;

import org.github.mytodo.dto.FolderDto;
import org.github.mytodo.dto.TodoDto;
import org.github.mytodo.entity.Folder;
import org.github.mytodo.entity.Todo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface FolderService {
    List<Folder> getAllFolders();

    Optional<Folder> findById(Long id);

    Folder createFolder(FolderDto folderDto);

    Optional<Folder> renameFolder(Long id, String name);

    Optional<Folder> deleteFolder(Long id);

    Todo createTodoAtFolder(TodoDto todoDto);
}
