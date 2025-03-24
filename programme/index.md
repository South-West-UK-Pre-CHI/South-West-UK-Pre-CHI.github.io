---
layout: programme
---

The [Access and Inclusion Plan](https://docs.google.com/document/d/1EFZFd0djQXFNtJB2qIjqMsXmU95Qylhe/edit?tab=t.0) outlines our approach to accessibility and inclusivity in the conference; summaries of the conference's accessibility can be found below.

{% assign access_inclusion_plan = site.data.access_inclusion_plan %}

{% include partials/dropdown_section.html
section_id=access_inclusion_plan.section_id
section_title=access_inclusion_plan.section_title
section_content=access_inclusion_plan.section_content
section_subsections=access_inclusion_plan.subsections %}
