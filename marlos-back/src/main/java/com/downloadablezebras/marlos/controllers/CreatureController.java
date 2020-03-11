package com.downloadablezebras.marlos.controllers;

import com.downloadablezebras.marlos.data.creature.Creature;
import com.downloadablezebras.marlos.data.creature.CreatureDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/rest")
public class CreatureController {

    @Autowired
    private CreatureDataRepository repository;

    @GetMapping(value="/creatures")
    public List<Creature> getCreatures() {
        List<Creature> results;
        results = repository.findAll();
        return results;
    }

    @GetMapping("/creatures/{id}")
    public Creature getCreature(@PathVariable Long id) {
        return repository.findById(id)
                .orElse(new Creature());
    }

    @PostMapping("/creatures")
    public Long createCreature(@RequestBody Creature newCreature) {
        repository.save(newCreature);
        return newCreature.getId();
    }

    @PutMapping("/creatures/{id}")
    public Creature updateCreature(@RequestBody Creature updatedCreature, @PathVariable Long id) {
        return repository.findById(id)
                .map(creature -> {
                    creature.setName(updatedCreature.getName());
                    creature.setTextReference(updatedCreature.getTextReference());
                    return repository.save(creature);
                })
                .orElseGet(() -> {
                    updatedCreature.setId(id);
                    return repository.save(updatedCreature);
                });
    }

    @DeleteMapping("/creatures/{id}")
    public void deleteCreature(@PathVariable Long id) { repository.deleteById(id); }
}
