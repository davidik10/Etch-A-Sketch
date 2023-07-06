        let num = 16;
        let numNull = true;
        let rainBowMode = false;
        let blackMode = false;
        let shadingMode = false;
        let lighteningMode = false;
        let eraserMode = false;
        let oldNum = 0;
        let grid = document.querySelector('.container');
        let mouseDown = false
        document.body.onmousedown = () => (mouseDown = true)
        document.body.onmouseup = () => (mouseDown = false)

        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => 
            button.addEventListener('click',(e) => {
                rainBowMode = false;
                blackMode = false;
                shadingMode = false;
                lighteningMode = false;
                eraserMode = false;
                console.log(e.target.classList.value)
                if (e.target.classList.value === 'Black-Mode') {
                    blackMode = true;
                }
                else if (e.target.classList.value === 'Rainbow-Mode') {
                    rainBowMode = true;
                }
                else if (e.target.classList.value === 'Shading') {
                    shadingMode = true;
                }
                else if (e.target.classList.value === 'Lightening') {
                    lighteningMode = true;
                }
                else if (e.target.classList.value === 'Eraser') {
                    eraserMode = true;
                }
                else if (e.target.classList.value === 'Clear') {
                    clearGrid(e);
                }
        }));

        const sizeValue = document.querySelector('.Size-Value');
        const sizeSlider = document.querySelector('.Size-Slider');

        function createGrid(num) {
            let gridWidth = 960 / num;
            grid.style.gridTemplateColumns = `repeat(${num},${gridWidth}px)`;
            grid.style.gridTemplateRows = `repeat(${num},${gridWidth}px)`;
            for (let i=0; i<(num*num); i++) {
                    const square = document.createElement('div');
                    square.style.height = `${gridWidth}px`;
                    square.style.width = `${gridWidth}px`;
                    square.style.border = "solid 1px transparent";
                    grid.appendChild(square); 
                    
            }
        }

        function randomColor(value) {
            const random = Math.floor(Math.random() * (value+1));
            return random;
        }

        function getColor(e) {
            const currentColor = window.getComputedStyle(e.target).backgroundColor;
            let hslValues = currentColor.match(/\d+/g);
            if (e.target.style.backgroundColor === ``) {
                hslValues = [0, 0, 100];
            }
            else {
                hslValues = rgb2hsl(hslValues[0], hslValues[1], hslValues[2]);
            }
            return hslValues;
        }

        function rgb2hsl(r, g, b) {
            // see https://en.wikipedia.org/wiki/HSL_and_HSV#Formal_derivation
            // convert r,g,b [0,255] range to [0,1]
            r = r / 255,
            g = g / 255,
            b = b / 255;
            // get the min and max of r,g,b
            var max = Math.max(r, g, b);
            var min = Math.min(r, g, b);
            // lightness is the average of the largest and smallest color components
            var lum = (max + min) / 2;
            var hue;
            var sat;
            if (max == min) { // no saturation
                hue = 0;
                sat = 0;
            } else {
                var c = max - min;
                sat = c / (1 - Math.abs(2 * lum - 1));
                switch(max) {
                    case r:
                         hue = (g - b) / c;
                         hue = ((g - b) / c) % 6;
                         hue = (g - b) / c + (g < b ? 6 : 0);
                        break;
                    case g:
                        hue = (b - r) / c + 2;
                        break;
                    case b:
                        hue = (r - g) / c + 4;
                        break;
                }
            }
            hue = Math.round(hue * 60); // °
            sat = Math.round(sat * 100); // %
            lum = Math.round(lum * 100); // %
            return [hue, sat, lum];
        }
        
        function changeColor(e) {
            if (e.type === 'mouseover' && !mouseDown) return;
            let hsl = getColor(e);
            h = hsl[0];
            s = hsl[1];
            l = hsl[2];
            
            if (eraserMode === true) {
                e.target.style.backgroundColor = '';
            }
            else if (rainBowMode === true) {
                h = randomColor(359);
                s = randomColor(100);
                l = randomColor(100);
                 e.target.style.backgroundColor = 
                 `hsl(${h},${s}%,${l}%)`;
            }
            else if (blackMode === true) {
                e.target.style.backgroundColor = `black`;
            }
            else if (shadingMode === true) {
                l-= 10;
                e.target.style.backgroundColor =`hsl(${h},${s}%,${l}%)`;
            }
            else if (lighteningMode === true) {
                l+= 10;
                e.target.style.backgroundColor =`hsl(${h},${s}%,${l}%)`;
            }   
        }
    
    
        function initializeGrid() {
            grid.innerHTML = '';
            return grid.innerHTML;
        }

        function clearGrid(e) {
            initializeGrid();
            if (numNull == false) {
                createGrid(oldNum);
            }
            else {
                createGrid(num);
            }
        }

        function changeSize(e) {
            num = e.target.value;
            clearGrid;

        }
        
        function updateSizeValue(e) {
            sizeValue.textContent = `${e.target.value} x ${e.target.value}`;
        }

        createGrid(num);

        let h=0;
        let s=0;
        let l=0;

        sizeSlider.addEventListener('mousemove',updateSizeValue);
        sizeSlider.addEventListener('change',changeSize);

        grid.addEventListener('mouseover', changeColor);
        grid.addEventListener('mousedown', changeColor);
        