package org.github.mytodo.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class TodoDto {

    @NotNull
    @Size(min = 1, max = 255)
    private String description;

    private boolean marked;

    public TodoDto() {
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isMarked() {
        return marked;
    }

    public void setMarked(boolean marked) {
        this.marked = marked;
    }
}
