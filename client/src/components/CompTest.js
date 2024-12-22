import React, { useEffect, useState } from 'react';

const WorldMap = () => {
  const [svgContent, setSvgContent] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Fetch the SVG and parse it
  useEffect(() => {
    fetch('/map.svg') // Load from public folder
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const svgDocument = parser.parseFromString(data, 'image/svg+xml');
        const svgElement = svgDocument.documentElement;

        // Attach event listeners to each <g>
        const groups = svgElement.querySelectorAll('g'); // Select all <g> elements
        groups.forEach((group) => {
            group.classList.add('country');
          group.addEventListener('click', () => handleCountryClick(group.id));
        });

        // Serialize SVG to string and update state
        setSvgContent(new XMLSerializer().serializeToString(svgElement));
      })
      .catch((err) => console.error('Failed to load SVG:', err));
  }, []);

  // Handle country selection
  const handleCountryClick = (id) => {
    console.log('Selected Country:', id);
    setSelectedCountry(id);
  };

  return (
    <div>
      <h1>World Map</h1>
      <div dangerouslySetInnerHTML={{ __html: svgContent }} />
      {selectedCountry && <p>Selected Country: {selectedCountry}</p>}
    </div>
  );
};

export default WorldMap;
