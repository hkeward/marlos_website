package com.downloadablezebras.marlos.controllers;

import com.downloadablezebras.marlos.data.damagemodifier.DamageModifier;
import com.downloadablezebras.marlos.data.damagemodifier.DamageModifierDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/rest")
public class DamageModifierController {

    @Autowired
    private DamageModifierDataRepository repository;

    @GetMapping(value="/damage_modifiers")
    public List<DamageModifier> getDamageModifiers() {
        List<DamageModifier> results;
        results = repository.findAll();
        return results;
    }

    @GetMapping("/damage_modifiers/{id}")
    public DamageModifier getDamageModifier(@PathVariable Long id) {
        return repository.findById(id)
                .orElse(new DamageModifier());
    }

    @PostMapping("/damage_modifiers")
    public Long createDamageModifier(@RequestBody DamageModifier newModifier) {
        repository.save(newModifier);
        return newModifier.getId();
    }

    @PutMapping("/damage_modifiers/{id}")
    public DamageModifier updateDamageModifier(@RequestBody DamageModifier updatedModifier, @PathVariable Long id) {
        return repository.findById(id)
                .map(modifier -> {
                    modifier.setDamage_type(updatedModifier.getDamage_type());
                    modifier.setDescription(updatedModifier.getDescription());
                    modifier.setModification_type(updatedModifier.getModification_type());
                    return repository.save(modifier);
                })
                .orElseGet(() -> {
                    updatedModifier.setId(id);
                    return repository.save(updatedModifier);
                });
    }

    @DeleteMapping("/damage_modifiers/{id}")
    public void deleteModifier(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
