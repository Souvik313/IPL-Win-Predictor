import { useState } from "react";

import axios from "axios";

import ProbabilityCard from "./ProbabilityCard";

import "./PredictorForm.css";

import { teams, cities } from "../data/teams";

function PredictorForm() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    batting_team: "",
    bowling_team: "",
    city: "",
    runs_left: "",
    balls_left: "",
    wickets_left: "",
    target: "",
    crr: "",
    rrr: "",
  });

  const handle = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "https://ipl-win-predictor-233z.onrender.com/predict",

        {
          ...form,

          runs_left: Number(form.runs_left),

          balls_left: Number(form.balls_left),

          wickets_left: Number(form.wickets_left),

          target: Number(form.target),

          crr: Number(form.crr),

          rrr: Number(form.rrr),
        },
      );

      setResult(res.data.win_probability);
    } catch (err) {
      console.error(err);

      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <h1>🏏 IPL WIN PREDICTOR</h1>

      <form onSubmit={submit}>
        <select name="batting_team" onChange={handle}>
          <option>Batting Team</option>

          {teams.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <select name="bowling_team" onChange={handle}>
          <option>Bowling Team</option>

          {teams.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <select name="city" onChange={handle}>
          <option>City</option>

          {cities.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <input name="runs_left" placeholder="Runs Left" onChange={handle} />

        <input name="balls_left" placeholder="Balls Left" onChange={handle} />

        <input
          name="wickets_left"
          placeholder="Wickets Left"
          onChange={handle}
        />

        <input name="target" placeholder="Target" onChange={handle} />

        <input name="crr" placeholder="CRR" onChange={handle} />

        <input name="rrr" placeholder="RRR" onChange={handle} />

        <button disabled={loading}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {result !== null && <ProbabilityCard probability={result} />}
    </div>
  );
}

export default PredictorForm;
