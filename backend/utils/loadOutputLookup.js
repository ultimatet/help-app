const fs   = require('fs');
const path = require('path');
const csv  = require('csv-parser');

module.exports = function loadOutputLookup() {
  return new Promise((resolve, reject) => {
    const lookup   = {};
    let lastArea   = null;

    fs.createReadStream(path.join(__dirname, '..', 'data', 'OUTPUT(Sheet2).csv'))
      .pipe(csv({ separator: ',' }))
      .on('data', row => {
        // 1) carry forward the Area
        if (row['Area']?.trim()) lastArea = row['Area'].trim();
        const area = lastArea;
        if (!area) return;

        // 2) grab the columns
        const range   = row['Range (ie for lower, similar, higher)']?.trim();
        const label   = row['Your Score']?.trim() + " compared to national benchmark";          // “Lower” / “Similar” / “Higher”
        const meaning = row['What This Means']?.trim();
        const action  = row['What You Can Do']?.trim();
        if (!range || !label) return;  
        // 3) parse numeric bounds
        let min = null, max = null;
        if (range.startsWith('<'))           max = parseFloat(range.slice(1));
        else if (range.startsWith('>'))      min = parseFloat(range.slice(1));
        else if (range.includes('-')) [min, max] = range.split('-').map(Number);

        // 4) push into our lookup
        lookup[area] = lookup[area] || [];
        lookup[area].push({ min, max, label, meaning, action });
      })
      .on('end', () => resolve(lookup))
      .on('error', reject);
  });
};
