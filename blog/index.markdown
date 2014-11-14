{% import 'vars.jinja' as v %}
<div class="row gutters">
  <div class="column-16">
  <ul class="entry-list">
{% for article in v.articles %}
{% include '/includes/entrylist-item.html' %}
{% endfor %}
</ul>
  </div>
  <div class="column-8 sidebar">
{% include '/includes/doubleclick-advert.html' %}
  </div>
</div>
