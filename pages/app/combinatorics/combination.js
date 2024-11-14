import Head from 'next/head';
import Header from '@components/apps/AppHeader';
import Footer from '@components/apps/AppFooter';
import styles from '/styles/apps/combinatorics/Combinatorics.module.css';
import { useState } from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

export default function CombinationPage() {
  const [length, setLength] = useState(0);
  const [r, setR] = useState(0);
  const [result, setResult] = useState(null);
  const [combinationsList, setCombinationsList] = useState([]);

  const handleCalculate = () => {
    const n = parseInt(length);
    const rValue = parseInt(r);

    // Calculate nCr and cast the result to an integer to avoid decimal artifacts
    const combinationCount = Math.round(factorial(n) / (factorial(rValue) * factorial(n - rValue)));
    setResult({
      n,
      r: rValue,
      formula: `\\binom{${n}}{${rValue}} = \\frac{${n}!}{${rValue}! \\cdot (${n} - ${rValue})!}`,
      value: combinationCount
    });

    // Clear previous combinations list
    setCombinationsList([]);
  };

  const factorial = (num) => {
    return num <= 1 ? 1 : num * factorial(num - 1);
  };

  // Generate all combinations of length r from numbers 1 to n
  const generateCombinations = (arr, len) => {
    if (len === 1) return arr.map((val) => [val]);
    return arr.flatMap((val, i) => 
      generateCombinations(arr.slice(i + 1), len - 1).map((comb) => [val, ...comb])
    );
  };

  const handleGenerateCombinations = () => {
    const n = parseInt(length);
    const rValue = parseInt(r);
    const arr = Array.from({ length: n }, (_, i) => i + 1);
    const combinations = generateCombinations(arr, rValue);
    setCombinationsList(combinations);
  };

  return (
    <div>
      <Head>
        <title>Combinatorics</title>
        <link rel="icon" href="/static/dw/logo-round-black.png" />
      </Head>
      <main>
        <Header text="Combinatorics" href="../combinatorics" />
        <div className={styles.sectionTitle}>
          <h1>Combinations (nCr)</h1>

          <p>Choose a set of <b>R</b> items from a list of <b>N</b> unique items.</p>
          
          <div className={styles.formLabel}>
            Set Length (N): 
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
        
          <div className={styles.formLabel}>
            Pick (R): 
            <input
              type="number"
              value={r}
              onChange={(e) => setR(e.target.value)}
              max={length}
            />
          </div>

          <button className={styles.submitButton} onClick={handleCalculate}>
            Calculate Combinations
          </button>
        </div>

        
        {result !== null && (
          <section>
            <div className={styles.sectionContent}>
              <div className={styles.resultContainer}>
                <h2>Results</h2>
                <p>
                  <strong>Inputs:</strong> N = {result.n}, R = {result.r}
                </p>
                <h3>Formula:</h3>
                <BlockMath math={result.formula} />
                <h3>Count: {result.value}</h3>
              </div>

              {/* Display the button if result.value <= 999 */}
              {result.value <= 9999 && (
                <button className={styles.submitButton} onClick={handleGenerateCombinations}>
                  Generate All Combinations
                </button>
              )}
            </div>

            {/* Display the list of combinations */}
            {combinationsList.length > 0 && (
              <div className={styles.combinationsList}>
                <h3>Full Set:</h3>
                <p>[{Array.from({ length: result.n }, (_, i) => i + 1).join(', ')}]</p>

                <h3>All Possible Combinations:</h3>
                {combinationsList.map((comb, index) => (
                  <p key={index}>{comb.join(', ')}</p>
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
