import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
var axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:9769/certificats",
  Headers: {
    "Content-Type": "application/json",
  },
});
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/add" component={Add} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}
function Home() {
  const [Error, setError] = useState(0);
  const [id, setid] = useState("");
  const [data, setData] = useState({ nom: "" });
  if (Error === 1) {
    return <div className="container">Certificate Not Found</div>;
  }
  if (data.nom !== "") {
    return (
      <div className="container">
        <div>{data.id}</div>
        <div>{data.nom}</div>
        <div>{data.prenom}</div>
        <div>{data.dob}</div>
        <div>{data.domaine}</div>
        <div>{data.date_deb}</div>
        <div>{data.date_exp}</div>
      </div>
    );
  }
  return (
    <div className="container">
      <input
        value={id}
        placeholder="ID Of Certificate"
        onChange={(e) => {
          setid(e.target.value);
        }}
      />
      <button
        onClick={() => {
          axiosInstance
            .get("/", {
              params: {
                key: id,
              },
            })
            .then((resp) => {
              if (resp.data.err) {
                alert(resp.data.err);
              } else {
                if (resp.data.id) {
                  setData(resp.data);
                } else {
                  setError(1);
                }
              }
            });
        }}
      >
        Search
      </button>
    </div>
  );
}
function Add() {
  const [id, setid] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [dob, setDob] = useState("");
  const [dateRec, setDateRec] = useState("");
  const [dateExp, setDateExp] = useState("");
  const [domaine, setDomaine] = useState("");
  if (id.length > 0) {
    return <div className="container">{id}</div>;
  }
  return (
    <div className="container">
      <input
        value={nom}
        placeholder="Nom"
        onChange={(e) => {
          setNom(e.target.value);
        }}
      />
      <input
        value={prenom}
        placeholder="Prenom"
        onChange={(e) => {
          setPrenom(e.target.value);
        }}
      />
      <input
        value={dob}
        placeholder="Date Of Birth"
        onChange={(e) => {
          setDob(e.target.value);
        }}
        onFocus={(e) => (e.currentTarget.type = "date")}
        onBlur={(e) => (e.currentTarget.type = "text")}
      />
      <input
        value={domaine}
        placeholder="Domaine"
        onChange={(e) => {
          setDomaine(e.target.value);
        }}
      />
      <input
        value={dateRec}
        placeholder="Date of Receiving Certificate"
        onFocus={(e) => (e.currentTarget.type = "date")}
        onBlur={(e) => (e.currentTarget.type = "text")}
        onChange={(e) => {
          setDateRec(e.target.value);
        }}
      />
      <input
        value={dateExp}
        placeholder="Date of Expiration of Certificate"
        onChange={(e) => {
          setDateExp(e.target.value);
        }}
        onFocus={(e) => (e.currentTarget.type = "date")}
        onBlur={(e) => (e.currentTarget.type = "text")}
      />
      <button
        onClick={() => {
          axiosInstance
            .post("/", {
              datedeb: dateRec,
              dateexp: dateExp,
              domaine: domaine,
              nom: nom,
              prenom: prenom,
              dob: dob,
            })
            .then((resp) => {
              setid(resp.data);
            });
        }}
      >
        Add
      </button>
    </div>
  );
}
export default App;
