async function loadStats() {
  const res = await fetch('data/stats.json');
  return res.json();
}

function formatNumber(n) {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'B';
  if (n >= 1_000_000)     return (n / 1_000_000).toFixed(0) + 'M';
  if (n >= 1_000)         return (n / 1_000).toFixed(0) + 'K';
  return n.toString();
}

function renderCards(data) {
  document.getElementById('mau').textContent       = formatNumber(data.global.monthly_active_users);
  document.getElementById('dau').textContent       = formatNumber(data.global.daily_active_users);
  document.getElementById('stories').textContent   = formatNumber(data.global.daily_stories);
  document.getElementById('posts').textContent     = formatNumber(data.global.posts_per_day);
  document.getElementById('last-updated').textContent = 'Data as of ' + data.last_updated + ' · ' + data.source;
}

function renderChart(growth) {
  const maxVal = Math.max(...growth.map(d => d.mau));
  const wrap   = document.getElementById('chart-bars');
  wrap.innerHTML = '';

  growth.forEach(d => {
    const heightPct = (d.mau / maxVal) * 100;
    wrap.innerHTML += `
      <div class="bar-group">
        <span class="bar-val">${formatNumber(d.mau)}</span>
        <div class="bar" style="height:${heightPct}%"></div>
        <span class="bar-year">${d.year}</span>
      </div>`;
  });
}

function renderTable(countries) {
  const tbody = document.getElementById('country-tbody');
  tbody.innerHTML = '';
  const maxUsers = countries[0].users;

  countries.forEach(c => {
    const fillPct = (c.users / maxUsers) * 100;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="rank-cell">${String(c.rank).padStart(2,'0')}</td>
      <td><div class="country-cell"><span class="flag">${c.flag}</span>${c.country}</div></td>
      <td class="bar-cell">
        <div class="inline-bar-track">
          <div class="inline-bar-fill" style="width:${fillPct}%"></div>
        </div>
      </td>
      <td>${formatNumber(c.users)}</td>
      <td class="pct-cell">${c.pct}%</td>`;
    tr.addEventListener('click', () => openModal(c));
    tbody.appendChild(tr);
  });
}

function openModal(c) {
  const penetration = ((c.users / 2_000_000_000) * 100).toFixed(1);
  document.getElementById('modal-title').textContent     = `${c.flag} ${c.country}`;
  document.getElementById('modal-rank').textContent      = `#${c.rank} globally by Instagram users`;
  document.getElementById('modal-users').textContent     = formatNumber(c.users);
  document.getElementById('modal-pct').textContent       = c.pct + '%';
  document.getElementById('modal-penetration').textContent = penetration + '%';
  document.getElementById('modal-overlay').classList.add('open');
}

document.getElementById('modal-close').addEventListener('click', () => {
  document.getElementById('modal-overlay').classList.remove('open');
});

document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modal-overlay'))
    document.getElementById('modal-overlay').classList.remove('open');
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.getElementById('modal-overlay').classList.remove('open');
});

loadStats().then(data => {
  renderCards(data);
  renderChart(data.yearly_growth);
  renderTable(data.top_countries);
});
