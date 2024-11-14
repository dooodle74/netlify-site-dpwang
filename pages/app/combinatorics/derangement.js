import Head from 'next/head';
import Link from 'next/link';
import Header from '@components/apps/AppHeader';
import Footer from '@components/apps/AppFooter';
import styles from '/styles/apps/combinatorics/Combinatorics.module.css';
import { useState } from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

export default function DerangementPage() {
  const [length, setLength] = useState(0);
  const [fixedCount, setFixedCount] = useState(0);
  const [result, setResult] = useState(null);
  const [derangementsList, setDerangementsList] = useState([]);

  const handleCalculate = () => {
    const n = parseInt(length);
    const k = parseInt(fixedCount);

    // Calculate derangement count
    const derangementCount = Math.round(
      binomialCoefficient(n, k) * subfactorial(n - k)
    );

    setResult({
      n,
      k,
      formula: `\\binom{${n}}{${k}} \\cdot D_{${n} - ${k}} = \\frac{${n}!}{${k}! \\cdot (${n} - ${k})!} \\cdot \\left[ \\frac{(${n} - ${k})!}{e} \\right]`,
      value: derangementCount,
    });

    setDerangementsList([]);
  };

  // Calculate binomial coefficient
  const binomialCoefficient = (n, k) => {
    return factorial(n) / (factorial(k) * factorial(n - k));
  };

  // Calculate factorial
  const factorial = (num) => {
    return num <= 1 ? 1 : num * factorial(num - 1);
  };

  // Calculate subfactorial (derangement) for a given number
  const subfactorial = (num) => {
    if (num === 0) return 1;
    if (num === 1) return 0;
    return Math.round((num - 1) * (subfactorial(num - 1) + subfactorial(num - 2)));
  };

  // Generate derangements with exactly k fixed points
  const generateDerangements = (arr, k) => {
    const fixedElements = arr.slice(0, k);
    const remainingElements = arr.slice(k);

    const deranged = generateFullDerangements(remainingElements);
    return deranged.map((d) => [...fixedElements, ...d]);
  };

  // Generate full derangements of an array
  const generateFullDerangements = (arr) => {
    if (arr.length === 0) return [[]];
    if (arr.length === 1) return [];

    const result = [];
    arr.forEach((element, index) => {
      const remaining = arr.slice(0, index).concat(arr.slice(index + 1));
      generateFullDerangements(remaining).forEach((perm) => {
        if (perm[0] !== element) {
          result.push([element, ...perm]);
        }
      });
    });

    return result;
  };

  const handleGenerateDerangements = () => {
    const n = parseInt(length);
    const k = parseInt(fixedCount);
    const arr = Array.from({ length: n }, (_, i) => i + 1);
    const derangements = generateDerangements(arr, k);
    setDerangementsList(derangements);
  };

  return (
    <div>
      <Head>
        <title>Derangements</title>
        <link rel="icon" href="/static/dw/logo-round-black.png" />
      </Head>
      <main>
        <Header text="Combinatorics" href="../combinatorics" />
        
        <div className={styles.sectionTitle}>
          <h1>Derangements (D<sub>n</sub>) with Fixed Items</h1>

          <p>An ordered arrangement of <b>N</b> items where exactly <b>K</b> items are in their original position.</p>

          <div className={styles.formLabel}>
            Array Size (N):
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>

          <div className={styles.formLabel}>
            Fixed Count (K):
            <input
              type="number"
              value={fixedCount}
              onChange={(e) => setFixedCount(e.target.value)}
              max={length}
            />
          </div>

          <button className={styles.submitButton} onClick={handleCalculate}>
            Calculate Derangements
          </button>
        </div>

        {result !== null && (
          <section>
            <div className={styles.sectionContent}>
              <div className={styles.resultContainer}>
                <h2>Results</h2>
                <p>
                  <strong>Inputs:</strong> N = {result.n}, K = {result.k}
                </p>
                <h3>Formula:</h3>
                <BlockMath math={result.formula} />
                <h3>Count: {result.value}</h3>
              </div>

              {/* Display the button if result.value <= 999 */} 
              {result.value <= 999 && (
                <button className={styles.submitButton} onClick={handleGenerateDerangements}>
                  Generate All Derangements
                </button>
              )}
            </div>

            {/* Display the list of derangements */} 
            {derangementsList.length > 0 && (
              <div className={styles.combinationsList}>
                <h3>Full Set:</h3>
                <p>[{Array.from({ length: result.n }, (_, i) => i + 1).join(', ')}]</p>

                <h3>All Possible Derangements:</h3>
                {derangementsList.map((derangement, index) => (
                  <p key={index}>{derangement.join(', ')}</p>
                ))}
              </div>
            )}
          </section>
        )}
        <Footer />
      </main>
    </div>
  );
}
