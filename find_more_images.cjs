const url = 'https://m.blog.naver.com/kslee0143/223987105401';

async function main() {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Mobile Safari/537.36'
      }
    });
    const html = await response.text();
    
    // Find all image URLs from data-lazy-src or src or log images
    const imgUrls = [];
    const regex = /https:\/\/postfiles\.pstatic\.net\/[^"'\s>]+/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      imgUrls.push(match[0]);
    }

    const uniqueUrls = [...new Set(imgUrls)];
    console.log("Found postfiles image URLs:", uniqueUrls.slice(0, 5));
  } catch (e) {
    console.error("Error:", e);
  }
}

main();
