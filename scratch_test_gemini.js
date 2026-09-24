const key = 'AQ.Ab8RN6JAvwgSX88q7gyQdtmK3eYY2x2nfk9BIHrxAb-EyO1Ftw';

async function test(model) {
  const url = `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${encodeURIComponent(key)}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: 'Say hello in 3 words' }] }]
    })
  });
  const data = await res.json();
  console.log(model, res.status, JSON.stringify(data).substring(0, 150));
}

async function run() {
  await test('models/gemini-2.5-flash');
  await test('models/gemini-flash-latest');
  await test('models/gemini-3.8-flash');
}

run();
