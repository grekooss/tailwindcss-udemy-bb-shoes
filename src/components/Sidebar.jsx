export function Sidebar({ children }) {
  return (
    <div className="fixed left-0 top-0 z-50 h-full w-full bg-white">
      <button>X</button>
      {children}
    </div>
  );
}
