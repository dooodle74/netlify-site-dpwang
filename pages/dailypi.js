import { useState, useEffect } from 'react';

export default function PiDigits() {
  const [digits, setDigits] = useState('');

  useEffect(() => {
    // Fetch the digits from 'data.txt'
    const fetchData = async () => {
      try {
        const response = await fetch('/data.txt');
        const text = await response.text();
        setDigits(text);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  function formatDigits(digits) {
    let digitsFormatted = '3.\n';

    for (let line = 0; line < digits.length; line += 40) {
      for (let group = line; group < line + 40; group += 4) {
        digitsFormatted += digits.substring(group, group + 4);
        digitsFormatted += ' ';
      }
      digitsFormatted = digitsFormatted + ' . (' + (line + 40).toString() + ')';
      digitsFormatted += '\n';
    }
    return digitsFormatted;
  }

  return (
    <div>
      <p id="digits" dangerouslySetInnerHTML={{ __html: formatDigits(digits) }}></p>
    </div>
  );
}