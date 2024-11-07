import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import styles from '/styles/apps/combinatorics/Combinatorics.module.css';
import { useState } from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

export default function PermutationPage() {
  const [length, setLength] = useState(0);
  const [r, setR] = useState(0);
  const [result, setResult] = useState(null);
  const [permutationsList, setPermutationsList] = useState([]);

  const handleCalculate = () => {
    const n = parseInt(length);
    const rValue = parseInt(r);

    // Calculate nPr and cast the result to an integer
    const permutationCount = Math.round(factorial(n) / factorial(n - rValue));
    setResult({
      n,
      r: rValue,
      formula: `P(${n}, ${rValue}) = \\frac{${n}!}{(${n} - ${rValue})!}`,
      value: permutationCount
    });

    // Clear previous permutations list
    setPermutationsList([]);
  };

  const factorial = (num) => {
    return num <= 1 ? 1 : num * factorial(num - 1);
  };

  // Generate all permutations of length r from numbers 1 to n
  const generatePermutations = (arr, len) => {
    if (len === 1) return arr.map((val) => [val]);
    return arr.flatMap((val, i) => 
      generatePermutations([...arr.slice(0, i), ...arr.slice(i + 1)], len - 1)
        .map((perm) => [val, ...perm])
    );
  };

  const handleGeneratePermutations = () => {
    const n = parseInt(length);
    const rValue = parseInt(r);
    const arr = Array.from({ length: n }, (_, i) => i + 1);
    const permutations = generatePermutations(arr, rValue);
    setPermutationsList(permutations);
  };

  return (
    <div>
      <Head>
        <title>Permutations</title>
        <link rel="icon" href="/static/dw/logo-round-black.png" />
      </Head>
      <main>
        <Header />
        <div className={styles.sectionTitle}>
          <h1>Permutations (nPr)</h1>

          <p>Choose an ordered list of <b>R</b> items from a list of <b>N</b> unique items.</p>
          
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
            Calculate Permutations
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
                <button className={styles.submitButton} onClick={handleGeneratePermutations}>
                  Generate All Permutations
                </button>
              )}
            </div>

            {/* Display the list of permutations */}
            {permutationsList.length > 0 && (
              <div className={styles.combinationsList}>
                <h3>Full Set:</h3>
                <p>[{Array.from({ length: result.n }, (_, i) => i + 1).join(', ')}]</p>

                <h3>All Possible Permutations:</h3>
                {permutationsList.map((perm, index) => (
                  <p key={index}>{perm.join(', ')}</p>
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
