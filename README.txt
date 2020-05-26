Files:
- three.js
- OrbitControls.js
- app.js
- main.css
- index.html
- Picture (folder) -> contains Skybox photoes and dust particle png.

This solution was made by using curriculum and a youtube tutorial referenced under sources.
Files created by student are app.js, main.css, dust.png and index.html. 

The tasks 1-3 are deemed as completed in this solution, however I found it more aesthetically pleasing with the
texture code on line 57 "//" out. Task 4 was started for a GUI to manipulating the variables. Given more time 
I'd use the 'onclick' function and slider to change the variables.

The floating sphere experiences shading and color change as it floats through the lightbeams. 
Each beam has a spotlight and the particles inside the box are only visible in the beams.
For a more dense particle field, the computeBoundingBox-function was used on an undrawn square inside the box.


Sources:
- Youtube tutorial to better understand JS: https://www.youtube.com/watch?v=6oFvqLfRnsU
- Skybox pictures downloaded from http://www.custommapmakers.org/skyboxes.php
- https://threejs.org/ for both OrbitControls.js and three.js files. Documentation used as well.

How to load:
Hoste file with prefered hosting/program, auther has used node.js and http-server(npm).