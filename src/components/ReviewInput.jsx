export default function ReviewInput({ value, onChange, onAnalyze, loading }) {
  return (
    <div>
      <textarea
        rows={6}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste a review…"
        style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
      />
      <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
        <button onClick={onAnalyze} disabled={loading || !value.trim()}>
          {loading ? "Analyzing…" : "Analyze"}
        </button>
      </div>
    </div>
  );
}
