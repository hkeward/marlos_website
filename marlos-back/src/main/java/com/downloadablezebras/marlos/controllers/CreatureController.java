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
        return newCreature.getCreatureId();
    }

    @PutMapping("/creatures/{id}")
    public Creature updateCreature(@RequestBody Creature updatedCreature, @PathVariable Long id) {
        return repository.findById(id)
                .map(creature -> {
                    creature.setCreatureName(updatedCreature.getCreatureName());
                    creature.setTextReference(updatedCreature.getTextReference());
                    creature.setRooms(updatedCreature.getRooms());
                    return repository.save(creature);
                })
                .orElseGet(() -> {
                    updatedCreature.setCreatureId(id);
                    return repository.save(updatedCreature);
                });
    }

    @DeleteMapping("/creatures/{id}")
    public void deleteCreature(@PathVariable Long id) { repository.deleteById(id); }
}
