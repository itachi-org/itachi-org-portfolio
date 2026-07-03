const repos = ['firebase_bond','EVM_kit','Imagine_app','noveMuseAI','contract-guard','fitness_pro'];
const base = 'https://github.com/itachi-org/';
(async () => {
  for (const repo of repos) {
    try {
      const res = await fetch(base + repo, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const html = await res.text();
      const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
      const desc = html.match(/<meta name="description" content="([^"]+)"/)?.[1]?.trim();
      console.log('REPO:', repo);
      console.log('TITLE:', title || 'NONE');
      console.log('DESC:', desc || 'NONE');
      console.log('---');
    } catch (error) {
      console.error('ERROR', repo, error.message);
    }
  }
})();
