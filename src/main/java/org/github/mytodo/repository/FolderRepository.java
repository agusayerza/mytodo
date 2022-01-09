package org.github.mytodo.repository;

import org.github.mytodo.entity.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FolderRepository extends JpaRepository<Folder, Long> {
    List<Folder> getAllByOrderByNameAsc();
    Optional<Folder> findByName(String name);
}
