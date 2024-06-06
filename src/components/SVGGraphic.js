import React from 'react';
import './SVGGraphic.css'; // Importuj styl dla SVG

function SVGGraphic() {
  return (
    <div id="svg-container">
      <h2>Prosta grafika SVG</h2>
      <svg
        className="rotating-svg"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlnsSvgjs="http://svgjs.dev/svgjs"
        viewBox="0 0 600 600"
        width="100"
        height="100"
      >
        <path
          d="M183.76963806152355 
          208.9005064639751C161.6492156982423 
          170.41882972650765 305.4973805745444 
          93.97905108067431 325.916229248047 
          124.86910387608447C346.3350779215496 
          155.75915667149462 284.1623077392579 
          355.75914649896856 306.2827301025392 
          394.24082323643603C328.4031524658204 
          432.7224999739035 479.0576121012371 
          386.6492170962993 458.6387634277345 
          355.75916430088915C438.21991475423187 
          324.869111505479 205.8900604248048 
          247.3821832014425 183.76963806152355 
          208.9005064639751C161.6492156982423 
          170.41882972650765 305.4973805745444 
          93.97905108067431 325.916229248047 
          124.86910387608447"
          fill="hsl(340, 45%, 50%)"
        ></path>
      </svg>
    </div>
  );
}

export default SVGGraphic;
