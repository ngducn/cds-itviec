let all_resp = []

async function fetchResponse() {
    const resp = await fetch("http://localhost:5000/jobs");
    const json = await resp.json();
    
    all_resp = all_resp.concat(json);
    console.log(all_resp)
    
    rendersArticles(all_resp);
}

function rendersArticles(responses) {
    const resp = responses.map(
      (jobs, num) => `
      <div>
        ${JSON.stringify(jobs, null, 2)}
      </div>
    `,
    );

    document.getElementById("list").innerHTML = resp.join("");
}

fetchResponse()

function triggerFetch() {
    fetchResponse()
}