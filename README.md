# Leaflet-map-auto-move

Leaflet control plugin for auto-move when mouse close to map borders - Helpful when drawing.

Live Demo: https://yvnino.github.io/Leaflet-map-auto-move/example/

## Getting Started

Adding the auto-move Control to the map:

```
var automoveController = new L.Control.Automove({ speed: 100 }); // Between 10 to 300
automoveController.addTo(map);
```
Entering auto mode:

```
automoveController.toggleAutoMapMove(true);
```

