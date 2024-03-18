import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function PiDigits() {
  const [digits, setDigits] = useState('');
  const startTime = 1708905600000;
  const startDigit = 101;
  const numDigits = 4;
  const msDay = 86400000;

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

  function getEpochTime() {
    const timestamp = Date.now();
    return timestamp;
  }

  const epochDelta = getEpochTime() - startTime;
  const pastDays = Math.floor(epochDelta / msDay);
  const currentStartDigit = startDigit + pastDays * numDigits;
  const currentEndDigit = currentStartDigit + numDigits;

  function getSubstring(offset) {
    const digitOffset = offset * numDigits;
    const startIndex = currentStartDigit + digitOffset;
    const endIndex = currentEndDigit + digitOffset;

    return digits.substring(startIndex, endIndex);
  }

  const someDigit = getSubstring(-1);

  const renderDigits = () => {
    const digitsArray = Array.from({ length: 7 }, (_, i) => i - 3);
    return digitsArray.map(offset => {
      const stringSlice = getSubstring(offset);
      const elementId = `digit${offset}`;
      return <p className={offset === 0 ? 'focus' : 'regular'} key={elementId} id={elementId}>{stringSlice}</p>;
    });
  };

  const infoDay = (pastDays + 1).toString();
  const infoDigits = (currentEndDigit - 1).toString();
  const infoFull = `${infoDay}\n${infoDigits}`;

  const handleClick = () => {
    window.location.href = '/pi10000';
  };

  return (
    <div>
      {renderDigits()}
      <p className="info" id="counter" onClick={handleClick}>{infoFull}</p>
    </div>
  );
}