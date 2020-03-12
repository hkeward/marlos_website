package com.downloadablezebras.marlos.controllers;

import com.downloadablezebras.marlos.data.statuscondition.StatusCondition;
import com.downloadablezebras.marlos.data.statuscondition.StatusConditionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/rest")
public class StatusConditionController {

    @Autowired
    private StatusConditionRepository repository;

    @GetMapping(value="/status_conditions")
    public List<StatusCondition> getStatusConditions() {
        List<StatusCondition> results;
        results = repository.findAll();
        return results;
    }

    @GetMapping("/status_conditions/{id}")
    public StatusCondition getStatusCondition(@PathVariable Long id) {
        return repository.findById(id)
                .orElse(new StatusCondition());
    }

    @PostMapping("/status_conditions")
    public Long createDamageModifier(@RequestBody StatusCondition newCondition) {
        repository.save(newCondition);
        return newCondition.getId();
    }

    @PutMapping("/status_conditions/{id}")
    public StatusCondition updateStatusCondition(@RequestBody StatusCondition updatedCondition, @PathVariable Long id) {
        return repository.findById(id)
                .map(condition -> {
                    condition.setCondition_type(updatedCondition.getCondition_type());
                    condition.setDescription(updatedCondition.getDescription());
                    return repository.save(condition);
                })
                .orElseGet(() -> {
                    updatedCondition.setId(id);
                    return repository.save(updatedCondition);
                });
    }

    @DeleteMapping("/status_conditions/{id}")
    public void deleteCondition(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
