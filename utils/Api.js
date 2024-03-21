class Api {
  constructor() {
    this.baseUrl = "https://around.nomoreparties.co/v1/web_es_08/";
    this.headers = {
      authorization: "28d1f77b-3605-449f-bf16-20a5216f8fdb",
      "Content-Type": "application/json",
    };
  }

  async get(complementUrl) {
    const result = await fetch(`${this.baseUrl}${complementUrl}`, {
      method: "GET",
      headers: this.headers,
    });
    if (!result.ok) {
      throw new Error(`Error: ${result.status}`);
    }
    return result.json();
  }

  async post(complementUrl, body) {
    const result = await fetch(`${this.baseUrl}${complementUrl}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });
    if (!result.ok) {
      throw new Error(`Error: ${result.status}`);
    }
    return result.json();
  }

  async patch(complementUrl, body) {
    const result = await fetch(`${this.baseUrl}${complementUrl}`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(body),
    });
    if (!result.ok) {
      throw new Error(`Error: ${result.status}`);
    }
    return result.json();
  }

  async delete(complementUrl) {
    const result = await fetch(`${this.baseUrl}${complementUrl}`, {
      method: "DELETE",
      headers: this.headers,
    });
    if (!result.ok) {
      throw new Error(`Error: ${result.status}`);
    }
    return result.json();
  }

  async put(complementUrl) {
    const result = await fetch(`${this.baseUrl}${complementUrl}`, {
      method: "PUT",
      headers: this.headers,
    });
    if (!result.ok) {
      throw new Error(`Error: ${result.status}`);
    }
    return result.json();
  }
}

export default Api;
