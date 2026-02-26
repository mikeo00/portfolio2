import React, { useState } from "react";

function Backend() {
  const [flag, setFlag] = useState(-1);
  const [loading, setLoading] = useState(false);

  function flaghandler(e) {
    const value = e.target.value;
    if (value === "project") setFlag(0);
    else if (value === "language") setFlag(1);
    else if (value === "framework") setFlag(2);
    else setFlag(-1);
  }

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  try {
    const formData = new FormData(e.target);

    let url = "";
    if (flag === 0) url = "http://localhost:4000/projects";
    if (flag === 1) url = "http://localhost:4000/languages";
    if (flag === 2) url = "http://localhost:4000/frameworks";
    if (!url) throw new Error("Select an option first");
console.log("ADMIN KEY:", import.meta.env.VITE_ADMIN_KEY);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "x-admin-key": import.meta.env.VITE_ADMIN_KEY,
      },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed");

    alert("Added successfully");
    e.target.reset();
    setFlag(-1);
  } catch (err) {
    alert(err.message);
  } finally {
    setLoading(false);
  }
}

  return (
    <>
      <h1>Management</h1>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <select onChange={flaghandler} defaultValue="">
          <option value="">--select--</option>
          <option value="project">project</option>
          <option value="language">language</option>
          <option value="framework">framework</option>
        </select>

        <br /><br />

        {flag === 0 && (
          <>
            <h3>Project</h3>
            <input name="title" placeholder="title" required /><br />
            <input name="description" placeholder="description" required /><br />
            <input type="file" name="file" accept="image/*" required /><br />
            <input name="category" placeholder="category" required /><br />
            <input name="githublink" placeholder="github link" required /><br />
            <input name="languages" placeholder="languages (comma separated)" required /><br />
            <input name="frameworks" placeholder="frameworks (comma separated)" /><br />
          </>
        )}

        {flag === 1 && (
          <>
            <h3>Language</h3>
            <input name="title" placeholder="title" required /><br />
            <input type="file" name="file" accept="image/*" required /><br />
          </>
        )}

        {flag === 2 && (
          <>
            <h3>Framework</h3>
            <input name="title" placeholder="title" required /><br />
            <input type="file" name="file" accept="image/*" required /><br />
          </>
        )}

        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Submit"}
        </button>
      </form>
    </>
  );
}

export default Backend;