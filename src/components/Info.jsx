export function Info({ item }) {
  return (
    <div
      className={`${item.className} cursor-pointer transition hover:scale-105`}
    >
      <div>
        <div>{item.title}</div>
        <div>SHOP NOW+</div>
      </div>
      <img className="h-40 w-56" src={item.src} />
    </div>
  );
}
