package org.github.mytodo.entity;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NonNull
    private String description;

    private Boolean marked = false;

    public Todo() {
    }

    public Todo(Long id, @NonNull String description) {
        this.id = id;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @NonNull
    public String getDescription() {
        return description;
    }

    public void setDescription(@NonNull String description) {
        this.description = description;
    }

    public Boolean getMarked() {
        return marked;
    }

    public Todo marked(Boolean v) {
        this.marked = v;
        return this;
    }

    public void setMarked(Boolean marked) {
        this.marked = marked;
    }
}
