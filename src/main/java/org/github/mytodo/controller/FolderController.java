package org.github.mytodo.controller;

import org.github.mytodo.dto.FolderDto;
import org.github.mytodo.entity.Folder;
import org.github.mytodo.service.FolderService;
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
@RequestMapping("/folder")
public class FolderController {
    private final FolderService folderService;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    
    @Autowired
    public FolderController(FolderService folderService) {
        this.folderService = folderService;
    }

    @GetMapping
    public ResponseEntity<List<Folder>> getAllFolders() {
        return ResponseEntity.ok(folderService.getAllFolders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Folder> getFolder(@PathVariable Long id) {
        logger.info("Get folder: {}", id);
        Optional<Folder> folder = folderService.findById(id);
        return folder.map(f -> ResponseEntity.status(HttpStatus.OK)
                .body(f)).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Folder> createFolder(@Valid @RequestBody FolderDto folderDto) {
        logger.info("Creating folder {}", folderDto);
        return ResponseEntity.ok(folderService.createFolder(folderDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Folder> updateFolder(@PathVariable Long id, @Valid @RequestBody FolderDto folderDto) {
        logger.info("Update folder {}", folderDto);
        Optional<Folder> updatedFolder = folderService.renameFolder(id, folderDto.getName());
        return updatedFolder.map(f -> ResponseEntity.status(HttpStatus.OK)
                .body(f)).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFolder(@PathVariable Long id) {
        logger.info("Delete folder {}", id);
        return folderService.deleteFolder(id).map(f -> ResponseEntity.ok().build()).orElse(ResponseEntity.notFound().build());
    }
}
