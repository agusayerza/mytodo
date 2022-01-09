package org.github.mytodo.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class FolderDto {
    private Long id;
    @NotNull
    @Size(min = 1, max = 128)
    private String name;

    public FolderDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
