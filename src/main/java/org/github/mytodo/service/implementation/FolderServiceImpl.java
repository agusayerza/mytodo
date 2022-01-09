package org.github.mytodo.service.implementation;

import org.github.mytodo.dto.FolderDto;
import org.github.mytodo.dto.TodoDto;
import org.github.mytodo.entity.Folder;
import org.github.mytodo.entity.Todo;
import org.github.mytodo.repository.FolderRepository;
import org.github.mytodo.service.FolderService;
import org.github.mytodo.service.TodoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FolderServiceImpl implements FolderService {

    private final FolderRepository folderRepository;
    private final TodoService todoService;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public FolderServiceImpl(FolderRepository folderRepository, TodoService todoService) {
        this.folderRepository = folderRepository;
        this.todoService = todoService;
    }

    @Override
    public List<Folder> getAllFolders() {
        return folderRepository.getAllByOrderByNameAsc();
    }

    @Override
    public Optional<Folder> findById(Long id) {
        return folderRepository.findById(id);
    }

    public Optional<Folder> findByName(String name) {
        return folderRepository.findByName(name);
    }

    @Override
    public Folder createFolder(FolderDto folderDto) {

        if(findByName(folderDto.getName()).isPresent())
            throw new IllegalArgumentException(String.format("Folder with name '%s' already exists", folderDto.getName()));

        Folder folder = new Folder();
        folder.setName(folderDto.getName());
        return folderRepository.save(folder);
    }

    @Override
    public Optional<Folder> renameFolder(Long id, String name) {

        if(findByName(name).isPresent())
            throw new IllegalArgumentException(String.format("Folder with name '%s' already exists", name));

        return findById(id).map(f -> {
            f.setName(name);
            return folderRepository.save(f);
        });
    }

    @Override
    public Optional<Folder> deleteFolder(Long id) {
        Optional<Folder> f = folderRepository.findById(id);
        f.ifPresent(folder -> {
            logger.debug("Effective delete on folder {}", folder);
            folderRepository.delete(folder);
        });
        return f;
    }

    @Override
    public Todo createTodoAtFolder(TodoDto todoDto) {
        Optional<Folder> f = folderRepository.findById(todoDto.getFolderId());
        if(f.isEmpty())
            throw new IllegalArgumentException(String.format("Invalid folder id %s", todoDto.getFolderId()));
        return todoService.createTodo(f.get(), todoDto);
    }
}
