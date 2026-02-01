import React, { useState } from "react";

function Backend() {
  const [flag, setFlag] = useState(-1);

  function flaghandler(e) {
    const value = e.target.value;

    if (value === "project") setFlag(0);
    else if (value === "language") setFlag(1);
    else if (value === "framework") setFlag(2);
    else setFlag(-1);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submit flag:", flag);
  }

  return (
    <>
      <h1 className="header">Management</h1>

      <form id="f1" onSubmit={handleSubmit}>
        <h3 className="sub-header">select option to insert data</h3>

        <div className="add">
          <select id="opt" className="opt" onChange={flaghandler} defaultValue="">
            <option value="">--select--</option>
            <option value="project">project</option>
            <option value="language">language</option>
            <option value="framework">framework</option>
          </select>

          <br />

          {flag === 0 && (
            <div className="manage" id="add-div">
              <h2>project management</h2>
              <label className="labs">title:</label><br />
              <input type="text" name="projTitle" required /><br />

              <label className="labs">description:</label><br />
              <input type="text" name="projDesc" required /><br />

              <label className="labs">image:</label><br />
              <input type="file" name="projImage" accept="image/*" required /><br />

              <label className="labs">category:</label><br />
              <input type="text" name="projCat" required /><br />

              <label className="labs">github link:</label><br />
              <input type="text" name="projGit" required /><br />

              <label className="labs">language:</label><br />
              <input type="text" name="projLang" required /><br />

              <label className="labs">framework:</label><br />
              <input type="text" name="projFramework" /><br />
            </div>
          )}

          {flag === 1 && (
            <div className="manage" id="add-div">
              <h2>language management</h2><br />
              <label className="labs">title:</label><br />
              <input type="text" name="langTitle" required /><br />

              <label className="labs">logo:</label><br />
              <input type="file" name="langLogo" accept="image/*" required /><br />
            </div>
          )}
            
          {flag === 2 && (
            <div className="manage" id="add-div">
              <h2>framework management</h2>
              <label className="labs">title:</label><br />
              <input type="text" name="frameworkTitle" required /><br />

              <label className="labs">logo:</label><br />
              <input type="file" name="frameworkLogo" accept="image/*" required /><br />
            </div>
          )}
        <br />
        </div>
      </form>
    </>
  );
}

export default Backend;
