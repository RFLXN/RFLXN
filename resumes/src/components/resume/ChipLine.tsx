export function ChipLine({ chips }: { chips: string[] }) {
  return (
    <div className="stack-line">
      {chips.map((chip) => (
        <span className="chip" key={chip}>
          {chip}
        </span>
      ))}
    </div>
  );
}
