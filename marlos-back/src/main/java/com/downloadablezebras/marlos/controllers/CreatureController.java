package com.downloadablezebras.marlos.controllers;

import com.downloadablezebras.marlos.data.creature.Creature;
import com.downloadablezebras.marlos.data.creature.CreatureDataRepository;
import com.downloadablezebras.marlos.data.room.Room;
import com.downloadablezebras.marlos.data.room.RoomDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest")
public class CreatureController {

    @Autowired
    private CreatureDataRepository repository;

    @Autowired
    private RoomDataRepository roomRepository;

    @GetMapping("/creatures")
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
                    creature.setLevel(updatedCreature.getLevel());
                    creature.setSize(updatedCreature.getSize());
                    creature.setType(updatedCreature.getType());
                    creature.setAlignment(updatedCreature.getAlignment());
                    creature.setAc(updatedCreature.getAc());
                    creature.setHp(updatedCreature.getHp());
                    creature.setSpeed(updatedCreature.getSpeed());
                    creature.setAbilityScores(updatedCreature.getAbilityScores());
                    creature.setSavingThrows(updatedCreature.getSavingThrows());
                    creature.setSkills(updatedCreature.getSkills());
                    creature.setDamageImmunities(updatedCreature.getDamageImmunities());
                    creature.setDamageVulnerabilities(updatedCreature.getDamageVulnerabilities());
                    creature.setDamageResistances(updatedCreature.getDamageResistances());
                    creature.setConditionImmunities(updatedCreature.getConditionImmunities());
                    creature.setSenses(updatedCreature.getSenses());
                    creature.setLanguages(updatedCreature.getLanguages());
                    creature.setCr(updatedCreature.getCr());
                    creature.setTextReference(updatedCreature.getTextReference());
                    creature.setAbilities(updatedCreature.getAbilities());
                    creature.setActions(updatedCreature.getActions());
                    creature.setLegendaryActions(updatedCreature.getLegendaryActions());
                    creature.setInnateSpells(updatedCreature.getInnateSpells());
                    creature.setSpells(updatedCreature.getSpells());
                    creature.setInnateSpellcastingAbility(updatedCreature.getInnateSpellcastingAbility());
                    creature.setSpellcastingAbility(updatedCreature.getInnateSpellcastingAbility());
                    return repository.save(creature);
                })
                .orElseGet(() -> {
                    updatedCreature.setId(id);
                    return repository.save(updatedCreature);
                });
    }

    @DeleteMapping("/creatures/{id}")
    public void deleteCreature(@PathVariable Long id) {
        Creature creature = repository.getOne(id);
        List<Room> roomsContainingCreature = roomRepository.findRoomsByCreatures(creature);
        for (Room room: roomsContainingCreature) {
            room.removeCreature(creature);
        }
        repository.deleteById(id);
    }
}
