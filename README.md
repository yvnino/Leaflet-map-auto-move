# Leaflet-map-auto-move

Leaflet control plugin for auto-move when mouse close to map borders - Helpful when drawing

## Getting Started

Adding the auto-move Control to the map:

```
var automoveController = new L.Control.Automove({ speed: 100 });
automoveController.addTo(map);
```
Entering auto mode:

```
automove.toggleAutoMapMove(true);
```

