import { useState } from "react";
import { predict, explain, rephrase } from "./api";
import ReviewInput from "./components/ReviewInput.jsx";
import SentimentResult from "./components/SentimentResult.jsx";
import RephraseBox from "./components/RephraseBox.jsx";
import ClipboardButton from "./components/ClipboardButton.jsx";

export default function App() {
  const [text, setText] = useState("");
  const [pred, setPred] = useState(null);
  const [explanation, setExplanation] = useState("");
  const [rephrased, setRephrased] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setExplanation("");
    setRephrased("");
    try {
      const data = await predict(text);
      setPred(data);
      if (data.final_sentiment === "negative") {
        const ex = await explain(text);
        setExplanation(ex.explanation);
      }
    } catch (e) {
      console.error(e);
      alert("Predict failed. Is the API running?");
    } finally {
      setLoading(false);
    }
  };

  const handleRephrase = async () => {
    setLoading(true);
    try {
      const data = await rephrase(text);
      setRephrased(data.rephrased);
    } catch (e) {
      console.error(e);
      alert("Rephrase failed.");
    } finally {
      setLoading(false);
    }
  };

  const ticketPayload = pred && {
    title: `[${pred.final_sentiment.toUpperCase()}] Customer Review`,
    review_text: text,
    sentiment: pred.final_sentiment,
    confidence: pred.confidence,
    explanation: explanation || "(not negative / not required)",
    rephrased: rephrased || "(not generated yet)",
    created_at: new Date().toISOString()
  };

  return (
    <div style={{ maxWidth: 900, margin: "32px auto", fontFamily: "Inter, system-ui, Arial" }}>
      <h1>Review Analysis</h1>

      <ReviewInput
        value={text}
        onChange={setText}
        onAnalyze={handleAnalyze}
        loading={loading}
      />

      <SentimentResult pred={pred} explanation={explanation} />

      <RephraseBox
        review={text}
        value={rephrased}
        setValue={setRephrased}
        onRephrase={handleRephrase}
        loading={loading}
      />

      <div style={{ marginTop: 12 }}>
        <ClipboardButton payload={ticketPayload} />
      </div>
    </div>
  );
}
