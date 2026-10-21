export function Marquee({
  items,
  className = "",
  separator = "✳",
}: {
  items: string[];
  className?: string;
  separator?: string;
}) {
  const row = [...items, ...items];

  return (
    <div className={`marquee-mask relative overflow-hidden py-5 ${className}`}>
      <div className="marquee">
        {row.map((item, index) => (
          <span key={`${item}-${index}`} className="flex shrink-0 items-center">
            <span className="whitespace-nowrap px-5 font-display text-[13px] font-medium uppercase tracking-[0.16em] text-muted">
              {item}
            </span>
            <span aria-hidden className="text-[10px] text-red">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
