export default function Header({ title }) {
  return (
    <header>
      <h1 className="title">{title}</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/projects">Projects</a></li>
          <li><a href="/photography">Photography</a></li>
        </ul>
      </nav>
    </header>
  );
}