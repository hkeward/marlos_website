export token=$(curl -X POST https://keycloak.heatherward.dev/auth/realms/marlos/protocol/openid-connect/token -d "username=${username}" -d "password=${password}" -d "grant_type=password" -d "client_id=marlos-front"  | jq -r '.access_token')


# Damage modifiers

## POST

curl -X POST -H "Content-type: application/json" -H "Authorization: Bearer ${token}" --data '{"damage_type": "acid", "description": "The corrosive spray of a black dragon’s breath and the dissolving enzymes secreted by a black pudding deal acid damage."}' http://localhost:8080/rest/damage_modifiers

curl -X POST -H "Content-type: application/json" -H "Authorization: Bearer ${token}" --data '{"damage_type": "necrotic", "description": "Necrotic damage, dealt by certain undead and a spell such as chill touch, withers matter and even the soul."}' http://localhost:8080/rest/damage_modifiers


# Condition immunities

## POST

curl -X POST -H "Content-type: application/json" -H "Authorization: Bearer ${token}" --data '{"condition_type": "Blinded", "description": "A blinded creature can’t see and automatically fails any ability check that requires sight. Attack rolls against the creature have advantage, and the creature’s Attack rolls have disadvantage."}' http://localhost:8080/rest/status_conditions

curl -X POST -H "Content-type: application/json" -H "Authorization: Bearer ${token}" --data '{"condition_type": "Charmed", "description": "A charmed creature can’t Attack the charmer or target the charmer with harmful Abilities or magical Effects. The charmer has advantage on any ability check to interact socially with the creature."}' http://localhost:8080/rest/status_conditions


# Abilities

## POST

curl -X POST -H "Content-type: application/json" -H "Authorization: Bearer ${token}" --data '{"name": "Detect poisons", "description": "You can detect poisons, yo"}' http://localhost:8080/rest/abilities


# Actions

## POST

curl -X POST -H "Content-type: application/json" -H "Authorization: Bearer ${token}" --data '{"name": "Multiattack", "description": "The creature makes two attacks with its weapon"}' http://localhost:8080/rest/actions

curl -X POST -H "Content-type: application/json" -H "Authorization: Bearer ${token}" --data '{"name": "Greatsword", "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: (2d6 + 2) slashing damage plus (1d4) fire damage."}' http://localhost:8080/rest/actions


# Spells

## POST

curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer ${token}" --data '{"name": "Mage Hand", "spellLevel": 7, "school": "CONJURATION", "concentration": true, "spellRange": "5 feet", "components": {"verbal": true, "somatic": false, "materials": "1 feather of a raven"}, "duration": "10 hours", "description": "A misty hand hovers in the air in front of you"}' http://localhost:8080/rest/spells

curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer ${token}" --data '{"name": "Fireball", "spellLevel": 1, "school": "ABJURATION", "concentration": true, "spellRange": "15 feet", "components": {"verbal": true, "somatic": true}, "duration": "Instant", "description": "You shoot a ball of fire at your foe"}' http://localhost:8080/rest/spells




# Creatures

## POST

curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer ${token}" --data '{"name": "Skeleton", "level": 7, "size": "MEDIUM", "type": "UNDEAD", "alignment": "LAWFUL_EVIL", "ac": 15, "hp": {"average": 50, "hit_die": "d10"}, "speed": {"walk": "30 ft."}, "abilityScores": {"strength": 15, "dexterity": 14, "constitution": 12, "intelligence": 12, "wisdom": 12, "charisma": 12}, "savingThrows": {"constitution": 3, "intelligence": 3, "wisdom": 3}, "skills": "Insight +3", "damageImmunities": [{"id": 1}], "damageVulnerabilities": [{"id": 1}, {"id": 2}], "conditionImmunities": [{"id": 2}], "senses": {"blindsight": false, "darkvision": true, "truesight": false, "tremorsense": false}, "languages": "Common", "cr": {"rating": 3, "experience": 700}, "spells": [{"id": 1}], "innateSpells": {"atWill": [{"id": 2}], "oncePerDay": [{"id": 1}]}, "textReference": {"book": "Monster Manual", "pageNumber": 413}, "actions": [{"id": 1}, {"id": 2}], "legendaryActions": [{"id": 2}], "abilities": [{"id": 1}]}' http://localhost:8080/rest/creatures

curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer ${token}" --data '{"name": "Batman", "level": 10, "size": "LARGE", "type": "HUMANOID", "alignment": "LAWFUL_NEUTRAL", "ac": 21, "hp": {"average": 90, "hit_die": "d20"}, "speed": {"walk": "50 ft.", "fly": "20 ft."}, "abilityScores": {"strength": 18, "dexterity": 16, "constitution": 18, "intelligence": 17, "wisdom": 13, "charisma": 10}, "savingThrows": {"constitution": 3, "strength": 3}, "skills": "Investigate +6", "damageImmunities": [{"id": 1}], "damageResistances": [{"id": 2}], "conditionImmunities": [], "senses": {"blindsight": true, "darkvision": true, "truesight": false, "tremorsense": false}, "languages": "Common,Bat", "cr": {"rating": 5, "experience": 1200}, "spells": [{"id": 1}], "innateSpells": {}, "textReference": {"book": "Volos", "pageNumber": 61}, "actions": [{"id": 2}], "legendaryActions": [{"id": 1}]}' http://localhost:8080/rest/creatures

## PUT

<remove abilities from creature 1>

curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer ${token}" --data '{"name": "Skeleton", "level": 7, "size": "MEDIUM", "type": "UNDEAD", "alignment": "LAWFUL_EVIL", "ac": 15, "hp": {"average": 50, "hit_die": "d10"}, "speed": {"walk": "30 ft."}, "abilityScores": {"strength": 15, "dexterity": 14, "constitution": 12, "intelligence": 12, "wisdom": 12, "charisma": 12}, "savingThrows": {"constitution": 3, "intelligence": 3, "wisdom": 3}, "skills": "Insight +3", "damageImmunities": [{"id": 1}], "damageVulnerabilities": [{"id": 1}, {"id": 2}], "conditionImmunities": [{"id": 2}], "senses": {"blindsight": 0, "darkvision": 1, "truesight": 0}, "languages": "Common", "cr": {"rating": 3, "experience": 700},"spells": [{"id": 1}], "innateSpells": {"atWill": [{"id": 2}], "oncePerDay": [{"id": 1}]}, "textReference": {"book": "Monster Manual", "pageNumber": 413}, "actions": [{"id": 1}, {"id": 2}], "legendaryActions": [{"id": 2}], "abilities": []}' http://localhost:8080/rest/creatures/1

## GET

curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer ${token}" http://localhost:8080/rest/creatures



# Rooms

## POST

curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer ${token}" --data '{"name": "First new room", "tags": "", "creatures": [{"id": 1}]}' http://localhost:8080/rest/rooms

curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer ${token}" --data '{"name": "First new room", "tags": "", "creatures": [{"id": 1}, {"id": 2}]}' http://localhost:8080/rest/rooms


## PUT

curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer ${token}" --data '{"name": "First room, new name", "tags": "", "creatures": []}' http://localhost:8080/rest/rooms/1


## GET

curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer ${token}" http://localhost:8080/rest/rooms
