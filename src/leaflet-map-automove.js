(function (factory) {
    if (typeof define === 'function' && define.amd) {
        //AMD
        define(['leaflet'], factory);
    } else if (typeof module !== 'undefined') {
        // Node/CommonJS
        module.exports = factory(require('leaflet'));
    } else {
        // Browser globals
        if (typeof window.L === 'undefined')
            throw 'Leaflet must be loaded first';
        factory(window.L);
    }
})(function (L) {

    L.Control.Automove = L.Control.extend({
        options: {
            speed: 100,
            autoMoveBordersSize : '20px'
        },

        initialize: function (options) {
            if(options && options.speed){
                if(options.speed < 9 || options.speed > 300){
                    console.log('speed out of limit');
                    delete options.speed;
                }  
            }
            L.Util.setOptions(this, options);
            this.autoMoveBorders = [];
            this.isAutoMode = false;
        },

        onAdd: function (map) {
            this._container = L.DomUtil.create('div', 'leaflet-auto-map-move');
            this._map = map;
            return this._container;
        },

        toggleAutoMapMove: function (autoMoveMode) {
            var wprDiv = this._map._container;
            if (autoMoveMode && wprDiv && !this.isAutoMode) {
                this.isAutoMode = true;
                var leftBorder = document.createElement('div');
                leftBorder.style.position = 'absolute';
                leftBorder.className = 'auto-map-move-left';
                leftBorder.style.width = '20px';
                leftBorder.style.height = '100%';
                leftBorder.setAttribute('diraction', 'left');
                leftBorder.addEventListener('mouseover', this.onAutoMove.bind(this));
                wprDiv.appendChild(leftBorder);
                this.autoMoveBorders.push(leftBorder);
                var topBorder = document.createElement('div');
                topBorder.className = 'auto-map-move-up';
                topBorder.style.position = 'absolute';
                topBorder.style.top = 0;                                
                topBorder.style.height = '20px';
                topBorder.style.width = '100%';
                topBorder.setAttribute('diraction', 'up');
                topBorder.addEventListener('mouseover', this.onAutoMove.bind(this));
                wprDiv.appendChild(topBorder);
                this.autoMoveBorders.push(topBorder);
                var rightBorder = document.createElement('div');
                rightBorder.className = 'auto-map-move-right';
                rightBorder.style.position = 'absolute';
                rightBorder.style.right = 0;                
                rightBorder.style.width = '20px';
                rightBorder.style.height = '100%';
                rightBorder.setAttribute('diraction', 'right');
                rightBorder.addEventListener('mouseover', this.onAutoMove.bind(this));
                wprDiv.appendChild(rightBorder);
                this.autoMoveBorders.push(rightBorder);                
                var bottomBorder = document.createElement('div');
                bottomBorder.className = 'auto-map-move-down';
                bottomBorder.style.position = 'absolute';
                bottomBorder.style.bottom = 0;                                
                bottomBorder.style.width = '100%';
                bottomBorder.style.height = '20px';
                bottomBorder.setAttribute('diraction', 'down');
                bottomBorder.addEventListener('mouseover', this.onAutoMove.bind(this));
                this.autoMoveBorders.push(bottomBorder);                            
                wprDiv.appendChild(bottomBorder);
            }
            else if(!autoMoveMode && wprDiv && this.isAutoMode){
                while (this.autoMoveBorders.length) {
                    this.autoMoveBorders[0].removeEventListener('mouseover', this.onAutoMove, true);
                    wprDiv.removeChild(this.autoMoveBorders[0]);
                    this.autoMoveBorders[0].remove();
                    this.autoMoveBorders = this.autoMoveBorders.slice(1,this.autoMoveBorders.length);
                }
                this.isAutoMode = false;
            }
        },
        setSpeed : function(speed){
            speed = Number(speed);
            if(speed > 9 || speed < 301){
                console.log('speed out of limit');
                this.options.speed = speed;
            }  
        },
        onAutoMove: function (e) {
            var map = this._map;
            var moveMap = function recenter(map, offset) {
                var centerLatLng = map.getCenter();
                var center = map.project(centerLatLng);
                center = new L.point(center.x + offset.x, center.y + offset.y);
                var target = map.unproject(center);
                map.panTo(target);
            }
            e.preventDefault();
            var elm = e.target;
            var diraction = elm.getAttribute('diraction');
            var interval = setInterval(() => {
                var offsetDirction = { x: 0, y: 0 };
                if (diraction === 'left')
                    offsetDirction.x = -this.options.speed;
                if (diraction === 'right')
                    offsetDirction.x = this.options.speed;
                if (diraction === 'up')
                    offsetDirction.y = -this.options.speed;
                if (diraction === 'down')
                    offsetDirction.y = this.options.speed;
                // this.props.map.pan(diraction);
                moveMap(this._map, offsetDirction);
            }, 100);
            var mouseOutHandler = function (event) {
                event.preventDefault();
                setTimeout(function () {
                    clearInterval(interval);
                }, 100);
                elm.removeEventListener('mouseout', mouseOutHandler, true);
                console.log('mouseout onAutoMove STOP deraction  : ' + diraction);
            }

            elm.addEventListener('mouseout', mouseOutHandler.bind(this));
        }
    });

});