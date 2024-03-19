export default function Header() {
  return (
    <header>
    <nav>
    <ul class="nav">
      <li><a href="/">Home</a></li>
      <li class="dropdown">
        <a href="javascript:void(0)" class="dropbtn">Dropdown</a>
        <div class="dropdown-content">
          <a href="/pages/projects.js">Link 1</a>
        </div>
      </li>
    </ul>
    </nav>
    </header>
    );
  }