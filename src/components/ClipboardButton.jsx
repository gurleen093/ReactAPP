
export default function ClipboardButton({ payload }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      alert("Ticket JSON copied to clipboard ✔");
    } catch {
      alert("Copy failed (browser blocked).");
    }
  };
  return (
    <button onClick={copy} disabled={!payload}>
      Copy Ticket JSON
    </button>
  );
}
