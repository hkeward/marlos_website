package com.downloadablezebras.marlos.controllers;

import com.downloadablezebras.marlos.data.spell.Spell;
import com.downloadablezebras.marlos.data.spell.SpellDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/rest")
public class SpellController {

    @Autowired
    private SpellDataRepository repository;

    @GetMapping(value="/spells")
    public List<Spell> getSpells() {
        List<Spell> results;
        results = repository.findAll();
        return results;
    }

    @GetMapping("/spells/{id}")
    public Spell getSpell(@PathVariable Long id) {
        return repository.findById(id)
                .orElse(new Spell());
    }

    @PostMapping("/spells")
    public Long createSpell(@RequestBody Spell newSpell) {
        repository.save(newSpell);
        return newSpell.getId();
    }

    @PutMapping("/spells/{id}}")
    public Spell updateSpell(@RequestBody Spell updatedSpell, @PathVariable Long id) {
        return repository.findById(id)
                .map(spell -> {
                    spell.setName(updatedSpell.getName());
                    spell.setSpellLevel(updatedSpell.getSpellLevel());
                    spell.setSchool(updatedSpell.getSchool());
                    spell.setConcentration(updatedSpell.getConcentration());
                    spell.setSpellRange(updatedSpell.getSpellRange());
                    spell.setComponents(updatedSpell.getComponents());
                    spell.setDuration(updatedSpell.getDuration());
                    spell.setDescription(updatedSpell.getDescription());
                    return repository.save(spell);
                })
                .orElseGet(() -> {
                    updatedSpell.setId(id);
                    return repository.save(updatedSpell);
                });
    }

    @DeleteMapping("/spells/{id}")
    public void deleteSpell(@PathVariable Long id) { repository.deleteById(id); }
}
