export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get("url");

    if (!targetUrl) {
      return new Response(JSON.stringify({ error: "Missing url parameter" }), { 
        status: 400, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    // On récupère l'en-tête Accept de la requête originale, ou on met un truc par défaut
    const acceptHeader = request.headers.get("Accept") || "*/*";

    const headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      "Accept": acceptHeader,
      "X-Requested-With": "com.flightradar24.iphone"
    };

    try {
      const response = await fetch(targetUrl, { headers });
      
      // On renvoie la réponse telle quelle (HTML ou JSON) avec les bons headers
      return new Response(response.body, {
        status: response.status,
        headers: {
          "Content-Type": response.headers.get("Content-Type") || "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
};
