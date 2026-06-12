# 📊 Instagram Global Stats Dashboard

A clean, dark-mode dashboard showing Instagram's global user statistics, yearly growth, and top 10 countries by user base.

## 🗂 Project Structure

```
instagram-stats/
├── index.html          ← Main page
├── css/
│   └── style.css       ← All styling
├── js/
│   └── app.js          ← Data loading & rendering
├── data/
│   └── stats.json      ← All statistics data
└── README.md
```

## 🚀 Deploy to GitHub Pages (Step-by-Step)

### Step 1 — Create a GitHub repository
1. Go to https://github.com and log in
2. Click the **+** icon (top right) → **New repository**
3. Name it: `instagram-stats`
4. Set to **Public**
5. Click **Create repository**

### Step 2 — Upload your files
1. On your new repo page, click **uploading an existing file**
2. Drag and drop the entire `instagram-stats` folder contents
3. Write a commit message: `Initial commit`
4. Click **Commit changes**

### Step 3 — Enable GitHub Pages
1. Go to your repo → **Settings**
2. Scroll to **Pages** (left sidebar)
3. Under **Source**, select `Deploy from a branch`
4. Branch: `main`, Folder: `/ (root)`
5. Click **Save**

### Step 4 — Your site is live! 🎉
After ~60 seconds, your site will be at:
```
https://YOUR-GITHUB-USERNAME.github.io/instagram-stats/
```

## 🔄 Updating the Data

To update stats, just edit `data/stats.json`:
- Change numbers under `"global"` for the headline cards
- Add a new entry to `"yearly_growth"` for the chart
- Update `"top_countries"` for the table
- Update `"last_updated"` date

Then re-upload to GitHub — the site updates automatically.

## 📋 Data Sources
- [DataReportal](https://datareportal.com)
- [Statista](https://statista.com)

Data is manually updated from annual reports (not live/real-time).
