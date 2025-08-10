function Badge({ sentiment }) {
  const color =
    sentiment === "negative" ? "#ef4444" :
    sentiment === "neutral"  ? "#f59e0b" :
    sentiment === "positive" ? "#22c55e" : "#9ca3af";
  return (
    <span style={{
      background: color, color: "white", padding: "4px 10px",
      borderRadius: 999, fontWeight: 600, textTransform: "capitalize", fontSize: 14
    }}>
      {sentiment || "unknown"}
    </span>
  );
}

export default function SentimentResult({ pred, explanation }) {
  if (!pred) return null;
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 16, marginTop: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Badge sentiment={pred.final_sentiment} />
        <small style={{ color: "#64748b" }}>confidence: {pred.confidence.toFixed(3)}</small>
      </div>

      <details style={{ marginTop: 10 }}>
        <summary>Model votes</summary>
        <pre style={{ background: "#f8fafc", padding: 12, borderRadius: 8, overflowX: "auto", fontSize: 12 }}>
{JSON.stringify(pred.per_model, null, 2)}
        </pre>
      </details>

      {explanation && (
        <>
          <h3 style={{ marginTop: 16 }}>Why negative?</h3>
          <p>{explanation}</p>
        </>
      )}
    </div>
  );
}
