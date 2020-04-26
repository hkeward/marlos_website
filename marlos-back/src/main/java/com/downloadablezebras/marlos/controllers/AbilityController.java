package com.downloadablezebras.marlos.controllers;

import com.downloadablezebras.marlos.data.ability.Ability;
import com.downloadablezebras.marlos.data.ability.AbilityDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest")
public class AbilityController {

    @Autowired
    private AbilityDataRepository repository;

    @GetMapping("/abilities")
    public List<Ability> getAbilities() {
        List<Ability> results;
        results = repository.findAll();
        return results;
    }

    @GetMapping("/abilities/{id}")
    public Ability getAbility(@PathVariable Long id) {
        return repository.findById(id)
                         .orElse(new Ability());
    }

    @PostMapping("/abilities")
    public Long createAbility(@RequestBody Ability newAbility) {
        repository.save(newAbility);
        return newAbility.getId();
    }

    @PutMapping("/abilities/{id}")
    public Ability updateAbility(@RequestBody Ability updatedAbility, @PathVariable Long id) {
        return repository.findById(id)
             .map(ability -> {
                 ability.setName(updatedAbility.getName());
                 ability.setDescription(updatedAbility.getDescription());
                 return repository.save(ability);
             })
             .orElseGet(() -> {
                 updatedAbility.setId(id);
                 return repository.save(updatedAbility);
             });
    }

    @DeleteMapping("/abilities/{id}")
    public void deleteAbility(@PathVariable Long id) { repository.deleteById(id); }

}
