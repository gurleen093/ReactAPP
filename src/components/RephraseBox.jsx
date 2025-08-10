export default function RephraseBox({ review, value, setValue, onRephrase, loading }) {
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <h3 style={{ margin: 0 }}>Rephrased (brand-friendly)</h3>
        <button onClick={onRephrase} disabled={loading || !review.trim()}>
          {loading ? "Rephrasing…" : "Rephrase"}
        </button>
      </div>
      <textarea
        rows={4}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Click Rephrase, or edit here…"
        style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #e5e7eb", marginTop: 8 }}
      />
    </div>
  );
}
