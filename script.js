        let num = 16;
        let numNull = true;
        let colorMode = false;
        let blackMode = false;
        let shadingMode = false;
        /* let lighteningMode = false; */
        let eraserMode = false;
        let oldNum = 0;
        let grid = document.querySelector('.container');
        let mouseDown = false
        document.body.onmousedown = () => (mouseDown = true)
        document.body.onmouseup = () => (mouseDown = false)

        const sizeValue = document.querySelector('.Size-Value');
        const sizeSlider = document.querySelector('.Size-Slider');
        const rainbow = document.querySelector('.Rainbow-Mode');
        const black = document.querySelector('.Black-Mode');
        const shading = document.querySelector('.Shading');
        /* const lightening = document.querySelector('.Lightening'); */
        const eraser = document.querySelector('.Eraser');
        const clear = document.querySelector('.Clear');

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

        function randomColor() {
            const random = Math.floor(Math.random() * 256);
            return random;
        }

        function rainbowColors(e) {
            rainbow.style.backgroundColor ='red';
            black.style.backgroundColor ='rgb(224, 208, 208)';
            shading.style.backgroundColor ='rgb(224, 208, 208)';
            /* lightening.style.backgroundColor ='rgb(224, 208, 208)'; */
            eraser.style.backgroundColor ='rgb(224, 208, 208)';
            colorMode = true;
            blackMode = false;
            eraserMode = false;
            shadingMode = false;
            /* lighteningMode = false; */
            return colorMode;
        }

        function switchToBlack(e) {
            rainbow.style.backgroundColor ='rgb(224, 208, 208)';
            black.style.backgroundColor ='red';
            shading.style.backgroundColor ='rgb(224, 208, 208)';
            /* lightening.style.backgroundColor ='rgb(224, 208, 208)'; */
            eraser.style.backgroundColor ='rgb(224, 208, 208)';
            blackMode = true;
            colorMode = false;
            eraserMode = false;
            shadingMode = false;
            /* lighteningMode = false; */
            return blackMode;
        }

        function shadingFunc(e) {
            rainbow.style.backgroundColor ='rgb(224, 208, 208)';
            black.style.backgroundColor ='rgb(224, 208, 208)';
            shading.style.backgroundColor ='red';
            /* lightening.style.backgroundColor ='rgb(224, 208, 208)'; */
            eraser.style.backgroundColor ='rgb(224, 208, 208)';
            eraserMode = false;
            blackMode = false;
            colorMode = false;
            shadingMode = true;
            /* lighteningMode = false; */
            return shadingMode;
        }

      /*   function lighteningFunc(e) {
            rainbow.style.backgroundColor ='rgb(224, 208, 208)';
            black.style.backgroundColor ='rgb(224, 208, 208)';
            shading.style.backgroundColor ='rgb(224, 208, 208)';
            lightening.style.backgroundColor ='red';
            eraser.style.backgroundColor ='rgb(224, 208, 208)';
            eraserMode = false;
            blackMode = false;
            colorMode = false;
            shadingMode = false;
            lighteningMode = true;
            return lighteningMode;
        } */

        function switchToErase(e) {
            rainbow.style.backgroundColor ='rgb(224, 208, 208)';
            black.style.backgroundColor ='rgb(224, 208, 208)';
            shading.style.backgroundColor ='rgb(224, 208, 208)';
            /* lightening.style.backgroundColor ='rgb(224, 208, 208)'; */
            eraser.style.backgroundColor ='red';
            eraserMode = true;
            blackMode = false;
            colorMode = false;
            shadingMode = false;
            /* lighteningMode = false; */
            return eraserMode;
        }

        

        function getColor(e) {
            const currentColor = window.getComputedStyle(e.target).backgroundColor;
            let rgbValues = currentColor.match(/\d+/g);
            //console.table(rgbValues);
            if (e.target.style.backgroundColor === ``) {
                rgbValues = [255,255,255];
            }
            return rgbValues;
        }
        
        function changeColor(e) {
            if (e.type === 'mouseover' && !mouseDown) return;
            let rgb = getColor(e);
            r = rgb[0];
            g = rgb[1];
            b = rgb[2];
            if (eraserMode === true) {
                e.target.style.backgroundColor = '';
            }
            else if (colorMode === true) {
                r = randomColor();
                g = randomColor();
                b = randomColor();
                 e.target.style.backgroundColor = 
                 `rgb(${r},${g},${b})`;
            }
            else if (blackMode === true) {
                e.target.style.backgroundColor = `black`;
            }
            else if (shadingMode === true) {
                console.log(rgb)
                r-= 26;
                g-= 26;
                b-= 26;
                console.log(rgb)
                e.target.style.backgroundColor =`rgb(${r},${g},${b})`;
            }
            //else if (lighteningMode === true) {
            /*     console.log(rgb)
                r= Math.min(r+26,255);
                g= Math.min(g+26,255);
                b= Math.min(b+26,255);
                e.target.style.backgroundColor =`rgb(${r},${g},${b})`;
                console.log(e.target.style.backgroundColor);
            } */   
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

        let r=0;
        let g=0;
        let b=0;

        sizeSlider.addEventListener('mousemove',updateSizeValue);
        sizeSlider.addEventListener('change',changeSize);
        clear.addEventListener('click', clearGrid);
        rainbow.addEventListener('click', rainbowColors);
        black.addEventListener('click', switchToBlack);
        shading.addEventListener('click', shadingFunc);
        /* lightening.addEventListener('click', lighteningFunc); */
        eraser.addEventListener('click', switchToErase);
        
        grid.addEventListener('mouseover', changeColor);
        grid.addEventListener('mousedown', changeColor);
        