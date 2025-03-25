# South-West UK Pre-CHI Website
**Built using jekyll-theme-conference**

For full guidance, please go to [the jekyll-theme-conference GitHub repository](https://github.com/DigitaleGesellschaft/jekyll-theme-conference).

<!-- TOC -->
* [Configuration](#configuration)
  * [Live Indications & Streaming](#live-indications--streaming)
  * [Map](#map)
  * [Talk Settings](#talk-settings)
  * [Speaker Settings](#speaker-settings)
  * [Location Settings](#location-settings)
  * [Program Settings](#program-settings)
* [Content](#content)
* [Funders](#funders)
* [Organisers](#organisers)
* [Access Inclusion Plan](#access-inclusion-plan)
* [Transport](#transport)
  * [Schedule / Program](#schedule--program)
  * [Talks](#talks)
  * [Speakers](#speakers)
  * [Rooms](#rooms)
  * [Links](#links)
* [Overview Pages](#overview-pages)
  * [Location / Room Overview](#location--room-overview)
  * [Live Stream Overview](#live-stream-overview)
  * [Additional Pages](#additional-pages)
* [Design](#design)
* [License](#license)
<!-- TOC -->


## Configuration
### Live Indications & Streaming

In order to help users navigating the program during the congress, a _Live_ indication can be shown next to talks which are currently taking place. A small JavaScript functions keeps the site automatically up-to-date (without the need to refresh) showing the indication as soon as the talk has started and hiding it once it is over (according to the timetable indicated in the `_data/program.yml` file).

This can be further extended if some of the talks have an associated live stream: Upon clicking one of the live indications a modal will open containing the corresponding embedded live stream. The URL to the live stream has to be set via `live` property in each room (see the _Content_ > _Room_ section below). Instead of opening the modal an external link can also be used.

In order to activate these functionalities, each day in the `program.yml` file must contain a `date` property (see section _Content_ > _Schedule / Program_ below) and the `live` property has to be set in the configuration file containing

- how long a pause between two consecutive talks has to be for the live indication to pause (`stop`),
- optionally under the `streaming` property:
  + if streaming should be enabled (`enable`), and if enabled
  + how many minutes the stream goes active before a talk (`prepend`),
  + how many minutes the stream stays active after a talk (`extend`),
  + how long a pause between two consecutive talks has to be for the stream to pause (`pause`), and
  + optionally an external (absolute) link to which the user will be redirected instead of opening the modal (`external`),
- optionally under the `demo` property:
  + if a demonstration mode should be enabled (`enable`), whereby the JavaScript function cycles continuously through the entire program in a few minutes, and if enabled
  + how long the demonstration should take (`duration`), and
  + how long the pause between two demonstration cycle should be (`pause`).

```yaml
conference:
  live:
    stop: 240      # in minutes
    streaming:
      enable: true
      pause:   60  # in minutes
      prepend:  5  # in minutes
      extend:   5  # in minutes
    demo:
      enable: false
      duration: 300  # in seconds
      pause:     10  # in seconds
```

### Map

In order to help users finding your venue, an [OpenStreetMap](https://www.openstreetmap.org/) container displaying a map can be shown on any page. The map's initial position is globally defined and thus the same for all map containers. You can define the initial position of the map by setting the default zoom level `default_zoom`, the center coordinates `home_coord`, and the map provider for the tiles `map_provider`. Alternative map providers can be found [here](https://leaflet-extras.github.io/leaflet-providers/preview/).
The map contains small control buttons to zoom in and out, center the map back to the initial position, and show the visitors current location (has to be manually activated and granted by the visitor).

The map can be added to any page by setting `map: true` in its Front Matter or on the location main page by setting `conference.location.map: true` (see _Location Settings_ section below).

```yaml
conference:
  map:
    default_zoom: 17
    home_coord: 47.37808, 8.53935
    map_provider: "OpenStreetMap.Mapnik"
```

### Talk Settings

Each talk can have one or multiple categories associated via FrontMatter (see the _Individual Pages: Talks_ section below for more details). Some of these categories can be elevated to so called main categories". These are used to color group the talks across the entire website, particularly in the program. In order to do so add the `main_categories` property under the `talks` property. It consists of a list of all main categories. Each main category consists of:

- its name (`name`, must be corresponding to the listed categories in the talk's FrontMatter), and
- a color (`color`) following the Bootstrap color scheme (see below), possible values are:
  - `primary` (your website's main color, normally blue)
  - `secondary` (your website's secondary color, normally grey)
  - `success` (green)
  - `alert` (red)
  - `warning` (yellow)
  - `info` (blue)
  - `light` (white)
  - `dark` (dark grey)

Each talk can have associated links listed at the end of its content. If these links have an icon associated (see _Content_ > _Talks_ below), they are also shown on the talk overview page (e.g. to show in the overview which talk has a video recording and which not). To disable the showing of icon links on the overview page, set the `hide_icons` property to `true` (default: `false`).

Example:

```yaml
conference:
  talks:
    # Talk categories
    main_categories:
      - name: Cat A
        color: info
      - name: Cat B
        color: success

    # Hide icons on talk overview page
    hide_icons: false
```

### Speaker Settings

In the program as well as the speaker's overview the speaker's first name can be abbreviated to its first letter. Of course, you also have the option to not specify a first name for each speaker in the first place. In order to shorten the first name add the `show_firstname: true` setting (default: `false`) to the `speakers` property.

Example:

```yaml
conference:
  speakers:
    show_firstname: false
```

### Location Settings

In case the location of your rooms is obvious (e.g. on a campus) you can decide to disable the location page and links to all the rooms. You still need to create the different rooms as files in the `_rooms/` directory, since they are needed as a reference. But there will not be any link pointing to it (effectively hiding them).
In order to hide all rooms add the `hide: true` setting (default: `false`) to the `location` property.

If your `location` overview file is not located under `/location` you can indicate an alternative path by setting the `url` property (default: `/location`) under the `location` property.

The location main page shows a navigation bar listing all the different rooms by name. Due to the quirks of Jekyll, the main page itself cannot be listed by title as defined in its Front Matter. Instead the title of the main landing page for the navigation bar is taken from the language files and defaults to "Directions". In order to change this, you can either change the language files directly (see the _Language_ section above), or you provide an alternative title by setting the `navbar_title` to the desired title under the `location` property.

The `location` layout can include a map to point to your venue by adding the `map: true` setting (default: `true`) to the `location` property. See the _Map_ section above for more information.

Example:

```yaml
conference:
  location:
    hide: false
    url: '/location'
    navbar_title: 'Location'
    map: true
```

The map is based on the [Leaflet](https://leafletjs.com/) JavaScript library. The map object can be customized by adding additional layers with markers, text, or shapes. To do so, one has to edit the main JavaScript file, `assets/js/main.js`:

1. Import the JavaScript library of the theme (via Jekyll `include` command)
2. Await the initialization of the theme's object
3. Fetch the map object and verify it is set (while the JavaScript code is imported and executed on each page, the map object will only exist on the location site)
4. Modify the map.

Following an example is given adding a simple marker to the map:

```javascript
---
---

{% include js/conference.js %}

window.conference.awaitReady().then(() => {
    const map = window.conference.map.getMap();

    if (typeof map !== 'undefined') {
        let main_station = L.marker([47.37785, 8.54035], {
            icon: L.divIcon({
                className: '',
                html: '<span class="fas fa-train"></span> Main Station',
                iconSize: [120, 56]
            })
        }).addTo(map);
    }
});

```

### Program Settings

The schedule shown as program can be slightly customized:

- The time steps shown with a new line can be adapted with the `time_steps` setting given in minute (default: `15` minutes)
- Besides the full hour the individual time steps can be hidden by setting `show_alltimes: false` (default: `true`)

If your `program` file is not located under `/program` you can indicate an alternative path by setting the `url` property (default: `/program`) under the `program` property.
Example:

```yaml
conference:
  program:
    time_steps: 15 # in minutes
    show_alltimes: true
```

## Content

The different talks, speakers and rooms are stored as a collection of file. Each file contains a small header in form of a YAML block (called [FrontMatter](https://jekyllrb.com/docs/front-matter/)) which is used to store additional information beside a description.
The actual schedule defining when and in which room a talk takes place is stored as a [YAML data file](https://jekyllrb.com/docs/datafiles/).

## Funders

The funder information is stored in the `_data/funders.yml` file. The structure of a funder is

```yaml
- name: Name of the funder
  logo: Link to the logo, preferably from the asset's folder
  website: Website of the funder
  thank_you_message: a thank you message for the funder.
```

## Organisers

Organisers information is stored in the `_data/organisers.yml` file. The structure of an organiser is: 

```yaml
- name: Name of the organiser
  photo: : Link to the person's photo, preferably from the asset's folder
  website: Website of the organiser (optional)
  affiliation: Affiliation of the organiser
  role: Role of the organiser
```

## Access Inclusion Plan

The access and inclusion plan is stored in the `_data/access_inclusion_plan.yml` file; 
modifying this file will automatically update the access and inclusion plan summary on the Programme page.
The structure of a section is:

```yaml
- section_id: "section_id"
  section_title: "Section title"
  section_content: "Section content"
```

## Transport

The transport information is stored in the `_data/transport.yml` file;
modifying this section will automatically update the tabs on the location page.
The structure of a transport option is:

```yaml
- title: "Title of the transport option"
  content: "Description of the transport option"
```

### Schedule / Program

The schedule of the conference linking the talks with the rooms and indicating when each talk talks place and how long it goes is set in the `_data/program.yml` file. It contains a list of days, whereby each day contains a list of rooms, whereby each room contains a list of talks.

Each day consists of

- a list of rooms (`rooms`) in which talks are taking place on that day
- optionally, the day's `name`, e.g. the weekday
- optionally, the short form of the day's name (`abbr`), and
- optionally only if no live indications are active, a `date` in the format `YYYY-MM-DD`.

Each room consists of

- the room's `name` (must correspond to one of the room identifier), and
- a list of talks (`talks`) which also can be empty `[]`.

The order of the rooms in the list defines the order of the rooms as shown in the schedule on the program page. For the live streaming or the room overview the order of the rooms is alphabetical but can be adapted via the [main configuration file](https://jekyllrb.com/docs/collections/#sort-by-front-matter-key).

Each talk consists of

- a `name` (must correspond to one of the talk identifier),
- a starting time `time_start` given as `H:M` ([`strftime`](http://www.strfti.me) formated) or `H:M +∆` whereby ∆ is the day offset in relation to the date given for the given day, and
- an end time `time_end`.

The list of talks should (manually) be ordered by time, i.e. the first occurring talk should be listed first.

Example:

```yaml
days:
- name: Monday
  abbr: Mo
  date: 2020-01-31
  rooms:
  - name: Room A
    talks:
      - name: Vim Impetus Placerat Cotidieque Ad
        time_start: '12:00'
        time_end: '12:45'
      - name: Condimentum Vitae Sapien Pellentesque
        time_start: '12:45'
        time_end: '13:30'

  - name: Room B
    talks:
      - name: Arcu Non Odio
        time_start: '12:00'
        time_end: '13:00'
```

### Talks

Each talk is represented by a file in the `_talks/` directory. It must begin with valid [YAML Front Matter](https://jekyllrb.com/docs/frontmatter/) containing

- the talk's `name` (used as identifier),
- one or more existing `speakers` name(s),
- optionally one or more `categories` of which one should be a main category as defined in the site's configuration,
- optionally a list of `links` (see the _Links_ subsection below for the available properties per link; links with icons are treated separately and are also included on the talk overview page),
- optionally a list of `live: links` (see the _Links_ subsection below for the available properties per link) which are shown below the live stream for the given talk in form of buttons, and
- optionally `hide: true` if the talk's page should not be linked to.

### Speakers

Each speaker is represented by a file in the `_speakers/` directory. It must begin with valid [YAML Front Matter](https://jekyllrb.com/docs/frontmatter/) containing

- the speaker's `name` (used as identifier), as well as its
- `first_name`,
- `last_name`,
- optionally a list of `links` (see the _Links_ subsection below for the available properties per link; links with icons are treated separately), and
- optionally `hide: true` if the speaker's page should not be linked to.

If the speaker's name consists only out of one word, populate the `last_name` property and leave the `first_name` property empty. The last name is generally used for sorting the speakers.

### Rooms

Each room is represented by a file in the `_rooms/` directory. It must begin with valid [YAML Front Matter](https://jekyllrb.com/docs/frontmatter/) containing

- the room's `name`
- optionally `hide: true` if the room's page should not be linked to, and
- optionally under the `live` property a URL pointing to a live stream for the given room during the conference (see the section _Live Indications & Streaming_ above), either:
  * as an `absolute_url`, or
  * a `relative_url`.

Example:

```yaml
---
name: The Room
hide: false
live:
  absolute_url: https://github.com
---

...
```

### Links

Links are used at different location throughout the theme: They can either be used in the configuration file (for the landing page or the navigation bar), or in talks and for speakers. A link can thereby have the following properties:

- the text to show (`name`),
- optionally if it is disabled (`disabled: true`),
- optionally if it should open in a iframe embedded in a popup-like modal in the site it self (`iframe: true`, e.g. for embedding videos thus having a default iframe ratio of 24:11)
- optionally an icon to show (indicating the name of a [FontAwesome](https://fontawesome.com/icons?d=gallery&s=solid&m=free) icon to be shown if supported at the given location)
- the actual link address:
  + given relatively to the site's base address: `relative_url:`,
  + given absolute: `absolute_url:`,
  + pointing to a file uploaded to the `/documents` folder (for talks `/documents/slides`, for speakers `/documents/bio`): `file:`
  + pointing to an external video: `video:`

Additionally, a navigation bar or main landing page link can also have the following properties:

- `menu` containing another list of links. This creates a dropdown menu of multiple sublinks. The sublinks have the same properties as regular links, or
- `live` making the link only visible during the conference and adds a live indication. The `name` property can be omitted. Using the optional `name_inactive` property shows a placeholder text while the conference is **not** live. If streaming is enabled and any URL property is omitted, a click on the link will open the streaming modal (see section _Live Indications_ above).

Using the `file:` indicator, the relative address is automatically set as well as the icon. Using the `video:` indicator, the link is automatically configured to open in an iframe with a corresponding title and the icon is set.

Example:

```yaml
  links:
    - name: Slides
      file: slides.pdf
    - name: Recording
      video: https://media.ccc.de/
```

There exists a Python file in this repository, `_tools/import_resources.py`, which can be used to import resources such as slides and other documents from [pretalx.com](https://pretalx.com/p/about/)) via its API. It automatically downloads all files, stores them and updates the links of the talks concerned.

1. Copy the files `_tools/import_resources.py` and `_tools/requirements.txt` from this repository

2. Create a virtual environment and activate it

   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

3. Install the requirements

   ```bash
   pip install -r _tools/requirements.txt
   ```

4. Execute the script, e.g. to show the help type

   ```bash
   python _tools/import_resources.py --help
   ```


## Overview Pages

For each of the three collections there exist a dedicated layout giving an overview among all items of the collection. Furthermore, there exists a layout to show the program as a time schedule. Simply create an empty page and associate the corresponding layout with it:

- `talks/index.md` with `layout: talk-overview`
- `speakers/index.md` with `layout: speaker-overview`
- `location/index.md` with `layout: location`
- `program/index.md` with `layout: program`

They can be empty but should contain the `layout` property in the FrontMatter header.

If you choose a different location for the overview pages you must:

- in case of the `talks` and `speaker` overview file, adapt the URL of the two collections as described further above in the section _Collection URLs_, and
- in case of the `location` and `program` file, adapt the corresponding `url` parameter as described further above in the sections _Location Settings_ and _Program Settings_.

### Location / Room Overview

The `location` layout can include a map container (if not disabled, see the _Location Settings_ section above) which can be customized (see the _Map_ section above).

### Live Stream Overview

The `stream-overview` layout contains all active streams on a single page (see the section _Live Indications & Streaming_ above).

### Additional Pages

Additional static pages can easily be added as files and linked to via navigation bar or main landing page (see above on how to).

Each of these pages can include a map at its end (e.g. to point to your venue) by adding the `map: true` setting to its Front Matter. See the _Map_ section above for more information.

## Design

The design is based on the [Bootstrap 4](http://getbootstrap.com) and thus easily expandable. Furthermore, it makes use of the [FontAwesome Icons](fontawesome.com/) across the theme.
Custom Bootstrap themes or simple color schemes such as designed with [Bootstrap Magic](https://pikock.github.io/bootstrap-magic/) can be added in the [main](assets/css/main.scss) SASS stylesheet:

1. Create a new file under `assets/css/main.scss` with the following content (or copy the one of this repository):

   ```scss
   ---
   ---

   $fa-font-path: '{{ site.baseurl }}/assets/webfonts';

   @import 'conference';
   ```

   Do not skip the `$fa-font-path` variable or modify it as otherwise, the FontAwesome icons will not be able to load.

2. Add your Bootstrap variables in front of the `@import 'conference'` line, e.g. currently the primary color is set internally to green (instead of Bootstrap's default blue): `$primary: #074 !default;`
3. Add any additional CSS styles after it.

## License

This project is licensed under the MIT License. You can view [LICENSE.md](LICENSE.md) for more details.

This project redistributes other opensource tools and libraries. You can view [REDISTRIBUTED.md](REDISTRIBUTED.md) for third party licenses.
