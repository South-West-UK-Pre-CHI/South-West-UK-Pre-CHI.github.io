---
layout: page
title: Organisers
title_class: text-center
---

{% assign organisers_by_role = site.data.organisers | sort_natural: "role" %}
{% assign general_chairs = organisers_by_role | where: "role", "General Chair" %}
{% assign vice_chairs = organisers_by_role | where: "role", "Vice Chair" %}
{% assign other_organisers = organisers_by_role | where_exp: "organiser", "organiser.role != 'General Chair' and organiser.role != 'Vice Chair'" %}

<div class="row justify-content-center g-4 mb-4">
  {% for organiser in general_chairs %}
    {% include organiser-card.html organiser=organiser %}
  {% endfor %}
  {% for organiser in vice_chairs %}
    {% include organiser-card.html organiser=organiser %}
  {% endfor %}
</div>

<div class="row justify-content-center g-4">
  {% for organiser in other_organisers %}
    {% include organiser-card.html organiser=organiser %}
  {% endfor %}
</div>
