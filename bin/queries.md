## Get user country
`SELECT ac.* FROM customuser_customuser cc INNER JOIN address_address aa ON cc.address_id = aa.id INNER JOIN address_locality al ON aa.locality_id = al.id INNER JOIN address_state ass ON al.state_id = ass.id INNER JOIN address_country ac ON ass.country_id = ac.id WHERE cc.id = 2`

## Get topic by country id
`SELECT tt.* FROM topics_topic tt INNER JOIN address_address aa ON tt.address_id = aa.id INNER JOIN address_locality al ON aa.locality_id = al.id INNER JOIN address_state ass ON al.state_id = ass.id INNER JOIN address_country ac ON ass.country_id = ac.id WHERE ac.id = 1`

