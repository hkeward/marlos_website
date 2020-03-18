package com.downloadablezebras.marlos.controllers;

import com.downloadablezebras.marlos.data.action.Action;
import com.downloadablezebras.marlos.data.action.ActionDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest")
public class ActionController {

    @Autowired
    private ActionDataRepository repository;

    @GetMapping("/actions")
    public List<Action> getActions() {
        List<Action> results;
        results = repository.findAll();
        return results;
    }

    @GetMapping("/actions/{id}")
    public Action getAction(@PathVariable Long id) {
        return repository.findById(id)
                .orElse(new Action());
    }

    @PostMapping("/actions")
    public Long createAction(@RequestBody Action newAction) {
        repository.save(newAction);
        return newAction.getId();
    }

    @PutMapping("/actions/{id}")
    public Action updateAction(@RequestBody Action updatedAction, @PathVariable Long id) {
        return repository.findById(id)
            .map(action -> {
                action.setName(updatedAction.getName());
                action.setDescription(updatedAction.getDescription());
                return repository.save(action);
            })
            .orElseGet(() -> {
                updatedAction.setId(id);
                return repository.save(updatedAction);
            });
    }

    @DeleteMapping("/actions/{id}")
    public void deleteAction(@PathVariable Long id) { repository.deleteById(id); }
}
